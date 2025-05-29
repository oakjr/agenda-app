import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
    email: string;
    senha: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API = 'http://localhost:5232/api/usuario';
    private readonly TOKEN_KEY = 'agenda_token';

    constructor(private http: HttpClient, private router: Router) { }

    login(request: LoginRequest): Observable<any> {
        return this.http.post<{ token: string }>(`${this.API}/login`, request).pipe(
            tap(response => {
                localStorage.setItem(this.TOKEN_KEY, response.token);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}
