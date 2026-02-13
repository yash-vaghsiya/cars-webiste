// import { Component } from '@angular/core';
// import { AdminService } from '../service/admin-service';

// @Component({
//   selector: 'app-sell-car',
//   imports: [],
//   templateUrl: './sell-car.html',
//   styleUrl: './sell-car.css',
// })
// export class SellCar {
// // Object to bind to your form
//   carData = {
//     name: '', email: '', mobile: '', state: '', city: '',
//     brand: '', model: '', variant: '', year: '', km: '',
//     ownership: '', regNumber: ''
//   };
//   constructor(private adminService: AdminService) {}

// onSubmit() {
//   console.log('Attempting to submit:', this.carData); // Debug log
//   this.adminService.submitInquiry(this.carData).subscribe({
//     next: (res) => {
//       alert('Success! Data sent to server.');
//       console.log('Server Response:', res);
//       this.resetForm();
//     },
//     error: (err) => {
//       alert('Error: Could not save data. Check if JSON Server is running on port 3000.');
//       console.error(err);
//     }
//   });
// }

//   resetForm() {
//     this.carData = { name: '', email: '', mobile: '', state: '', city: '', brand: '', model: '', variant: '', year: '', km: '', ownership: '', regNumber: '' };
//   }
// }

import { Component } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { FormsModule } from '@angular/forms'; // 1. Add this import

@Component({
  selector: 'app-sell-car',
  standalone: true,
  imports: [FormsModule], // 2. Add this to imports
  templateUrl: './sell-car.html',
  styleUrl: './sell-car.css',
})
export class SellCar {
  carData = {
    name: '', email: '', mobile: '', state: '', city: '',
    brand: '', model: '', variant: '', year: '', km: '',
    ownership: '', regNumber: ''
  };

  constructor(private adminService: AdminService) {}

  onSubmit() {
    this.adminService.submitInquiry(this.carData).subscribe({
      next: (res) => {
        alert('Success! Inquiry submitted.');
        this.resetForm();
      },
      error: (err) => alert('Error saving data')
    });
  }

  resetForm() {
    this.carData = { name: '', email: '', mobile: '', state: '', city: '', brand: '', model: '', variant: '', year: '', km: '', ownership: '', regNumber: '' };
  }
}