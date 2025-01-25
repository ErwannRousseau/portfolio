import { cn } from "@/lib/utils";
import Image from "next/image";

export interface BadgeLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  alt: string;
  src: string;
}

const BadgeLink = ({ href, alt, src, children, ...props }: BadgeLinkProps) => {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whitespace-nowrap rounded-sm border border-accent bg-accent/50 p-1 font-mono text-sm leading-3 no-underline"
    >
      <Image
        width={16}
        height={16}
        alt={alt}
        src={src}
        className="-mt-1 mr-1 inline-flex size-4"
      />
      {children}
    </a>
  );
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex h-fit items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Badge, BadgeLink };
