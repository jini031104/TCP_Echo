import net from 'net';
import { writeHeader, readHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const HOST = 'localhost';
const PORT = 5555;

// 소켓 생성
const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Connected to server`);

    const message = 'Hello';
    const buffer = Buffer.from(message);

    const header = writeHeader(buffer.length, 10); // 핸들러ID는 임의로 10 설정...
    const packet = Buffer.concat([header, buffer]); // 헤더와 실제 메시지를 합쳐서 보내기 위해 사용
    client.write(packet); // write 메서드로 버퍼를 서버에게 보내기
});

client.on('data', (data) => {
    const buffer = Buffer.from(data);

    console.log(data);
    const { length, handlerId } = readHeader(data);
    console.log(`handlerId: ${handlerId}`);
    console.log(`length: ${length}`);

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
    const message = buffer.slice(headerSize);

    console.log(`서버에게 받은 메시지: ${message}`);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Client error:', err);
});
