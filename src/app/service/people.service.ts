import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // private url = 'https://bizit.pike13.com/api/v2/desk/people';
  private token: string;

  constructor(private http: HttpClient,
              private loginService: LoginService) {

  }

  async getPeople(): Promise<any> {
    await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${ this.loginService.token }`
      })
    };
    return new Promise( resolve => {
      this.http.get(`${environment.api}`, httpOptions )
              .subscribe( (resp: any) => {
        resolve(resp.people);
      }, (err) => {
        this.loginService.logOut();
      });
    });

  }

  async getPeopleById(peopleId: number){
    await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${ this.loginService.token }`
      })
    };
    return new Promise( resolve => {
      this.http.get(`${ environment.api }/${ peopleId }`, httpOptions )
              .subscribe( (resp: any) => {
        resolve(resp.people);
      }, (err) => {
        this.loginService.logOut();
      });
    });
  }

  private async getToken() {
    await this.loginService.getStorage('token');
  }

  

}
