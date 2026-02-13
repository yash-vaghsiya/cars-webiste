import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';
import { CommonModule } from '@angular/common';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {
contactData = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private adminService: AdminService) {}

  submitForm() {
    console.log("stat");
    
    this.adminService.submitMessage(this.contactData).subscribe({
      next: (res) => {
        alert('Message sent successfully!');
        this.contactData = { firstName: '', lastName: '', email: '', subject: '', message: '' };
      },
      error: (err) => alert('Error sending message')
    });
  }
  // submitForm() {
  //   alert('Thank you! Our luxury concierge will contact you shortly.');
  // }
}






