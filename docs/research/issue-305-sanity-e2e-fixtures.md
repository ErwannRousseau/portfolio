# Rapport de solutions — fixtures Sanity pour le smoke Playwright (#305)

Date : 2026-09-06  
Question : remplacer la sélection `process.env.SANITY_E2E_FIXTURES` dans
`sanity/lib/store.ts` sans perdre un test hermétique et déterministe.

## Verdict

Pour le smoke demandé par [l’issue #305](https://github.com/ErwannRousseau/portfolio/issues/305),
l’option dataset Sanity E2E est finalement retenue : elle exerce le vrai client
Sanity et laisse `sanity/lib/store.ts` identique entre production et CI.

Le dataset `e2e` est public, créé dans le projet `Portfolio` existant, et ne
contient que les deux documents nécessaires au smoke. Aucun nouveau projet,
token ou module payant n’est ajouté ; les lectures CI restent soumises aux
quotas du plan existant. L’alternative alias Turbopack décrite plus bas reste
pertinente pour un smoke totalement hors ligne.

## Contraintes observées dans ce dépôt

- `app/[lang]/page.tsx` et `app/[lang]/layout.tsx` consomment
  `loadHomePage(lang)` depuis `sanity/lib/store.ts`.
- Les loaders de `store.ts` portent déjà `"use cache"`, `cacheLife` et
  `cacheTag`. `next.config.ts` active `cacheComponents`.
- `playwright.config.ts` lance `pnpm build && pnpm start` via `webServer`.
  Le smoke vérifie donc un build et un serveur Next réels, pas seulement des
  composants isolés.
- La donnée E2E doit rester stable, en lecture seule et différente de la
  production. Les critères ne demandent pas de tester le transport Sanity lui-même.

Les deux derniers points sont importants : le serveur lancé par Playwright est
un processus enfant distinct du runner, et les requêtes Sanity utilisées par le
prérendu se produisent pendant `next build`. Un mock installé uniquement dans
le fichier de test n’atteindrait donc pas automatiquement ce processus.

## Comparaison

| Solution | Déterministe/offline | Exécute le vrai loader Sanity | Pollution du code de production | Coût | Avis |
| --- | --- | --- | --- | --- | --- |
| Alias de module au build | Oui | Non | Faible | Faible | Recommandée pour ce ticket |
| Dataset Sanity E2E dédié | Non, dépend du réseau | Oui | Aucune | Moyen | Recommandée si l’intégration Sanity est le but |
| Injection de dépendance seule | Oui, en théorie | Selon l’adapter | Moyenne | Moyen | Fondation utile, mais ne choisit pas l’adapter seule |
| MSW préchargé dans Next | Oui, si le bootstrap est fiable | Oui, via HTTP mocké | Faible | Élevé | Surdimensionnée ici |
| `page.route` ou HAR Playwright | Oui côté navigateur | Non pendant le build | Aucune | Faible | Inadaptée à ce flux |
| Faux serveur Content Lake avec `apiHost` | Oui | Oui, transport simulé | Faible | Élevé | Pour un contrat HTTP spécifique seulement |

## Option A — alias de module au build E2E (recommandation)

### Principe

Le module importé par les pages ne change pas (`@/sanity/lib/store`). C’est la
résolution des modules qui change uniquement pendant le build E2E :

```text
production : @/sanity/lib/store -> sanity/lib/store.ts
E2E        : @/sanity/lib/store -> sanity/lib/e2e-store.ts
```

La configuration Turbopack accepte des alias de résolution via
`resolveAlias`. Next 16 indique aussi que Turbopack est le bundler par défaut
de `next build`; ajouter un hook Webpack uniquement pour ce cas ferait perdre
le chemin de build standard ([configuration Turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack),
[Next 16 — Turbopack par défaut](https://nextjs.org/docs/app/guides/upgrading/version-16)).

### Migration

1. Déplacer les fonctions de `sanity/lib/e2e-fixtures.ts` dans un module
   `e2e-store` qui implémente toute la surface importée par les routes
   (`loadHomePage`, `loadBlogPage`, `loadPostSlugs`, et les exports nécessaires
   aux autres routes). Éviter une importation inverse de `store.ts`, qui créerait
   une boucle avec l’alias.
2. Supprimer de `store.ts` l’import des fixtures, le booléen d’environnement et
   les branches conditionnelles. Les loaders de production conservent leurs
   annotations de cache.
3. Dans `next.config.ts`, ajouter conditionnellement
   `turbopack.resolveAlias` quand `E2E_BUILD=true`. Utiliser l’import exact
   (`@/sanity/lib/store`) et tester l’alias avec le build réel ; la
   documentation montre la capacité d’alias, mais ne garantit pas la syntaxe
   exacte de chaque alias TypeScript de l’application.
4. Passer `E2E_BUILD=true` dans `webServer.env` de Playwright. `webServer.env`
   est précisément prévu pour transmettre des variables au processus lancé par
   Playwright ([Playwright — webServer](https://playwright.dev/docs/test-webserver)).
5. Laisser les données fixtures dans un fichier typé et sans effets de bord.
   Conserver `"use cache"`/`cacheLife` sur les loaders E2E afin de tester le
   même comportement de cache. Next précise que `use cache` met en cache le
   résultat d’une fonction et que les entrées/retours doivent être
   sérialisables ([directive `use cache`](https://nextjs.org/docs/app/api-reference/directives/use-cache)).
6. Vérifier les deux profils : `pnpm test:e2e` avec l’alias, puis `pnpm build`
   sans l’alias. Le second build doit suivre exclusivement le store Sanity.

### Avantages

- Aucun appel réseau ni secret dans le job E2E.
- Le store de production ne connaît pas le mode test et n’importe pas les
  fixtures.
- Le smoke continue à couvrir les vraies pages localisées, le layout, le
  prérendu et `next start`.
- Les données restent versionnées avec le code et sont relues seulement.

### Limites

- Le build E2E possède quand même un profil de compilation conditionnel dans
  `next.config.ts`.
- L’alias doit couvrir tous les exports importés pendant le build, y compris
  ceux découverts par les routes statiques ou les handlers API.
- Ce test ne détecte pas une rupture de configuration ou de réponse de
  `@sanity/client`.

## Option B — dataset Sanity E2E dédié

### Principe

Ne modifier ni `store.ts` ni la résolution des modules. Le job fournit au build
un `projectId` et un dataset `e2e` dédiés ; le client Sanity de production lit
alors de vraies données Sanity. La documentation Sanity présente
`projectId`, `dataset` et `apiVersion` comme la configuration du client, et le
token comme optionnel sauf pour les datasets privés ou les requêtes
authentifiées ([client JavaScript Sanity](https://www.sanity.io/docs/apis-and-sdks/js-client-getting-started)).

Initialiser ce dataset hors du job PR avec un export/NDJSON versionné ou une
procédure de maintenance. La CLI Sanity documente l’import de données et les
options `--replace`/`--missing` ([import de données Sanity](https://www.sanity.io/docs/content-lake/importing-data),
[référence CLI datasets](https://www.sanity.io/docs/cli-reference/cli-datasets)).
Le job PR ne doit ensuite faire que des lectures ; si le dataset est privé,
utiliser un secret CI de lecture seule, jamais une variable `NEXT_PUBLIC_`.
Next précise que les variables `NEXT_PUBLIC_` sont intégrées au bundle client au
moment du build ([variables d’environnement Next.js](https://nextjs.org/docs/app/guides/environment-variables)).

### Avantages

- `store.ts` reste identique entre production, local et CI.
- Le build et le runtime passent par le vrai client, les vrais endpoints et le
  vrai format de réponse Sanity.
- Aucun fixture store n’est présent dans le dépôt applicatif.

### Limites

- Le test dépend de la disponibilité, des ACL et du temps de réponse de Sanity.
- Un éditeur ou une migration peut modifier le dataset et casser le smoke ; il
  faut donc le traiter comme une donnée de test contrôlée, avec un document
  sentinelle et une procédure de réinitialisation.
- Il faut gérer le projet/dataset, les secrets et éventuellement le coût de
  stockage.
- Copier `production` avant chaque PR ne rendrait pas le contenu déterministe
  et contredirait le critère « distinct de la production ». Le Cloud Clone est
  documenté pour copier des datasets, notamment pour des tests CI, mais il
  reste une copie de la donnée source ([Cloud Clone Sanity](https://www.sanity.io/docs/content-lake/how-to-use-cloud-clone-for-datasets)).

Cette option est le meilleur choix si l’intention du ticket évolue vers un
smoke d’intégration Sanity. Pour un smoke de rendu hermétique sur chaque PR,
l’alias local est plus fiable.

## Option C — injection de dépendance / factory de loaders

Extraire un contrat local, par exemple `ContentLoaders`, puis fournir un adapter
Sanity ou un adapter fixtures. C’est une amélioration structurelle utile si
plusieurs applications, environnements ou backends doivent consommer le même
contenu.

Elle ne résout toutefois pas seule le problème du build : les Server Components
importent une implémentation concrète avant que Playwright n’ouvre le navigateur.
Il faut encore choisir l’adapter par un dataset, un alias de module ou un
entrypoint de build. Pour ce dépôt et ce ticket, la factory seule ajouterait
une abstraction sans supprimer la décision d’environnement.

Si cette voie est choisie plus tard, faire passer uniquement l’adapter au
factory, garder les fonctions cacheables dans chaque implémentation et tester
les deux adapters avec un test de contrat commun. Ne pas passer des clients ou
des fonctions non sérialisables comme arguments d’une fonction `use cache`.

## Option D — interception réseau

### `page.route` / HAR

Playwright documente `page.route()` et `routeFromHAR()` pour les requêtes faites
par la page ([mock APIs Playwright](https://playwright.dev/docs/mock)). Dans ce
projet, la donnée est chargée côté serveur pendant `pnpm build` puis le
navigateur reçoit le HTML et les assets : une interception installée dans le
test ne peut donc pas fournir les réponses au build enfant. Elle ne deviendrait
pertinente que si la donnée était volontairement déplacée côté client, ce qui
changerait le comportement testé.

### MSW dans le processus Next

MSW indique que son intégration Node intercepte les modules natifs
`http`/`https` du processus courant et recommande d’appeler `server.listen()` au
plus tôt ([intégration Node MSW](https://mswjs.io/docs/integrations/node)). Pour
atteindre `next build` et `next start`, il faudrait donc précharger le handler
dans chacun des processus `webServer`, vérifier la propagation aux workers de
build et confirmer la compatibilité avec le transport de la version installée
de `@sanity/client`. Cette solution conserve le store Sanity, mais introduit un
bootstrap et un faux contrat HTTP que le ticket ne demande pas.

## Option E — faux Content Lake avec `apiHost`

`@sanity/client` expose une option `apiHost` dans sa configuration
([type `ClientConfig` officiel](https://reference.sanity.io/_sanity/client/index/ClientConfig/)).
Un serveur local pourrait reproduire les endpoints de requête et retourner un
enveloppe Content Lake stable ; la réponse de requête Sanity est documentée
comme un objet contenant notamment `result` ([Query API Sanity](https://www.sanity.io/docs/http-reference/query)).

Cela testerait le chemin HTTP du client sans dépendre du cloud, mais il faudrait
maintenir le serveur, les paramètres GROQ, les méthodes GET/POST, les erreurs et
les formats de réponse. C’est adapté à un test de contrat du client, pas à un
smoke de pages localisées.

## Décision appliquée

- Le projet Sanity existant `Portfolio` utilise un dataset public `e2e` dédié.
- Il contient seulement le document `home` et le tag nécessaires au smoke,
  sans asset ni secret CI.
- Playwright pointe vers ce dataset et le job reste strictement en lecture.
- Le store de production n’a plus de branchement de fixtures locales.

Cette configuration teste le vrai client Sanity sans créer de projet ni activer
une fonctionnalité payante supplémentaire.
