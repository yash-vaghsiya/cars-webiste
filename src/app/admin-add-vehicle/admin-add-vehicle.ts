import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../service/admin-service';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-vehicle',
  imports: [ReactiveFormsModule, CommonModule, AdminNavbar,RouterModule], // Add RouterModule to imports
  templateUrl: './admin-add-vehicle.html',
  styleUrl: './admin-add-vehicle.css',
})
export class AdminAddVehicle {
carForm!: FormGroup;
  isEditing = false;
  currentCarId: any = null;
  originalCarData: any = null;

  constructor(private fb: FormBuilder, private adminService: AdminService , private router: Router) {}

  ngOnInit() {
    this.initForm();
        // this.initForm();
    this.checkForEditData();
  }

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

  onSubmit() {
  if (this.carForm.invalid) {
    alert('Please fill all required fields.');
    return;
  }

  const formData = this.carForm.value;

  if (this.isEditing && this.currentCarId) {
    // EDIT LOGIC (ID stays the same)
    const updatedCar = { ...this.originalCarData, ...formData };
    this.adminService.updateCar(this.currentCarId, updatedCar).subscribe({
      next: () => {
        alert('Vehicle updated successfully!');
        this.router.navigate(['/admin-car-inventory']);
      }
    });
  } else {
    // ADD LOGIC (Sequential ID)
    // 1. Fetch current cars to find the last ID
    this.adminService.getCars().subscribe({
      next: (cars) => {
        const nextId = this.adminService.getNextId(cars);
        
        // 2. Create the new car object with the sequential ID
        const newCar = { 
          ...formData, 
          id: nextId.toString(), // Convert to string if your DB expects strings
          status: 'Available' 
        };

        // 3. Save the new car
        this.adminService.addCar(newCar).subscribe({
          next: () => {
            alert(`Vehicle added! Assigned ID: ${nextId}`);
            this.carForm.reset();
            this.router.navigate(['/admin-car-inventory']);
          },
          error: (err) => alert("Addition failed: " + err)
        });
      }
    });
  }
}

  resetForm() {
    this.isEditing = false;
    this.currentCarId = null;
    this.originalCarData = null;
    this.carForm.reset();
  }


  checkForEditData() {
    const editData = this.adminService.getEditData();
    if (editData) {
      this.isEditing = true;
      this.currentCarId = editData.id;
      this.originalCarData = editData;

      // Patch the form values to match the car data
      this.carForm.patchValue({
        name: editData.name,
        category: editData.category,
        price: editData.price,
        image: editData.image,
        power: editData.power,
        speed: editData.speed,
        engine: editData.engine,
        torque: editData.torque,
        fuel: editData.fuel,
        transmission: editData.transmission,
        groundClearance: editData.groundClearance,
        bootSpace: editData.bootSpace,
        km: editData.km,
        year: editData.year,
        mileage: editData.mileage,
        drivetrain: editData.drivetrain,
        seats: editData.seats,
        color: editData.color,
        owners: editData.owners,
        warranty: editData.warranty,
        description: editData.description,
        features: editData.features
      });
    }
  }
}
