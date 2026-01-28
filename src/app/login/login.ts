import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Import this

@Component({
  selector: 'app-root',
  standalone: true,           // Ensure this is set to true
  imports: [CommonModule],    // 2. Add it here
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  currentView: string = 'login';

  switchView(view: string) {
    this.currentView = view;
  }

  onSubmit() {
    console.log('Action performed for: ' + this.currentView);
  }
}