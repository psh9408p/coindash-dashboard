import { create } from "zustand";

// 1. 상태의 타입 정의 (Interface)
interface AppState {
    isInitialized: boolean;
    setInitialized: (val: boolean) => void;
}

// 2. 스토어 생성 (Hook처럼 사용)
export const useAppStore = create<AppState>((set) => ({
    isInitialized: false, // 초기값
    setInitialized: (val) => set({ isInitialized: val }), // 상태 변경 함수
}));
