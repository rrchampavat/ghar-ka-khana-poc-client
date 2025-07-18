import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TYPOGRAPHY_PROPS {
  children: ReactNode;
  className?: string;
}

export const TypographyH1 = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const TypographyH2 = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const TypographyH3 = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const TypographyH4 = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const TypographyP = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
};

export const TypographyBlockQuote = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
};

export const TypographyLead = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>
  );
};

export const TypographyLarge = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
};

export const TypographySmall = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <small className={cn("text-sm leading-none font-medium", className)}>
      {children}
    </small>
  );
};

export const TypographyMuted = (props: TYPOGRAPHY_PROPS) => {
  const { children, className } = props;

  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
};
