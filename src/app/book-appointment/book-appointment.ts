// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AdminService } from '../service/admin-service';

// @Component({
//   selector: 'app-book-appointment',
//   imports: [CommonModule , FormsModule], 
//   templateUrl: './book-appointment.html',
//   styleUrl: './book-appointment.css',
// })
// export class BookAppointment {
//  appointment = {  
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     date: '',
//     message: ''
//   };

//   successMsg: boolean = false;
//   constructor(private adminService: AdminService) {}

//   isSubmitting: boolean = false; // Add this variable

//   // constructor(private adminService: AdminService) {}

//   onSubmit() {
//     if (this.isSubmitting) return; // Prevent double submission if already sending
    
//     this.isSubmitting = true;
//     const appointmentData = { ...this.appointment, status: 'Pending' };

//     this.adminService.addAppointment(appointmentData).subscribe({
//       next: () => {
//         this.successMsg = true;
//         this.isSubmitting = false; // Reset loading state
//         this.appointment = { name: '', email: '', phone: '', service: '', date: '', message: '' };
//         setTimeout(() => (this.successMsg = false), 2000);
//       },
//       error: (err) => {
//         this.isSubmitting = false;
//         alert("Booking failed. Please try again.");
//       }
//     });
//   }
// }




import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-book-appointment',
  imports: [CommonModule, FormsModule, Footer], 
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointment {
 appointment = {  
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
      time: '',
    message: ''
  };
  

  successMsg: boolean = false;
  constructor(private adminService: AdminService) {}

  isSubmitting: boolean = false; // Add this variable

  // constructor(private adminService: AdminService) {}

  onSubmit() {
    if (this.isSubmitting) return; // Prevent double submission if already sending
    
    this.isSubmitting = true;
    const appointmentData = { ...this.appointment, status: 'Pending' };

    this.adminService.addAppointment(appointmentData).subscribe({
      next: () => {
        this.successMsg = true;
        this.isSubmitting = false; // Reset loading state
        this.appointment = { name: '', email: '', phone: '', service: '', date: '',time:'', message: '' };
        setTimeout(() => (this.successMsg = false), 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        alert("Booking failed. Please try again.");
      }
    });
  }
}

