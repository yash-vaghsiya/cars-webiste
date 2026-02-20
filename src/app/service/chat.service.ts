import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type Role = 'user' | 'bot';
export interface ChatMessage { role: Role; text: string; }

@Injectable({ providedIn: 'root' })
export class ChatService {

  // You can replace this with your API cars data later
  private cars = [
    { name: 'BMW M4', type: 'sports', budget: 9000000, mileage: 10, fuel: 'petrol' },
    { name: 'Audi Q7', type: 'suv', budget: 9500000, mileage: 11, fuel: 'petrol' },
    { name: 'Tata Nexon EV', type: 'electric', budget: 1800000, mileage: 0, fuel: 'ev' },
    { name: 'Hyundai Creta', type: 'suv', budget: 2000000, mileage: 17, fuel: 'petrol' },
    { name: 'Maruti Swift', type: 'hatchback', budget: 900000, mileage: 22, fuel: 'petrol' }
  ];

  ask(userText: string): Observable<string> {
    const t = userText.toLowerCase();

    // greeting
    if (/(hi|hello|hey)/.test(t)) {
      return of("Hello 👋 Tell me your budget (example: 10 lakh) and which type you want (SUV, sedan, electric).")
        .pipe(delay(400));
    }

    // budget extraction (simple)
    const budget = this.extractBudget(t); // in INR
    const wantsSUV = t.includes('suv');
    const wantsEV = t.includes('electric') || t.includes('ev');
    const wantsSports = t.includes('sports');

    // EMI
    if (t.includes('emi')) {
      const amt = budget || 1000000;
      const emi = this.calcEmi(amt, 10, 60); // 10% for 60 months
      return of(`Example EMI estimate:\nCar price: ₹${this.format(amt)}\nLoan: 5 years • 10% interest\nApprox EMI: ₹${this.format(Math.round(emi))}/month\n\nTell me: down payment + tenure + interest, I’ll calculate accurately.`)
        .pipe(delay(500));
    }

    // suggestion
    if (t.includes('suggest') || t.includes('recommend') || wantsSUV || wantsEV || wantsSports || budget) {
      const filtered = this.cars
        .filter(c => !budget || c.budget <= budget)
        .filter(c => !wantsSUV || c.type === 'suv')
        .filter(c => !wantsEV || c.type === 'electric')
        .filter(c => !wantsSports || c.type === 'sports');

      if (filtered.length === 0) {
        return of("I couldn’t find a match in my demo list 😕\nTell me your budget + type (SUV / sedan / electric) and I’ll suggest options.")
          .pipe(delay(450));
      }

      const top = filtered.slice(0, 3)
        .map(c => `• ${c.name} — ${c.type.toUpperCase()} — ₹${this.format(c.budget)}`)
        .join('\n');

      return of(`Here are my suggestions:\n${top}\n\nWant more? Tell me:\n1) Budget\n2) Fuel: petrol/diesel/EV\n3) Use: city/highway\n4) Seats: 5/7`)
        .pipe(delay(500));
    }

    // car details (name match)
    const found = this.cars.find(c => t.includes(c.name.toLowerCase().split(' ')[0]));
    if (found) {
      return of(`Details (demo):\n• ${found.name}\n• Type: ${found.type}\n• Price: ₹${this.format(found.budget)}\n• Mileage: ${found.fuel === 'ev' ? 'EV' : found.mileage + ' km/l'}\n\nAsk: EMI / variants / best alternative`)
        .pipe(delay(450));
    }

    // fallback
    return of(
      "I can help with:\n• Car suggestions (budget + type)\n• EMI calculation\n• Basic car details\n\nTry: “Suggest SUV under 15 lakh” or “EMI for 12 lakh car”"
    ).pipe(delay(450));
  }

  private extractBudget(text: string): number | null {
    // supports: "10 lakh", "15 lakhs", "2000000", "20lakh"
    const lakhMatch = text.match(/(\d+(\.\d+)?)\s*la(kh|khs)?/);
    if (lakhMatch) return Math.round(parseFloat(lakhMatch[1]) * 100000);

    const crMatch = text.match(/(\d+(\.\d+)?)\s*cr|crore/);
    if (crMatch) return Math.round(parseFloat(crMatch[1]) * 10000000);

    const num = text.match(/₹?\s*(\d{6,9})/);
    if (num) return parseInt(num[1], 10);

    return null;
  }

  private calcEmi(principal: number, annualRate: number, months: number): number {
    const r = (annualRate / 12) / 100;
    return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }

  private format(n: number): string {
    return new Intl.NumberFormat('en-IN').format(n);
  }
}
