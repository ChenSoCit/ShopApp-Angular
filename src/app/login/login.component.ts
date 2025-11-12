import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  errorMessage = signal('');
  isLoading = signal(false);

  onSubmit(): void {
    this.errorMessage.set('');
    
    if (!this.email() || !this.password()) {
      this.errorMessage.set('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    this.isLoading.set(true);

    // Giả lập API call
    setTimeout(() => {
      const result = this.authService.login(this.email(), this.password());
      
      if (result.success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set(result.message || 'Đăng nhập thất bại');
      }
      
      this.isLoading.set(false);
    }, 1000);
  }

  updateEmail(value: string): void {
    this.email.set(value);
  }

  updatePassword(value: string): void {
    this.password.set(value);
  }
}
