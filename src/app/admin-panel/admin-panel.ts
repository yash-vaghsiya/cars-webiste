import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../service/admin-service';
import { CommonModule } from '@angular/common';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
// import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ,FormsModule, AdminNavbar],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanel implements OnInit {
  carForm!: FormGroup;
  cars: any[] = [];
  isEditing: boolean = false;
  currentCarId: any = null;
  originalCarData: any = null; // To keep a backup of the car being edited

  constructor(private fb: FormBuilder, private adminService: AdminService) {}
ngOnInit() {
  this.initForm();
  // Call this immediately so data loads as soon as the page opens
  this.loadCars(); 

  // ==========================================================

   this.initForm();
  this.loadCars();
  this.loadAppointments();
}

// loadCars() {
//   console.log("Fetching all cars automatically...");
//   this.adminService.getCars().subscribe({
//     next: (res) => {
//       // Direct assignment ensures the view updates immediately
//       this.cars = res; 
//       console.log("Cars loaded:", this.cars.length);
//     },
//     error: (err) => {
//       console.error("Could not load cars on startup:", err);
//     }
//   });
// }

  initForm() {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      power: ['', Validators.required],
      speed: ['', Validators.required],
      engine: ['', Validators.required],
      torque: ['', Validators.required],
      fuel: ['', Validators.required],
      transmission: ['', Validators.required],
      groundClearance: ['', Validators.required],
      bootSpace: ['', Validators.required],
      km: ['', Validators.required],
      year: ['', Validators.required],
      mileage: ['', Validators.required],
      drivetrain: ['', Validators.required],
      seats: ['', Validators.required],
      color: ['', Validators.required],
      owners: ['', Validators.required],
      warranty: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required]
    });
  }

  // loadCars() {
  //   this.adminService.getCars().subscribe(res => {
  //     this.cars = res;
  //   });
  // }

  // FIXED: Fill form and store the original object
  editCar(car: any) {
    this.isEditing = true;
    this.currentCarId = car.id;
    this.originalCarData = car; // Save the full original object
    this.carForm.patchValue(car); // Only updates the fields that exist in the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

// Inside AdminPanel class in admin-panel.ts

onSubmit() {
  console.log("ONSUBMIT BUTTON");
  
  if (this.carForm.invalid) {
    alert('Please fill all required fields.');
    return;
  }

  // Get values from form
  const formData = this.carForm.value;

  if (this.isEditing && this.currentCarId) {
    // We are UPDATING an existing car
    // Merge original data (to keep ID/Status) with new form data
    const updatedCar = { 
      ...this.originalCarData, 
      ...formData 
    };

    console.log("Updating car with ID:", this.currentCarId);

    this.adminService.updateCar(this.currentCarId, updatedCar).subscribe({
      next: () => {
        alert('Car updated successfully!');
        this.resetForm(); // Goes back to "Add" mode
        this.loadCars();  // Refresh the list immediately
      },
      error: (err) => {
        console.error("Update failed:", err);
        alert("Could not update car details.");
      }
    });
  } else {
    // We are ADDING a new car
    const newCar = { ...formData, status: 'Available' };
    
    this.adminService.addCar(newCar).subscribe({
      next: () => {
        alert('Car added successfully!');
        this.carForm.reset();
        this.loadCars();
      },
      error: (err) => console.error("Add failed:", err)
    });
  }
}

  deleteCar(id: any) {
    if (confirm('Delete this car?')) {
      this.adminService.deleteCar(id).subscribe(() => {
        this.cars = this.cars.filter(c => c.id !== id);
      });
    }
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

  resetForm() {
    this.isEditing = false;
    this.currentCarId = null;
    this.originalCarData = null;
    this.carForm.reset({ drivetrain: 'Select', category: 'Select', fuel: 'Petrol', transmission: 'Automatic' });
  }

  // Add this to your variables at the top of the class
isUnlocked: boolean = false;
passwordInput: string = '';
// adminPassword: string = 'admin123'; // Set your desired password here

// Function to verify password
unlockInventory() {
  if (this.passwordInput === "admin123") {
    this.isUnlocked = true;
    this.loadCars(); // Load data only after successful login
  } else {
    alert('Incorrect Password! Access Denied.');
    this.passwordInput = '';
  }
}

// Update your reset logic to lock it again if needed (optional)
lockInventory() {
  this.isUnlocked = false;
  this.passwordInput = '';
}



// Inside admin-panel.ts

onAddCar() {
  if (this.carForm.valid) {
    // Clean the data: ensure we aren't sending weird Angular internal objects
    const carData = JSON.parse(JSON.stringify(this.carForm.value));
    const newCar = { ...carData, status: 'Available' };

    this.adminService.addCar(newCar).subscribe({
      next: (response) => {
        console.log("Success! Saved to JSON:", response);
        alert('Car added to JSON database successfully!');
        this.carForm.reset();
        this.loadCars(); // This refreshes the list from the JSON file
      },
      error: (err) => {
        console.error("API Error:", err);
        alert("Failed to save to JSON server. Is the server running?");
      }
    });
  } else {
    alert("Form is invalid. Check all fields.");
  }
}
// =========================================================================================================================================

// 1. Add this to your variables
appointments: any[] = [];

// 2. Update ngOnInit


// 3. Add these methods
// loadAppointments() {
//   this.adminService.getAppointments().subscribe({
//     next: (res) => {
//       this.appointments = res; // Updates the view immediately
//     },
//     error: (err) => console.error("Could not load appointments:", err)
//   });
// }

// // deleteAppointment(id: any) {
// //   if(confirm('Remove this request?')) {
// //     this.adminService.deleteAppointment(id).subscribe(() => this.loadAppointments());
// //   }
// // }


  // approveAppointment(apt: any) {
  //   const updatedApt = { ...apt, status: 'Approved' };
  //   this.adminService.updateAppointment(apt.id, updatedApt).subscribe(() => {
  //     this.loadAppointments(); // Refresh the list
  //     this.emailService.sendAppointmentStatus(apt.email, apt.name, 'Approved', apt.date);
  //   });
  // }

  // 2. Reject an appointment
  // rejectAppointment(apt: any) {
  //   const updatedApt = { ...apt, status: 'Rejected' };
  //   this.adminService.updateAppointment(apt.id, updatedApt).subscribe(() => {
  //     this.loadAppointments(); // Refresh the list
  //     this.emailService.sendAppointmentStatus(apt.email, apt.name, 'Rejected', apt.date);
  //   });
  // }

// // 3. Delete an appointment
// deleteAppointment(id: any) {
//   if (confirm('Are you sure you want to permanently delete this request?')) {
//     this.adminService.deleteAppointment(id).subscribe(() => {
//       this.loadAppointments(); // Refresh the list
//     });
//   }
// }
loadCars() {
    this.adminService.getCars().subscribe({
      next: (res) => { this.cars = res; },
      error: (err) => console.error("Cars error:", err)
    });
  }

  loadAppointments() {
    this.adminService.getAppointments().subscribe({
      next: (res) => { 
        this.appointments = res; 
        console.log("Appointments loaded immediately:", this.appointments.length);
      },
      error: (err) => console.error("Appointments error:", err)
    });
  }

  // Logic for the Approve/Reject/Delete buttons
  updateAptStatus(apt: any, newStatus: string) {
    const updatedApt = { ...apt, status: newStatus };
    this.adminService.updateAppointment(apt.id, updatedApt).subscribe(() => {
      this.loadAppointments(); // Refresh immediately after change
    });
  }

  deleteAppointment(id: any) {
    if (confirm('Delete this request?')) {
      this.adminService.deleteAppointment(id).subscribe(() => {
        this.loadAppointments(); // Refresh immediately after delete
      });
    }
  }
}