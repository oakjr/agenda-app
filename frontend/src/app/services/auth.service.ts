import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly api = 'http://localhost:5261/api/usuario';

    constructor(private http: HttpClient, private router: Router) { }

    login(credenciais: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.api}/login`, credenciais).pipe(
            tap(res => localStorage.setItem('token', res.token))
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
