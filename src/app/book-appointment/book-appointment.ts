import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';

@Component({
  selector: 'app-book-appointment',
  imports: [CommonModule , FormsModule], 
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
    message: ''
  };

  successMsg: boolean = false;

  // onSubmit() {
  //   this.successMsg = true;

  //   console.log('Appointment Data:', this.appointment);

  //   // Reset form after submit
  //   this.appointment = {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     service: '',
  //     date: '',
  //     message: ''
  //   };

  //   setTimeout(() => {
  //     this.successMsg = false;
  //   }, 2000); // Hide message after 25 seconds
  // }

  // ============================================================================================================================================

  constructor(private adminService: AdminService) {}

// onSubmit() {
//   this.adminService.addAppointment(this.appointment).subscribe({
//     next: () => {
//       this.successMsg = true;
//       this.appointment = { name: '', email: '', phone: '', service: '', date: '', message: '' };
//       setTimeout(() => this.successMsg = false, 3000);
//     },
//     error: (err) => alert("Booking failed. Is the server running?")
//   });
// }
// Inside book-appointment.ts
// onSubmit() {
//   const newBooking = { ...this.appointment, status: 'Pending' }; // Add default status
//   this.adminService.addAppointment(newBooking).subscribe({
//     next: () => {
//       this.successMsg = true;
//       // ... rest of your reset logic
//     }
//   });
// }
// book-appointment.ts

// onSubmit() {
//   // Explicitly set status to Pending so it shows up in the admin list
//   const appointmentData = { ...this.appointment, status: 'Pending' };

//   this.adminService.addAppointment(appointmentData).subscribe({
//     next: () => {
//       this.successMsg = true;
//       this.appointment = { name: '', email: '', phone: '', service: '', date: '', message: '' };
//       setTimeout(() => (this.successMsg = false), 2000);
//     },
//     error: (err) => alert("Failed to book appointment. Check server.")
//   });
// }


// appointment = { name: '', email: '', phone: '', service: '', date: '', message: '' };
//   successMsg: boolean = false;
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
        this.appointment = { name: '', email: '', phone: '', service: '', date: '', message: '' };
        setTimeout(() => (this.successMsg = false), 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        alert("Booking failed. Please try again.");
      }
    });
  }
}
