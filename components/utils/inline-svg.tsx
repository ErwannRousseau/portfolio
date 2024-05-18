import { TriangleAlert } from "lucide-react";

interface InlineSVGProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
}

export const InlineSVG = ({ value, className }: InlineSVGProps) => {
  if (!value) {
    return <TriangleAlert color="red" />;
  }
  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: */}
      <div className={className} dangerouslySetInnerHTML={{ __html: value }} />
    </>
  );
};
