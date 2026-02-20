import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage, ChatService } from '../service/chat.service';

@Component({
  selector: 'app-car-chat-assistant',
  imports: [CommonModule, FormsModule ],
  templateUrl: './car-chat-assistant.html',
  styleUrl: './car-chat-assistant.css',
})
export class CARCHATASSISTANT {
@ViewChild('scrollBox') scrollBox!: ElementRef<HTMLDivElement>;

  isOpen = false;
  input = '';
  isTyping = false;

  messages: ChatMessage[] = [
    {
      role: 'bot',
      text: `Hi! 👋 I'm your car support assistant.
Ask me about: prices, mileage, EMI, best car suggestions, SUVs, electric cars, and more.`
    }
  ];

  constructor(private bot: ChatService) {}

  toggle() {
    this.isOpen = !this.isOpen;
    setTimeout(() => this.scrollToBottom(), 50);
  }

  send() {
    const text = this.input.trim();
    if (!text || this.isTyping) return;

    this.messages.push({ role: 'user', text });
    this.input = '';
    this.scrollToBottom();

    this.isTyping = true;

    this.bot.ask(text).subscribe({
      next: (reply) => {
        this.messages.push({ role: 'bot', text: reply });
        this.isTyping = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({
          role: 'bot',
          text: "Sorry 😕 I couldn't respond right now. Please try again."
        });
        this.isTyping = false;
        this.scrollToBottom();
      }
    });
  }

  onEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') this.send();
  }

  private scrollToBottom() {
    if (!this.scrollBox) return;
    const el = this.scrollBox.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
