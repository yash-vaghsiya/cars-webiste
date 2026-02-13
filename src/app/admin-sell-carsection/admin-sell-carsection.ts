// import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../service/admin-service';
// import { AdminNavbar } from "../admin-navbar/admin-navbar";
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-admin-sell-carsection',
//   imports: [AdminNavbar, CommonModule],
//   templateUrl: './admin-sell-carsection.html',
//   styleUrl: './admin-sell-carsection.css',
// })
// export class AdminSellCarsection implements OnInit {
// // 1. Ensure this is an empty array to start
//   inquiries: any[] = []; 
// cars:any[] = [];

//   constructor(private adminService: AdminService) {}

//  ngOnInit(): void {
//   this.adminService.getCars().subscribe({
//     next: (data) => {
//       this.cars = data;
//       console.log(data); // check if data is coming
//     },
//     error: (err) => console.error(err)
//   });
// }

//   loadData(): void {
//     this.adminService.getAllInquiries().subscribe({
//       next: (data: any[]) => {
//         this.inquiries = data;
//         console.log('Admin Panel Data Loaded:', this.inquiries);
//       },
//       error: (err) => {
//         console.error('Admin Panel failed to fetch data. Is JSON Server running?', err);
//       }
//     });
//   }

//   onDelete(id: any): void {
//     if(confirm('Delete this inquiry?')) {
//       this.adminService.deleteInquiry(id).subscribe(() => {
//         this.loadData(); // REFRESH THE LIST AFTER DELETE
//       });
//     }
//   }

//   fetchData() {
//   // Adding : any[] here fixes the TypeScript error
//   this.adminService.getAllInquiries().subscribe((data: any[]) => {
//     this.inquiries = data;
//   });
// }
// }

import { Component, OnInit ,signal } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sell-carsection',
  imports: [AdminNavbar, CommonModule],
  templateUrl: './admin-sell-carsection.html',
  styleUrl: './admin-sell-carsection.css',
})
export class AdminSellCarsection implements OnInit {
  inquiries = signal<any[]>([]);

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadInquiries(); // Change this from loadCars
  }

  loadInquiries(): void {
    // 1. Call getAllInquiries() instead of getCars()
    this.adminService.getAllInquiries().subscribe({
      next: (data) => {
        this.inquiries.set(data); 
      },
      error: (err) => console.error('Error:', err)
    });
  }

  // 2. Use the correct delete method
  onDelete(id: any): void {
    if (confirm('Delete this inquiry?')) {
      this.adminService.deleteInquiry(id).subscribe(() => {
        this.loadInquiries();
      });
    }
  }
}