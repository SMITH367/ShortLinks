import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserManagerService } from '../user-manager/user-manager.service';
import { RestService } from '../rest-service/rest-service.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookies: CookieService,
    private restService: RestService,
    private userManager: UserManagerService,
    private router: Router,
  ) {}

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  setLoggedIn() {
    this.cookies.set('login', 'true');
    localStorage.setItem('login', 'true');
  }

  getLoggedIn(): Observable<boolean> {
    return of(Boolean(this.cookies.get('login')));
  }

  login(dataUser: any) {

    this.restService.postData(dataUser, 'login').subscribe(
      (response: any) => {
        this.setToken(response.token);

        this.userManager.setUserData({
          id: response.userData.id,
          name: response.userData.name,
          email: response.userData.email,
        });
        this.setLoggedIn();
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Response POST Error:', error);
        alert(error.error.error);
      }
    );
  }

  logOut() {


    this.restService
      .postData(
        { email: this.userManager.getUserData().email },
        'logout',
        this.userManager.getUserLogged()
      )
      .subscribe(
        (response: any) => {
        },
        (error: any) => {
          console.error('Response POST Error:', error);
          alert(error.error.error);
        }
      );

      localStorage.removeItem('login');
      this.cookies.deleteAll();

  }
}
