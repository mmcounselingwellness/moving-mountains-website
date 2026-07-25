import ReactMarkdown from "react-markdown";

export default function Markdown({ text, className = "" }: { text: string; className?: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className={`mt-6 text-base/7 text-gray-600 first:mt-0 ${className}`}>{children}</p>,
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
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
