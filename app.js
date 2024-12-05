const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');

// Connect to WebSocket server
const socket = new WebSocket('ws://localhost:8080');

// Handle incoming messages
socket.onmessage = (event) => {
    appendMessage(event.data, 'received');
};

// Send a message
sendBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        const fullMessage = `${username}: ${message}`;
        appendMessage(fullMessage, 'sent');
        socket.send(fullMessage);
        messageInput.value = '';
    }
});

// Append a message to the chat box
function appendMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
