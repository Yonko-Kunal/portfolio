import React, { forwardRef } from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`container hatchedBackground mx-auto max-w-3xl px-4 animate-fade-in-blur ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Container.displayName = 'Container';

export default Container;