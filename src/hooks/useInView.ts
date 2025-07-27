import { useEffect, useState, useRef } from "react";

export function useInView<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, isVisible] as const;
}
