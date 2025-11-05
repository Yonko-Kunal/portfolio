// app/resume/ResumeViewer.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ResumeViewer({ url }: { url: string }) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="mx-auto max-w-3xl w-full rounded-2xl overflow-hidden shadow-lg border">
            <div className="flex justify-center mt-4">
                <Button asChild variant="outline">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Download Resume (PDF)
                    </a>
                </Button>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-[70vh] text-muted-foreground text-sm">
                    Loading resume...
                </div>
            )}
            <iframe
                src={url}
                title="Resume Document"
                aria-label="Resume PDF Viewer"
                className="w-full h-[85vh]"
                onLoad={() => setLoading(false)}
            />
        </div>
    );
}
