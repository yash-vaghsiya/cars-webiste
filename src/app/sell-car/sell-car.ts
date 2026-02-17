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

// import { Component } from '@angular/core';
// import { AdminService } from '../service/admin-service';
// import { FormsModule } from '@angular/forms'; // 1. Add this import

// @Component({
//   selector: 'app-sell-car',
//   standalone: true,
//   imports: [FormsModule], // 2. Add this to imports
//   templateUrl: './sell-car.html',
//   styleUrl: './sell-car.css',
// })
// export class SellCar {
//   carData = {
//     name: '', email: '', mobile: '', state: '', city: '',
//     brand: '', model: '', variant: '', year: '', km: '',
//     ownership: '', regNumber: ''
//   };

//   constructor(private adminService: AdminService) {}

//   onSubmit() {
//     this.adminService.submitInquiry(this.carData).subscribe({
//       next: (res) => {
//         alert('Success! Inquiry submitted.');
//         this.resetForm();
//       },
//       error: (err) => alert('Error saving data')
//     });
//   }

  

//   resetForm() {
//     this.carData = { name: '', email: '', mobile: '', state: '', city: '', brand: '', model: '', variant: '', year: '', km: '', ownership: '', regNumber: '' };
//   }
// }


  import { Component } from '@angular/core';
  import { AdminService } from '../service/admin-service';
  import { FormsModule } from '@angular/forms';
import { Footer } from "../footer/footer";

  @Component({
    selector: 'app-sell-car',
    standalone: true,
    imports: [FormsModule, Footer],
    templateUrl: './sell-car.html',
    styleUrl: './sell-car.css',
  })
  export class SellCar {
    carData: any = {
      id: 0, // Initialize with 0
      name: '', email: '', mobile: '', state: '', city: '',
      brand: '', model: '', variant: '', year: '', km: '',
      ownership: '', regNumber: ''
    };

    constructor(private adminService: AdminService) {}

    onSubmit() {
      // Step 1: Get all existing records to find the last ID
      this.adminService.getAllInquiries().subscribe({
        next: (allCars: any[]) => {
          
          // Step 2: Calculate New ID (Last ID + 1)
          // If no cars exist, start at 1
          const maxId = allCars.length > 0 
            ? Math.max(...allCars.map(car => Number(car.id))) 
            : 0;
          
          this.carData.id = (maxId + 1).toString(); // Set the new sequential ID

          // Step 3: Send the data with the manually generated ID
          this.saveCar();
        },
        error: (err) => alert('Could not connect to server to generate ID')
      });
    }

    saveCar() {
      this.adminService.submitInquiry(this.carData).subscribe({
        next: (res) => {
          alert(`Success! Car saved with Sequential ID: ${this.carData.id}`);
          this.resetForm();
        },
        error: (err) => alert('Error saving data')
      });
    }

    resetForm() {
      this.carData = { 
        id: 0, name: '', email: '', mobile: '', state: '', city: '', 
        brand: '', model: '', variant: '', year: '', km: '', 
        ownership: '', regNumber: '' 
      };
    }
  }