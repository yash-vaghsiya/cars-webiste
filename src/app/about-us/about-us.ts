import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-about-us',
  imports: [DecimalPipe],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
clients = 0;
  awards = 0;
  cars = 0;
  brands = 0;

  ngOnInit(): void {
    // 4000ms = 4 seconds. This is a "stately" speed for luxury brands.
    this.animateCount('clients', 5000, 4000);
    this.animateCount('awards', 25, 4000);
    this.animateCount('cars', 10000, 4000);
    this.animateCount('brands', 25, 4000);
  }

  animateCount(prop: 'clients' | 'awards' | 'cars' | 'brands', target: number, duration: number) {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing Function: easeOutQuart
      // This makes the animation "glide" to a stop so the customer can read it easily
      const easeOut = 1 - Math.pow(1 - progress, 4);

      this[prop] = Math.floor(easeOut * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
}

