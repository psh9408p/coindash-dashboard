"use client";

import { useEffect, useRef } from "react";
import { useDisconnect, useAccount } from "wagmi";

const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1시간 (밀리초 단위)

/**
 * 사용자 활동이 없을 경우 자동으로 지갑 연결을 해제하는 Hook
 */
export function useAutoDisconnect() {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    
    // 마지막 활동 시간을 저장할 ref (렌더링에 영향을 주지 않음)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 타이머를 리셋하는 함수
    const resetTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (isConnected) {
            timeoutRef.current = setTimeout(() => {
                console.log("Inactivity detected for 1 hour. Disconnecting wallet...");
                disconnect();
                alert("1시간 동안 활동이 없어 보안을 위해 지갑 연결이 해제되었습니다.");
            }, INACTIVITY_LIMIT);
        }
    };

    useEffect(() => {
        // 지갑이 연결된 상태에서만 이벤트 리스너 등록
        if (!isConnected) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return;
        }

        // 감지할 사용자 활동 이벤트들
        const events = [
            "mousedown",
            "mousemove",
            "keypress",
            "scroll",
            "touchstart",
        ];

        // 초기 타이머 설정
        resetTimer();

        // 모든 이벤트에 타이머 리셋 함수 등록
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        // 클린업 함수: 컴포넌트 언마운트 시 리스너 및 타이머 제거
        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isConnected, disconnect]); // 연결 상태가 바뀔 때마다 리스너 재설정
}
