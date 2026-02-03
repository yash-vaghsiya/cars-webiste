import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSubmit() {
    this.successMsg = true;

    console.log('Appointment Data:', this.appointment);

    // Reset form after submit
    this.appointment = {
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      message: ''
    };

    setTimeout(() => {
      this.successMsg = false;
    }, 2000); // Hide message after 25 seconds
  }
}
