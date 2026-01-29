import { DecimalPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { animationFrameScheduler, interval, map, takeWhile, tap } from 'rxjs';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [DecimalPipe,CommonModule ], // Import the new ticker here
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs implements OnInit{
  // Final Target Values
  clientsTarget = 5000;
  awardsTarget = 25;
  carsTarget = 10000;
  brandsTarget = 25;

  // Display Variables
  clients = 0;
  awards = 0;
  cars = 0;
  brands = 0;

  ngOnInit(): void {
    // We wrap these in a small timeout to ensure the view is ready
    setTimeout(() => {
      this.runTicker('clients', this.clientsTarget);
      this.runTicker('awards', this.awardsTarget);
      this.runTicker('cars', this.carsTarget);
      this.runTicker('brands', this.brandsTarget);
    }, 100);
  }

  private runTicker(prop: 'clients' | 'awards' | 'cars' | 'brands', endValue: number) {
    const duration = 3000; 
    const startTime = animationFrameScheduler.now();

    interval(0, animationFrameScheduler)
      .pipe(
        map(() => {
          const secondsElapsed = animationFrameScheduler.now() - startTime;
          const progress = Math.min(secondsElapsed / duration, 1);
          
          // easeOutExpo easing function
          const factor = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          return Math.floor(factor * endValue);
        }),
        // Ensure it stops exactly at the endValue
        takeWhile((val) => val <= endValue, true)
      )
      .subscribe({
        next: (val) => {
          this[prop] = val;
        },
        error: (err) => console.error('Ticker error:', err)
      });
  }
}