import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { adminDashboardTexts } from '../../../core/mocks/admin-dashboard-textsmock';

interface User {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

interface PhoneNumber {
  id: number;
  details_number: string;
  created_at: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  phoneNumbers: PhoneNumber[] = [];
  loading = true;
  error: string | null = null;
  currentLanguageIndex = 1; // Default to English
  texts = adminDashboardTexts;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Watch for route parameter changes
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      this.languageService.setLanguageFromCode(lang);
      this.fetchData(); // Optional: reload data when language changes
    });

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });
  }

  fetchData(): void {
    this.loading = true;
    this.error = null;

    this.http.get<User[]>('http://172.20.2.203:5000/users/all').subscribe({
      next: (users) => {
        this.users = users;
        this.http
          .get<PhoneNumber[]>('http://172.20.2.203:5000/numbers/all')
          .subscribe({
            next: (numbers) => {
              this.phoneNumbers = numbers;
              this.loading = false;
            },
            error: (err) => {
              this.error = this.texts.errors.loadNumbers[this.currentLanguageIndex];
              this.loading = false;
            },
          });
      },
      error: (err) => {
        this.error = this.texts.errors.loadUsers[this.currentLanguageIndex];
        this.loading = false;
      },
    });
  }
}