// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CarDetails } from '../car-details/car-details'; // Import correctly

// @Injectable({ providedIn: 'root' })
// export class AdminService {
// private baseUrl = 'http://localhost:3000'; 

//   constructor(private http: HttpClient) {}

//   addCar(car: any): Observable<any> {
//     // Make sure the path '/cars' matches your db.json key
//     return this.http.post(`${this.baseUrl}/cars`, car);
//   }

//   getCars(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/cars`);
//   }
  
//   // Update and Delete must also use the ID
//   updateCar(id: any, car: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/cars/${id}`, car);
//   }

//   deleteCar(id: any): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/cars/${id}`);
//   }


//   // ==========================================================================================================================================
//   // Add these to your existing AdminService class
// // getAppointments(): Observable<any[]> {
// //   return this.http.get<any[]>(`${this.baseUrl}/appointments`);
// // }

// // deleteAppointment(id: any): Observable<any> {
// //   return this.http.delete(`${this.baseUrl}/appointments/${id}`);
// // }

// // addAppointment(data: any): Observable<any> {
// //   return this.http.post(`${this.baseUrl}/appointments`, data);
// // }

// private apiUrl = 'http://localhost:3000'; // Ensure this matches your JSON server

// addAppointment(appointment: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/appointments`, appointment);
//   }

//   getAppointments(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/appointments`);
//   }

//   deleteAppointment(id: any): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/appointments/${id}`);
//   }

//   // Add this to your AdminService class
// updateAppointment(id: any, data: any): Observable<any> {
//   return this.http.put(`${this.apiUrl}/appointments/${id}`, data);
// }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetails } from '../car-details/car-details'; // Import correctly
import { map } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AdminService {
private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  addCar(car: any): Observable<any> {
    // Make sure the path '/cars' matches your db.json key
    return this.http.post(`${this.baseUrl}/cars`, car);
  }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cars`);
  }
  
  // Update and Delete must also use the ID
  updateCar(id: any, car: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cars/${id}`, car);
  }

  deleteCar(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cars/${id}`);
  }
  private carToEdit: any = null; 

  // Now these functions can use 'this.carToEdit' without errors
  setEditData(car: any) {
    this.carToEdit = car;
  }



  clearEditData() {
    this.carToEdit = null;
  }
private apiUrl = 'http://localhost:3000'; 

addAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appointment);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments`);
  }

  deleteAppointment(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/appointments/${id}`);
  }

  // Add this to your AdminService class
updateAppointment(id: any, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/appointments/${id}`, data);
}
getNextId(cars: any[]): number {
  if (!cars || cars.length === 0) {
    return 1;
  }
  
  // Find the maximum ID in the array you just passed in
  const maxId = Math.max(...cars.map(c => Number(c.id)));
  return maxId + 1;
}
  
getEditData() {
    return this.carToEdit;
  }

private apilink = 'http://localhost:3000/inquiries'; 

getAllInquiries(): Observable<any[]> {
  return this.http.get<any[]>(this.apilink);
}
 submitInquiry(data: any): Observable<any> {
    return this.http.post(this.apilink, data);
  }

  // getAllInquiries(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  deleteInquiry(id: any): Observable<any> {
    return this.http.delete(`${this.apilink}/${id}`);
  }
  

  // Add these methods to your existing AdminService class

private messagesUrl = 'http://localhost:3000/messages';

submitMessage(data: any): Observable<any> {
  return this.http.post(this.messagesUrl, data);
}

getMessages(): Observable<any[]> {
  return this.http.get<any[]>(this.messagesUrl);
}

deleteMessage(id: any): Observable<any> {
  return this.http.delete(`${this.messagesUrl}/${id}`);
}
}

