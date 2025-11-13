'use client';

import ReactMarkdown from 'react-markdown';
import { ProjectComponents } from './ProjectComponents';

interface MarkdownContentProps {
    content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <div className="prose prose-neutral max-w-none dark:prose-invert">
            <ReactMarkdown components={ProjectComponents}>{content}</ReactMarkdown>
        </div>
    );
}
