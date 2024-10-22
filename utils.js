import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

// 헤더를 읽는 함수
export const readHeader = (buffer) => {
    return {
        // 빅인디안: 순서대로
        // 리틀인디안: 역순으로
        // 버퍼를 앞에서(0번째 위치)부터
        // 빅인디언 방식으로 32비트(=4바이트)만큼 읽는다.
        length: buffer.readUInt32BE(0),
        // 빅인디언 방식으로 16비트(=2바이트)만큼 읽는다.
        handlerId: buffer.readUInt16BE(TOTAL_LENGTH_SIZE),
    };
};

// 헤더를 쓰는 함수
// 여기서 인자로 받는 length는 메시지의 길이
// 메시지 길이와 핸들러ID를 버퍼로 변환(빅인디안 형식)
export const writeHeader = (length, handlerId) => {
    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
    const buffer = Buffer.alloc(headerSize); // 버퍼 생성(사이즈 = 6)

    // 바이트 배열의 전체 길이를 전송
    // 메시지 길이를 빅엔디안 방식으로 기록 (4바이트)
    buffer.writeUint32BE(length + headerSize, 0);
    // 핸들러 ID를 빅엔디안 방식으로 기록 (2바이트)
    buffer.writeUint16BE(handlerId, TOTAL_LENGTH_SIZE);
    return buffer;
};
