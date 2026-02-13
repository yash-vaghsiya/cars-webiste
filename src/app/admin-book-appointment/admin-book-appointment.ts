import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../service/admin-service';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-bookings',
  standalone: true,
  imports: [CommonModule, AdminNavbar, FormsModule],
  templateUrl:'./admin-book-appointment.html',
  styleUrl:'./admin-book-appointment.css',
})
export class userbooking implements OnInit {
  appointments = signal<any[]>([]);

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAppointments();
    console.log("oninit called");
  }

  loadAppointments() {
    this.adminService.getAppointments().subscribe({
      next: (res) => {
        console.log(res);
        
        this.appointments.set(res);
      },
      error: (err) => console.error("Error loading appointments:", err)
    });
  }

  approveAppointment(apt: any) {
    const updatedApt = { ...apt, status: 'Approved' };
    this.adminService.updateAppointment(apt.id, updatedApt).subscribe(() => {
      this.loadAppointments();
    });
  }

  rejectAppointment(apt: any) {
    const updatedApt = { ...apt, status: 'Rejected' };
    this.adminService.updateAppointment(apt.id, updatedApt).subscribe(() => {
      this.loadAppointments();
    });
  }

  deleteAppointment(id: any) {
    if (confirm('Permanently delete this booking request?')) {
      this.adminService.deleteAppointment(id).subscribe(() => {
        this.loadAppointments();
      });
    }
  }
  // 1. Add this variable at the top of your class
searchQuery: string = '';

// 2. Add a getter to handle the filtering
get filteredAppointments() {
  const query = this.searchQuery.toLowerCase().trim();
  if (!query) {
    return this.appointments();
  }
  return this.appointments().filter(apt => 
    apt.name.toLowerCase().includes(query) || 
    apt.phone.includes(query)
  );
}
}