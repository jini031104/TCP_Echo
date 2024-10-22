import net from 'net';
import { readHeader, writeHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const PORT = 5555;

// 서버 생성
const server = net.createServer((socket) => {
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => {
        const buffer = Buffer.from(data);
        const { length, handlerId } = readHeader(data);
        console.log(`handlerId: ${handlerId}`);
        console.log(`length: ${length}`);

        const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
        const message = buffer.slice(headerSize);

        // message는 버퍼이긴 하지만,
        // console.log()에 들어가면 자동으로 문자열로 변환되어 출력된다.
        console.log(`클라이언트에게 받은 메시지: ${message}`);

        const responseMessage = 'Hi! I am Server!';
        const responseBuffer = Buffer.from(responseMessage);

        const header = writeHeader(responseBuffer.length, handlerId);
        const packet = Buffer.concat([header, responseBuffer]);

        socket.write(packet); // 'data' 이벤트로 받은 data를 같은 클라이언트 socket에게 쓰기
    });

    socket.on('end', () => {
        console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on('error', (err) => {
        console.log(`Socket error, ${err}`);
    });
});

server.listen(PORT, () => {
    console.log(`Echo Server listening on port ${PORT}`);
    console.log(server.address());
});
