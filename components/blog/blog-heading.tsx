import { Spacing } from "@/components/ui/spacing";
import { getI18n } from "@/lib/locales/server";

export async function BlogHeading() {
  const t = await getI18n();

  return (
    <>
      <Spacing />
      <h2 className="pl-4 text-xl">{t("Blog")}</h2>
      <Spacing size="xs" />
    </>
  );
}
