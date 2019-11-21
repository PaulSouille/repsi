
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { timer, of } from 'rxjs';
import  * as _  from 'lodash';
import { mergeMap} from 'rxjs/operators';
(window as any).global = window;

@Injectable()
export class AuthService {

  userProfile: any;
  refreshSubscription: any;

  auth0 = new auth0.WebAuth({
    clientID: environment.auth_client_id,
    domain: environment.auth_domain,
    responseType: 'token id_token',
    redirectUri: environment.callback_url,
    scope: 'openid profile'
  });

  constructor(public router: Router) {}

  public login(): void {
    console.log('test1')
    this.auth0.authorize();
    console.log('test2');
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return Date.now() < expiresAt;
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      } else {
        alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = of(expiresAt).pipe((expiresAt:any) => {

      const now = Date.now();

      // Use the delay in a timer to
      // run the refresh at the proper time
      console.log(expiresAt)

      return timer(Math.max(1, expiresAt - now));

    })
    

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      // this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

}