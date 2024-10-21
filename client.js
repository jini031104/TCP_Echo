import net from 'net';

const HOST = 'localhost';
const PORT = 5555;

// 소켓 생성
const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Connected to server`);
});

client.on('data', (data) => {
    console.log(data);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Client error:', err);
});
