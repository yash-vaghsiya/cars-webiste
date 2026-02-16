// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AdminService } from '../service/admin-service';
// import { CommonModule } from '@angular/common';
// import { required } from '@angular/forms/signals';

// @Component({
//   selector: 'app-contact-us',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './contact-us.html',
//   styleUrl: './contact-us.css',
// })
// export class ContactUs {
// contactData = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     subject: '',
//     message: ''
//   };

//   constructor(private adminService: AdminService) {}

//   submitForm() {
//     console.log("stat");
    
//     this.adminService.submitMessage(this.contactData).subscribe({
//       next: (res) => {
//         alert('Message sent successfully!');
//         this.contactData = { firstName: '', lastName: '', email: '', subject: '', message: '' };
//       },
//       error: (err) => alert('Error sending message')
//     });
//   }
//   // submitForm() {
//   //   alert('Thank you! Our luxury concierge will contact you shortly.');
//   // }
// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {
  contactData: any = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private adminService: AdminService) {}

  submitForm() {
    // Step 1: Get all existing messages to find the last ID
    this.adminService.getMessages().subscribe({
      next: (allMessages: any[]) => {
        
        // Step 2: Calculate New ID (Max ID + 1)
        const maxId = allMessages.length > 0 
          ? Math.max(...allMessages.map(m => Number(m.id))) 
          : 0;
        
        this.contactData.id = (maxId + 1).toString();

        // Step 3: Submit the message with the new ID
        this.sendToApi();
      },
      error: (_err: any) => {
        alert('Could not verify ID sequence. Please try again.');
      }
    });
  }

  private sendToApi() {
    this.adminService.submitMessage(this.contactData).subscribe({
      next: (_res: any) => {
        alert(`Message sent successfully! (ID: ${this.contactData.id})`);
        this.resetForm();
      },
      error: (_err: any) => alert('Error sending message')
    });
  }

  resetForm() {
    this.contactData = { 
      id: 0, 
      firstName: '', 
      lastName: '', 
      email: '', 
      subject: '', 
      message: '' 
    };
  }
}




