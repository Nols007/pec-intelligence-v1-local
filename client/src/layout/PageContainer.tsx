import React from "react";

type PageContainerProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Consistent page width + spacing + typography.
 * Keeps every screen visually aligned (stops the “each page looks different” problem).
 */
export default function PageContainer({
  title,
  subtitle,
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto w-full max-w-md px-5 pb-28 pt-6">
        {(title || subtitle) && (
          <header className="mb-6">
            {title && (
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-base text-white/70 leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <main className="space-y-4">{children}</main>
      </div>
    </div>
  );
}