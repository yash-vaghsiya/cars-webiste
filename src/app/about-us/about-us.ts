// import { DecimalPipe, CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { animationFrameScheduler, interval, map, takeWhile, tap } from 'rxjs';
// import { Footer } from "../footer/footer";
// @Component({
//   selector: 'app-about-us',
//   standalone: true,
//   imports: [DecimalPipe, CommonModule, Footer], // Import the new ticker here
//   templateUrl: './about-us.html',
//   styleUrl: './about-us.css',
// })
// export class AboutUs implements OnInit{
//   // Final Target Values
//   clientsTarget = 5000;
//   awardsTarget = 25;
//   carsTarget = 10000;
//   brandsTarget = 25;

//   // Display Variables
//   clients = 0;
//   awards = 0;
//   cars = 0;
//   brands = 0;

//   ngOnInit(): void {
//     // We wrap these in a small timeout to ensure the view is ready
//     setTimeout(() => {
//       this.runTicker('clients', this.clientsTarget);
//       this.runTicker('awards', this.awardsTarget);
//       this.runTicker('cars', this.carsTarget);
//       this.runTicker('brands', this.brandsTarget);
//     }, 100);
//   }

//   private runTicker(prop: 'clients' | 'awards' | 'cars' | 'brands', endValue: number) {
//     const duration = 3000; 
//     const startTime = animationFrameScheduler.now();

//     interval(0, animationFrameScheduler)
//       .pipe(
//         map(() => {
//           const secondsElapsed = animationFrameScheduler.now() - startTime;
//           const progress = Math.min(secondsElapsed / duration, 1);
          
//           // easeOutExpo easing function
//           const factor = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
//           return Math.floor(factor * endValue);
//         }),
//         // Ensure it stops exactly at the endValue
//         takeWhile((val) => val <= endValue, true)
//       )
//       .subscribe({
//         next: (val) => {
//           this[prop] = val;
//         },
//         error: (err) => console.error('Ticker error:', err)
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-about-counter',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUs implements OnInit {

  clientsTarget = 5000;
  awardsTarget = 25;
  carsTarget = 10000;
  brandsTarget = 25;

  clients:any ='';
  awards :any = '';
  cars :any = '';
  brands :any = '';

  ngOnInit(): void {
    this.startCounters();
  }

  private startCounters() {
    this.animateValue('clients', this.clientsTarget, 2000);
    this.animateValue('awards', this.awardsTarget, 2000);
    this.animateValue('cars', this.carsTarget, 2000);
    this.animateValue('brands', this.brandsTarget, 2000);
  }

  private animateValue(
    prop: 'clients' | 'awards' | 'cars' | 'brands',
    endValue: number,
    duration: number
  ) {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOut
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this[prop] = Math.floor(easeOut * endValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this[prop] = endValue;
      }
    };

    requestAnimationFrame(animate);
  }
}
