import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginRequest: LoginRequest = { email: '', senha: '' };
    erroLogin: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    realizarLogin(): void {
        this.authService.login(this.loginRequest).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: () => this.erroLogin = 'Email ou senha inválidos.'
        });
    }
}
