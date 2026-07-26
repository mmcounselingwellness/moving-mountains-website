import ReactMarkdown from "react-markdown";
import { Fragment } from "react";

const headlineClass = "text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl";

function CtaButton({ children }: { children: unknown }) {
  try {
    const data = JSON.parse(String(children).trim());
    return (
      <a
        href={data.link}
        className="mt-6 inline-block bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium rounded-lg text-center"
      >
        {data.label}
      </a>
    );
  } catch {
    return null;
  }
}

export default function Markdown({
  text,
  className = "",
  inline = false,
}: {
  text: string;
  className?: string;
  inline?: boolean;
}) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className={`${headlineClass} first:mt-0 mt-6`}>{children}</h1>,
        h2: ({ children }) => <h2 className={`${headlineClass} first:mt-0 mt-6`}>{children}</h2>,
        h3: ({ children }) => <p className="text-base/7 font-semibold text-primary first:mt-0 mt-6">{children}</p>,
        h4: ({ children }) => <p className="text-xl/8 text-balance text-gray-700 first:mt-0 mt-6">{children}</p>,
        p: ({ children }) =>
          inline ? (
            <Fragment>{children}</Fragment>
          ) : (
            <p className={`mt-6 text-base/7 text-gray-600 first:mt-0 ${className}`}>{children}</p>
          ),
        ul: ({ children }) => <ul className="list-disc pl-6 mt-4 text-base/7 text-gray-600 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mt-4 text-base/7 text-gray-600 space-y-1">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ href, children }) => (
          <a href={href} className="font-semibold text-heading hover:text-primary">
            {children}
          </a>
        ),
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ src, alt }) => <img src={src} alt={alt ?? ""} className="mt-6 w-full rounded-xl object-cover" />,
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children }) => {
          if (className === "language-cta") return <CtaButton>{children}</CtaButton>;
          return <code className={className}>{children}</code>;
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
