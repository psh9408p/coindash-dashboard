/**
 * 지갑 잔고 문자열을 받아 소수점 N자리까지 포맷팅합니다.
 * 값이 없거나 유효하지 않으면 '0.0000'을 반환합니다.
 */
export function formatBalance(value?: string, decimals: number = 4): string {
    if (!value) return "0.0000";
    const num = Number(value);
    if (isNaN(num)) return "0.0000";
    return num.toFixed(decimals);
}

/**
 * 지갑 주소 포맷팅 (앞 6자리 + ... + 뒤 4자리)
 * @param address - 지갑 주소 (예: "0x1234567890abcdef1234567890abcdef12345678")
 * @param startLength - 앞에서 표시할 문자 수 (기본값: 6)
 * @param endLength - 뒤에서 표시할 문자 수 (기본값: 4)
 * @returns 포맷팅된 주소 (예: "0x1234...5678")
 */
export function formatAddress(
    address: string,
    startLength: number = 6,
    endLength: number = 4
): string {
    if (!address || address.length < startLength + endLength) {
        return address;
    }

    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
