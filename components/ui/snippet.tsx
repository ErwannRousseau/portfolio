export const Snippet: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  );
};
