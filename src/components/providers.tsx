"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const updateCoords = (e: PointerEvent | MouseEvent) => {
            if (e.clientX !== undefined && e.clientY !== undefined && (e.clientX !== 0 || e.clientY !== 0)) {
                document.documentElement.style.setProperty("--click-x", `${e.clientX}px`);
                document.documentElement.style.setProperty("--click-y", `${e.clientY}px`);
            }
        };

        window.addEventListener("pointerdown", updateCoords, { passive: true });
        return () => window.removeEventListener("pointerdown", updateCoords);
    }, []);
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
        >
            {children}
        </ThemeProvider>
    );
}