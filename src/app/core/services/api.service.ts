import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://csms-backend-production.up.railway.app'; // Your Flask server URL

  constructor(private http: HttpClient) {}

  // Health check
  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
  
  // --- NEW ---
  // Authenticate an admin user
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }
  // --- END NEW ---

  // Register a new user
  registerUser(userData: {
    name: string;
    company?: string;
    email?: string;
    phone?: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }

  // Save a phone number
  savePhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/numbers/detail_number`, {
      details_number: phoneNumber
    });
  }
}