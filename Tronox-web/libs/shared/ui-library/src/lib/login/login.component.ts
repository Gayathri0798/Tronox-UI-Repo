import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@tronox-web/util-library';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-login',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response.message);
        localStorage.setItem('token', response.token);
        localStorage.setItem('tronox_username', this.username);
        this.router.navigate(['/tile']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  onInput(field: string, event: any) {
    if (field == 'username') {
      this.username = event.target.value;
    } else {
      this.password = event.target.value;
    }
  }
}
