import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);

  // Demo user credentials
  private readonly DEMO_USER = {
    email: 'admin@example.com',
    password: 'admin123',
    user: {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin User'
    }
  };

  constructor() {
    // Kiểm tra xem có user đã đăng nhập trước đó không (chỉ chạy trên browser)
    if (this.isBrowser) {
      this.checkStoredAuth();
    }
  }

  login(email: string, password: string): LoginResult {
    // Kiểm tra thông tin đăng nhập với demo user
    if (email === this.DEMO_USER.email && password === this.DEMO_USER.password) {
      this.currentUser.set(this.DEMO_USER.user);
      this.isAuthenticated.set(true);
      
      // Lưu thông tin vào localStorage (chỉ trên browser)
      if (this.isBrowser) {
        localStorage.setItem('user', JSON.stringify(this.DEMO_USER.user));
        localStorage.setItem('isAuthenticated', 'true');
      }

      return {
        success: true,
        user: this.DEMO_USER.user
      };
    }

    return {
      success: false,
      message: 'Email hoặc mật khẩu không đúng'
    };
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    
    // Xóa thông tin khỏi localStorage (chỉ trên browser)
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  private checkStoredAuth(): void {
    // Chỉ kiểm tra localStorage khi đang chạy trên browser
    if (!this.isBrowser) {
      return;
    }

    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');

    if (storedUser && storedAuth === 'true') {
      this.currentUser.set(JSON.parse(storedUser));
      this.isAuthenticated.set(true);
    }
  }
}
