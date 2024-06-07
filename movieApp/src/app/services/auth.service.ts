import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
    this.checkTokenExpiration();
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }

  private checkTokenExpiration(): void {
    const token = this.getToken();
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.logout();
    }
  }
}
