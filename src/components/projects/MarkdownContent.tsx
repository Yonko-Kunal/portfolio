'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ProjectComponents } from './ProjectComponents';

interface MarkdownContentProps {
    mdxSource: MDXRemoteSerializeResult;
}

export function MarkdownContent({ mdxSource }: MarkdownContentProps) {
    return (
        <div className="prose prose-neutral max-w-none dark:prose-invert">
            <MDXRemote {...mdxSource} components={ProjectComponents} />
        </div>
    );
}
