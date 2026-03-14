import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-number-game',
  imports: [CommonModule, RouterLink],
  templateUrl: './number-game.html',
  styleUrl: './number-game.css',
})
export class NumberGame implements OnInit {
  protected readonly title = 'angular-chatbot';

  userSecret: number | null = null;
  botSecret: number = Math.floor(Math.random() * 100) + 1;
  messages: {sender: 'user' | 'bot', text: string}[] = [];
  currentTurn: 'user' | 'bot' = 'user';
  gameOver: boolean = false;
  winner: string | null = null;
  waitingForResponse: boolean = false;
  botMin: number = 1;
  botMax: number = 100;
  lastBotGuess: number = 0;

  ngOnInit() {
    this.messages.push({sender: 'bot', text: 'Hello! Let\'s play a number guessing game. Choose your secret number between 1-100.'});
  }

  setUserSecret(num: number) {
    if (num < 1 || num > 100 || isNaN(num)) {
      this.messages.push({sender: 'bot', text: 'Please enter a valid number between 1 and 100.'});
      return;
    }
    this.userSecret = num;
    this.messages.push({sender: 'bot', text: 'Great! I have my number too. You start guessing my number between 1-100.'});
    this.currentTurn = 'user';
    this.waitingForResponse = false;
  }

  sendMessage(text: string) {
    if (this.gameOver || !text.trim()) return;

    if (this.waitingForResponse) {
      // User responding to bot's guess
      this.messages.push({sender: 'user', text});
      const response = text.toLowerCase().trim();
      if (response === 'higher') {
        this.botMin = this.lastBotGuess + 1;
      } else if (response === 'lower') {
        this.botMax = this.lastBotGuess - 1;
      } else if (response === 'correct') {
        this.messages.push({sender: 'bot', text: 'Yay! I guessed your number. I win!'});
        this.gameOver = true;
        this.winner = 'bot';
        return;
      } else {
        this.messages.push({sender: 'bot', text: 'Please say "higher", "lower", or "correct".'});
        return;
      }
      this.waitingForResponse = false;
      this.currentTurn = 'user';
    } else if (this.currentTurn === 'user') {
      // User guessing bot's number
      const guess = parseInt(text);
      if (isNaN(guess) || guess < 1 || guess > 100) {
        this.messages.push({sender: 'user', text});
        this.messages.push({sender: 'bot', text: 'Please enter a number between 1 and 100.'});
        return;
      }
      this.messages.push({sender: 'user', text});
      if (guess === this.botSecret) {
        this.messages.push({sender: 'bot', text: 'Correct! You guessed my number. You win!'});
        this.gameOver = true;
        this.winner = 'user';
      } else if (guess < this.botSecret) {
        this.messages.push({sender: 'bot', text: 'Higher!'});
      } else {
        this.messages.push({sender: 'bot', text: 'Lower!'});
      }
      if (!this.gameOver) {
        this.currentTurn = 'bot';
        this.botGuess();
      }
    }
  }

  resetGame() {
    this.userSecret = null;
    this.botSecret = Math.floor(Math.random() * 100) + 1;
    this.messages = [{sender: 'bot', text: 'Hello! Let\'s play a number guessing game. Choose your secret number between 1-100.'}];
    this.currentTurn = 'user';
    this.gameOver = false;
    this.winner = null;
    this.waitingForResponse = false;
    this.botMin = 1;
    this.botMax = 100;
    this.lastBotGuess = 0;
  }

  botGuess() {
    if (this.botMin > this.botMax) {
      this.messages.push({sender: 'bot', text: 'Hmm, something went wrong. Let\'s reset the game.'});
      this.resetGame();
      return;
    }
    this.lastBotGuess = Math.floor((this.botMin + this.botMax) / 2);
    this.messages.push({sender: 'bot', text: `My guess is ${this.lastBotGuess}. Is it higher, lower, or correct?`});
    this.waitingForResponse = true;
    this.currentTurn = 'user'; // User responds
  }

}
