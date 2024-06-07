import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  userDetails: any = {};
  favorites: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.http.get(`http://localhost:3000/users/${userId}`).subscribe((details: any) => {
        this.userDetails = details;
      });

      this.http.get(`http://localhost:3000/favorites?userId=${userId}`).subscribe((favorites: any) => {
        this.favorites = favorites;
      });
    }
  }
}
