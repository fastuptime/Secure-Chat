const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const aes = require('crypto-js/aes');
const CryptoJS = require('crypto-js');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const messageHistory = [];
const activeUsers = new Set();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    if (req.body.username && req.body.hash) {
        res.cookie('username', req.body.username);
        res.cookie('hash', req.body.hash);
        res.redirect('/chat');
    } else {
        res.redirect('/');
    }
});

app.get('/chat', (req, res) => {
    if (!req.cookies.username || !req.cookies.hash) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    const username = socket.handshake.headers.cookie?.split(';')
        .find(c => c.trim().startsWith('username='))
        ?.split('=')[1];
    
    if (username) {
        const decodedUsername = decodeURIComponent(username);
        activeUsers.add(decodedUsername);
        
        io.emit('online-users', activeUsers.size);
        
        io.emit('user-activity', {
            type: 'join',
            username: decodedUsername,
            timestamp: new Date()
        });

        console.log(`[User connected] ${decodedUsername} (${socket.id}) - ${socket.handshake.headers['user-agent']} - IP: ${socket.handshake.address}`);
    }
    
    socket.emit('message-history', messageHistory);

    socket.on('message', (msg) => {
        if (msg.username && msg.message) {
            console.log(`[New message] ${msg.username}: ${msg.message}`);
            
            const messageData = {
                username: msg.username,
                message: msg.message,
                timestamp: new Date(),
                senderId: socket.id
            };
            
            messageHistory.push(messageData);

            io.emit('message', {
                username: msg.username,
                message: msg.message,
                timestamp: messageData.timestamp,
                senderId: socket.id
            });
        }
    });
    
    socket.on('disconnect', () => {
        const username = socket.handshake.headers.cookie?.split(';')
            .find(c => c.trim().startsWith('username='))
            ?.split('=')[1];
        
        if (username) {
            const decodedUsername = decodeURIComponent(username);
            activeUsers.delete(decodedUsername);
            
            io.emit('online-users', activeUsers.size);
            
            io.emit('user-activity', {
                type: 'leave',
                username: decodedUsername,
                timestamp: new Date()
            });

            console.log(`[User disconnected] ${decodedUsername}`);
        }
    });
});

server.listen(80, () => {
    console.log('Server is running on http://localhost:80');
});