// app/resume/page.tsx
import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { resumeConfig } from '@/config/Resume';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import ResumeViewer from './ResumeViewer'; // new client component

export const metadata: Metadata = {
    ...getMetadata('/resume'),
    title: 'Resume | Yonko Kunal',
    description: 'View and download my professional resume.',
    robots: {
        index: true,
        follow: true,
    },
};

export default function ResumePage() {
    return (
        <Container className="py-12">
            <div className="space-y-10">
                <header className="text-center space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Resume
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        A detailed look at my web development journey, skills, and experience.
                    </p>
                </header>
                <Separator />
                <ResumeViewer url={resumeConfig.url} />
            </div>
        </Container>
    );
}
