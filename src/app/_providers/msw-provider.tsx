"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
    const [mswReady, setMswReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (process.env.NODE_ENV === "development") {
                // 브라우저 환경에서만 worker 실행
                if (typeof window !== "undefined") {
                    const { worker } = await import(
                        "@/shared/api/mocks/browser"
                    );
                    await worker.start({
                        onUnhandledRequest: "bypass", // 정의되지 않은 요청은 그냥 통과시킴
                    });
                }
            }
            setMswReady(true);
        };

        init();
    }, []);

    // MSW가 준비되기 전에는 아무것도 렌더링하지 않음 (Hydration Mismatch 방지)
    if (!mswReady) {
        return null;
    }

    return <>{children}</>;
}
