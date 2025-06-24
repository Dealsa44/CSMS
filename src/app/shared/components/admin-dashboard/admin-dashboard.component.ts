import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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

  // Confirmation dialog variables
  showConfirmation = false;
  confirmationTitle = '';
  confirmationMessage = '';
  pendingAction: () => void = () => {};
  pendingItemId: number | null = null;
  pendingItemType: 'user' | 'number' | 'all-users' | 'all-numbers' | null =
    null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const lang = params['lang'];
      this.languageService.setLanguageFromCode(lang);
      this.fetchData();
    });

    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });
  }

  fetchData(): void {
    this.loading = true;
    this.error = null;

    this.http
      .get<User[]>('https://csms-backend-production.up.railway.app/users/all')
      .subscribe({
        next: (users) => {
          this.users = users;
          this.http
            .get<PhoneNumber[]>(
              'https://csms-backend-production.up.railway.app/numbers/all'
            )
            .subscribe({
              next: (numbers) => {
                this.phoneNumbers = numbers;
                this.loading = false;
              },
              error: (err) => {
                this.error =
                  this.texts.errors.loadNumbers[this.currentLanguageIndex];
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

  confirmDelete(id: number, type: 'user' | 'number'): void {
    this.pendingItemId = id;
    this.pendingItemType = type;

    if (type === 'user') {
      this.confirmationTitle =
        this.texts.confirmation.deleteUserTitle[this.currentLanguageIndex];
      this.confirmationMessage =
        this.texts.confirmation.deleteUserMessage[this.currentLanguageIndex];
    } else {
      this.confirmationTitle =
        this.texts.confirmation.deleteNumberTitle[this.currentLanguageIndex];
      this.confirmationMessage =
        this.texts.confirmation.deleteNumberMessage[this.currentLanguageIndex];
    }

    this.pendingAction = () => this.deleteItem(id, type);
    this.showConfirmation = true;
  }

  confirmClearAll(type: 'users' | 'numbers'): void {
    this.pendingItemType = type === 'users' ? 'all-users' : 'all-numbers';

    if (type === 'users') {
      this.confirmationTitle =
        this.texts.confirmation.clearAllUsersTitle[this.currentLanguageIndex];
      this.confirmationMessage =
        this.texts.confirmation.clearAllUsersMessage[this.currentLanguageIndex];
    } else {
      this.confirmationTitle =
        this.texts.confirmation.clearAllNumbersTitle[this.currentLanguageIndex];
      this.confirmationMessage =
        this.texts.confirmation.clearAllNumbersMessage[
          this.currentLanguageIndex
        ];
    }

    this.pendingAction = () => this.clearAll(type);
    this.showConfirmation = true;
  }

  cancelConfirmation(): void {
    this.showConfirmation = false;
    this.pendingAction = () => {};
    this.pendingItemId = null;
    this.pendingItemType = null;
  }

  executeConfirmedAction(): void {
    this.showConfirmation = false;
    this.pendingAction();
  }

  deleteItem(id: number, type: 'user' | 'number'): void {
    const endpoint = type === 'user' ? 'users' : 'numbers';

    this.http
      .delete(
        `https://csms-backend-production.up.railway.app/${endpoint}/delete/${id}`
      )
      .subscribe({
        next: () => {
          if (type === 'user') {
            this.users = this.users.filter((user) => user.id !== id);
          } else {
            this.phoneNumbers = this.phoneNumbers.filter(
              (num) => num.id !== id
            );
          }
        },
        error: (err) => {
          this.error =
            type === 'user'
              ? this.texts.errors.deleteUser[this.currentLanguageIndex]
              : this.texts.errors.deleteNumber[this.currentLanguageIndex];
        },
      });
  }

  clearAll(type: 'users' | 'numbers'): void {
    const endpoint =
      type === 'users' ? 'users/delete_all' : 'numbers/delete_all';

    this.http
      .delete(`https://csms-backend-production.up.railway.app/${endpoint}`)
      .subscribe({
        next: () => {
          if (type === 'users') {
            this.users = [];
          } else {
            this.phoneNumbers = [];
          }
        },
        error: (err) => {
          this.error =
            type === 'users'
              ? this.texts.errors.clearAllUsers[this.currentLanguageIndex]
              : this.texts.errors.clearAllNumbers[this.currentLanguageIndex];
        },
      });
  }
  // Add this to the component class
  logout(): void {
    // Clear local storage (optional, AuthService will handle this)
    localStorage.removeItem('csms_auth_token');

    // Get current language from route
    const lang = this.route.snapshot.params['lang'];

    // Navigate to home page in current language
    this.router.navigate([`/${lang}`]);
  }
}
