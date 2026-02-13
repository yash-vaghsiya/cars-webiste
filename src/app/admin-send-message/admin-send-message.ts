import { Component, OnInit, signal } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { AdminService } from '../service/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-send-message',
  imports: [AdminNavbar, CommonModule],
  templateUrl: './admin-send-message.html',
  styleUrl: './admin-send-message.css',
})
export class AdminSendMessage implements OnInit{
messages = signal<any[]>([]);

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.adminService.getMessages().subscribe(data => this.messages.set(data));
  }

  onDelete(id: any) {
    this.adminService.deleteMessage(id).subscribe(() => this.loadMessages());
  }
}
