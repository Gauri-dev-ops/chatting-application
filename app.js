// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the messages collection
const messagesRef = firebase.database().ref('messages');

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  if (message) {
      messagesRef.push().set({
          text: message,
          timestamp: new Date().toISOString()
      });

      messageInput.value = '';
  }
}

// Function to display messages
function displayMessages() {
  messagesRef.on('child_added', (snapshot) => {
      const messageData = snapshot.val();
      const messageElement = document.createElement('div');
      messageElement.textContent = messageData.text;
      document.getElementById('messages').appendChild(messageElement);
  });
}

// Add event listener to send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Load messages
displayMessages();
