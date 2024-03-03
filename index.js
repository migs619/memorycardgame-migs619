
const { uuid } = require('uuid');
const { v1 } = require('radix-sort-migs619');
const { v2 } = require('odd-numbers-migs619');

// memoryCardGame.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E']; // Cards to match
let shuffledCards = shuffle(cards.slice());
let revealedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function printBoard() {
    let board = '';
    for (let i = 0; i < shuffledCards.length; i++) {
        if (revealedCards.includes(i)) {
            board += shuffledCards[i];
        } else {
            board += 'X'; // Placeholder for unrevealed cards
        }
        if ((i + 1) % 4 === 0) {
            board += '\n';
        } else {
            board += ' ';
        }
    }
    console.log(board);
}

rl.on('line', input => {
    const index = parseInt(input) - 1;
    if (index >= 0 && index < shuffledCards.length && !revealedCards.includes(index)) {
        revealedCards.push(index);
        printBoard();
        if (revealedCards.length === 2) {
            const [card1, card2] = revealedCards.map(index => shuffledCards[index]);
            if (card1 === card2) {
                console.log('Match found!');
            } else {
                console.log('No match, try again.');
                revealedCards = [];
            }
        }
    } else {
        console.log('Invalid input, try again.');
    }
});

console.log('Welcome to Memory Card Game!');
printBoard();


module.exports = { printBoard };
