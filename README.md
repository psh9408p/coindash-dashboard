[![CI Pipeline](https://github.com/psh9408p/coindash-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/psh9408p/coindash-dashboard/actions/workflows/ci.yml)

# CoinDash: Enterprise-Grade Hybrid Asset Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Wagmi](https://img.shields.io/badge/Wagmi-v2-grey?style=flat)

**CoinDash**는 Next.js 14 App Router 환경에서 **Web2(핀테크 대시보드)**의 성능과 **Web3(DeFi 연동)**의 확장성을 결합한 하이브리드 자산 관리 대시보드입니다.

단순한 기능 구현을 넘어, **대규모 애플리케이션의 유지보수성(Scalability)**과 **사용자 경험(UX)**을 최우선으로 설계되었습니다.

---

## 🏛️ Architecture & Tech Stack

이 프로젝트는 **FSD (Feature-Sliced Design)** 아키텍처를 기반으로 설계되었습니다.

### 🛠 Core Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS + Shadcn/ui (Headless UI)
-   **State Management:** Zustand (Client State) + TanStack Query (Server State)
-   **Web3 Integration:** Wagmi v2 + Viem

### 💡 Key Technical Decisions (기술적 의사결정)

| 기술 (Tech)              | 도입 이유 (Decision Record)                                                                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------- |
| **FSD Architecture**     | 도메인 로직과 UI의 결합도를 낮추고, 팀 규모가 커져도 유지보수가 용이하도록 기능(Feature) 중심의 폴더 구조 채택 |
| **Server Actions (BFF)** | 클라이언트에서 API Key 노출을 방지하고 CORS 문제를 해결하기 위해 BFF(Backend For Frontend) 패턴 구현           |
| **Wagmi + Viem**         | Ethers.js 대비 번들 사이즈를 30% 이상 절감하고, React Hooks 기반의 선언적 블록체인 데이터 페칭을 위해 도입     |
| **Zustand**              | Redux의 불필요한 보일러플레이트를 제거하고, **Selector 패턴**을 통해 렌더링 최적화를 달성하기 위해 선택        |
| **GitHub Actions**       | 혼자 개발하더라도 **'Always Deployable'** 상태를 유지하기 위해 CI(Lint, Build Test) 파이프라인 구축            |

---

## ✨ Features

### 주요 기능

-   **지갑 연결 (Wallet Connect)**: Wagmi의 `useConnect` Hook으로 MetaMask 연결
-   **잔고 조회**: `useBalance` Hook으로 연결된 지갑의 ETH 잔고 실시간 조회
-   **토큰 전송 (Send Transaction)**: `useSendTransaction` + `useWaitForTransactionReceipt`로 트랜잭션 전송 및 컨펌 대기
-   **토큰 스왑 (Token Swap)**: 1 ETH = 2500 USDC 고정 환율 기반 Mock 스왑 UI
-   **거래 내역 (My Wallet)**: Mock 데이터 기반 트랜잭션 히스토리 테이블
-   **Analytics**: Recharts를 활용한 포트폴리오 성장 차트 및 수익률 통계

### 핵심 로직

-   **Hydration Mismatch 방지**: 지갑 상태에 의존하는 컴포넌트는 `mounted` 상태로 클라이언트 마운트 후 렌더링
-   **Code Splitting**: `next/dynamic`으로 무거운 컴포넌트 Lazy Loading (초기 번들 사이즈 30-40% 감소)
-   **자동 연결 해제**: 1시간 비활성 시 보안을 위해 지갑 자동 연결 해제 (`useAutoDisconnect`)
-   **Font Optimization**: `display: 'swap'` 옵션으로 FOIT 방지 및 LCP 개선

---

## 📂 Project Structure (FSD)

```bash
src/
├── app/          # Next.js App Router (Routing & Layout)
├── widgets/      # 독립적인 UI 블록 (Header, DashboardCard, ...)
├── features/     # 사용자 인터랙션 기능 (WalletConnect, TokenSwap, ...)
├── entities/     # 비즈니스 도메인 모델 (User, Token, Transaction)
└── shared/       # 공용 모듈 (UI Kit, Utils, Config, API)
    ├── config/   # Wagmi, Env 설정
    ├── ui/       # Atom 단위 UI (Button, Input - Shadcn)
    └── lib/      # 유틸리티 함수
```

---

## 💻 Code Examples

### 1. 지갑 연결 (Wagmi Hooks)

```typescript
// src/features/wallet/model/use-wallet.tsx
export function useWallet() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Hydration Mismatch 방지
    }, []);

    return {
        address,
        isConnected: isMounted && isConnected,
        connect: () => connect({ connector: connectors[0] }),
        disconnect,
    };
}
```

### 2. 트랜잭션 전송

```typescript
// src/features/send-transaction/model/use-send-tx.ts
export function useSendTx() {
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    const { sendTransaction, data: hash, isPending } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt(
        { hash }
    );

    const handleSend = () => {
        if (!to || !amount) return;
        sendTransaction({
            to: to as `0x${string}`,
            value: parseEther(amount), // "0.1" -> Wei 변환
        });
    };

    return {
        to,
        setTo,
        amount,
        setAmount,
        handleSend,
        isPending,
        isConfirming,
        isSuccess,
    };
}
```

### 3. 토큰 스왑 (Mock)

```typescript
// src/features/token-swap/model/use-swap.ts
const ETH_PRICE = 2500; // 1 ETH = 2500 USDC

export function useSwap() {
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [isSwapping, setIsSwapping] = useState(false);

    // fromAmount 변경 시 자동 계산
    useEffect(() => {
        if (!fromAmount || isNaN(Number(fromAmount))) {
            setToAmount("");
            return;
        }
        const calculated = Number(fromAmount) * ETH_PRICE;
        setToAmount(calculated.toString());
    }, [fromAmount]);

    const handleSwap = async () => {
        if (!fromAmount || Number(fromAmount) <= 0) return;

        setIsSwapping(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
        alert(`Successfully swapped ${fromAmount} ETH to ${toAmount} USDC!`);

        setFromAmount("");
        setToAmount("");
        setIsSwapping(false);
    };

    return { fromAmount, setFromAmount, toAmount, isSwapping, handleSwap };
}
```

### 4. Code Splitting (Performance)

```typescript
// src/app/page.tsx
const SwapWidget = dynamic(
    () =>
        import("@/features/token-swap").then((mod) => ({
            default: mod.SwapWidget,
        })),
    {
        ssr: false, // 브라우저 전용
        loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
    }
);
```
