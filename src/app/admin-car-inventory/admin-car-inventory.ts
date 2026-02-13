import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { Router, RouterModule } from '@angular/router'; // Import Router
@Component({
  selector: 'app-admin-car-inventory',
  imports: [CommonModule, FormsModule, AdminNavbar , RouterModule], // Add Router to imports
  templateUrl: './admin-car-inventory.html',
  styleUrl: './admin-car-inventory.css',
})
export class AdminCarInventory {
cars = signal<any[]>([]);
  isUnlocked: boolean = true;
  passwordInput: string = '';
constructor(private adminService: AdminService, private router: Router) {} // Inject Router
  // constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadCars();
    console.log("oninit: " + this.cars().length);
    // // We only load cars if it's already unlocked, 
    // // otherwise load them inside unlockInventory()
    // if (this.isUnlocked) {
    //   this.loadCars(); 
    // }
  }

  loadCars() {
    this.adminService.getCars().subscribe({
      next: 
      (res) => {
        this.cars.set(res);
        console.log("Loaded: " + this.cars().length);
        console.log("Loaded cars:", this.cars());
      },
      error: (err) => console.error("Could not load inventory:", err)
    });
  }

  unlockInventory() {
    if (this.passwordInput === "admin123") {
      this.isUnlocked = true;
      this.loadCars();
    } else {
      alert('Incorrect Password! Access Denied.');
      this.passwordInput = '';
    }
  }

  lockInventory() {
    this.isUnlocked = false;
    this.passwordInput = '';
  }

  toggleSoldOut(car: any) {
    const updatedCar = { 
      ...car, 
      status: car.status === 'Sold Out' ? 'Available' : 'Sold Out' 
    };
    this.adminService.updateCar(car.id, updatedCar).subscribe(() => {
      this.loadCars();
    });
  }

  deleteCar(id: any) {
    if (confirm('Are you sure you want to remove this vehicle from the showroom?')) {
      this.adminService.deleteCar(id).subscribe(() => {
        this.cars.set(this.cars().filter(c => c.id !== id));
      });
    }
  }

  // editCar(car: any) {
  //   // Typically you would navigate to the Register page 
  //   // or emit an event to the parent component
  //   console.log("Editing car:", car);
  //   alert("Functionality: Pass this data back to the Register Form component.");
  // }

  editCar(car: any) {
    // 1. Store the car data in the service
    this.adminService.setEditData(car);
    
    // 2. Redirect to the add-vehicle page
    this.router.navigate(['/admin-add-vehicle']); 
  }
}
