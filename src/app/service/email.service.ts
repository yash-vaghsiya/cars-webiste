import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // 1. Define your credentials at the top
  private SERVICE_ID = 'service_7qeopaa';
  private TEMPLATE_ID = 'template_e8gycjm';
  private PUBLIC_KEY = 'Sezw4P6c9R27mMGkt';

  constructor() {
    // 2. Initialize EmailJS only once
    emailjs.init(this.PUBLIC_KEY);
  }

  // 3. One single, clean method to send the notification
  async sendNotification(customerEmail: string, status: string, carModel: string) {
    const templateParams = {
      to_email: customerEmail,
      status: status,
      car_model: carModel,
      message: status === 'Approved' 
        ? 'Great news! Your booking has been approved. See you at the showroom.' 
        : 'Unfortunately, your booking request was declined.'
    };

    try {
      const response = await emailjs.send(
        this.SERVICE_ID, 
        this.TEMPLATE_ID, 
        templateParams, 
        this.PUBLIC_KEY
      );
      console.log('Email sent successfully!', response);
      return response;
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }
}