import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// 1. 사용할 체인 설정 (이더리움 메인넷, 세폴리아 테스트넷)
// 설명: 어떤 블록체인 네트워크와 대화할지 정하는 겁니다.
export const config = createConfig({
    chains: [mainnet, sepolia],

    // 2. 전송 계층 설정 (Transports)
    // 설명: http()는 RPC 노드와 통신하는 기본 방식입니다.
    // API Key가 없으면 기본 공용 노드를 씁니다.
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
});
