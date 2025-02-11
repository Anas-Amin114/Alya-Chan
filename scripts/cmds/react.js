const readline = require('readline');

// Set up readline interface for input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Flag to check if auto-react is on or off
let isAutoReactOn = false;

// Example reactions array with 100 different reactions and messages
const reactions = [
  { keyword: 'hello', reaction: '😊', message: 'Hello! How can I assist you today?' },
  { keyword: 'hi', reaction: '👋', message: 'Hey there! What can I do for you?' },
  { keyword: 'thanks', reaction: '🙏', message: 'You\'re very welcome!' },
  { keyword: 'how are you', reaction: '🤖', message: 'I\'m doing great, thanks for asking! How about you?' },
  { keyword: 'bye', reaction: '👋', message: 'Goodbye! Have a great day!' },
  { keyword: 'help', reaction: '🤔', message: 'I\'m here to help! Tell me what you need.' },
  { keyword: 'weather', reaction: '🌦', message: 'It\'s a sunny day! Enjoy the weather!' },
  { keyword: 'good morning', reaction: '🌞', message: 'Good morning! Have a wonderful day ahead.' },
  { keyword: 'good night', reaction: '🌙', message: 'Good night! Sleep tight!' },
  { keyword: 'love', reaction: '❤️', message: 'Love is in the air!' },
  { keyword: 'thank you', reaction: '🙏', message: 'I\'m glad I could help!' },
  { keyword: 'sorry', reaction: '😔', message: 'It\'s okay, no worries!' },
  { keyword: 'okay', reaction: '👌', message: 'Got it! Let me know if you need anything else.' },
  { keyword: 'yes', reaction: '👍', message: 'Great! I\'m glad we are on the same page.' },
  { keyword: 'no', reaction: '👎', message: 'Oh no! What happened?' },
  { keyword: 'cool', reaction: '😎', message: 'That\'s really cool! Keep it up!' },
  { keyword: 'awesome', reaction: '💥', message: 'Awesome! I love that enthusiasm!' },
  { keyword: 'sorry', reaction: '😞', message: 'No worries, we all make mistakes.' },
  { keyword: 'birthday', reaction: '🎉', message: 'Happy Birthday! Wishing you the best!' },
  { keyword: 'congratulations', reaction: '🎉', message: 'Congrats on your achievement!' },
  { keyword: 'party', reaction: '🎉', message: 'Let\'s party! 🎉🎉🎉' },
  { keyword: 'work', reaction: '💼', message: 'Keep working hard! Success is on its way.' },
  { keyword: 'school', reaction: '🎓', message: 'Learning is the key to success. Keep going!' },
  { keyword: 'fun', reaction: '😄', message: 'Let\'s have some fun! 🎉' },
  { keyword: 'name', reaction: '🤖', message: 'I am Anas, your bot assistant. How can I help you?' },
  { keyword: 'author', reaction: '🖋️', message: 'The author of this bot is Anas.' },
  // Add 80 more here in a similar pattern
];

// Function to handle command input
function handleCommand(command) {
  const lowerCommand = command.toLowerCase();

  switch (lowerCommand) {
    case 'react on':
      isAutoReactOn = true;
      console.log('Auto-react is now ON.');
      break;
    case 'react off':
      isAutoReactOn = false;
      console.log('Auto-react is now OFF.');
      break;
    default:
      console.log('Invalid command. Use "react on" or "react off".');
  }
}

// Function to handle multiple types of messages and reactions
function handleMessage(message) {
  if (isAutoReactOn) {
    const lowerMessage = message.toLowerCase();

    // Search through the reactions array for a match
    for (let i = 0; i < reactions.length; i++) {
      if (lowerMessage.includes(reactions[i].keyword)) {
        console.log(`Bot reacts with: ${reactions[i].reaction} - ${reactions[i].message}`);
        return; // React to the first matched keyword and stop
      }
    }

    // Default reaction if no match found
    console.log('Bot reacts with: 👍 (Not sure how to react, but okay!)');
  }
}

// Start reading input from the user
rl.on('line', (input) => {
  // If user types a command, handle it
  if (input.startsWith('react')) {
    handleCommand(input);
  } else {
    // If not a command, process it as a message
    console.log(`Message: ${input}`);
    handleMessage(input);
  }
});

// Welcome message
console.log('Welcome to Goat Bot!');
console.log('Type "react on" to enable auto-reaction or "react off" to disable it.');
console.log('You can also type a message to simulate a chat.');