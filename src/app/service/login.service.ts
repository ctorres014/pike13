import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = '';

  constructor(private http: HttpClient, private storage: Storage,
              private navCtrl: NavController) { }

  login() {
    const data = {};
    return new Promise(resolve => {
      this.http.post(`${environment.urlToken}`, data).subscribe( (resp: any)  => {
        this.saveToken(resp.access_token);
        resolve(true);
      }, (err => {
        this.storage.clear();
        resolve(false);
      })
      );
    });
  }

  async saveToken(token: string) {
   await this.storage.set('token', token);
  }

  async getStorage(key: string): Promise<any> {
    this.token = await this.storage.get(key);
  }

  logOut() {
    this.storage.clear();
    this.navCtrl.navigateRoot('login', { animated: true });
  }
}
