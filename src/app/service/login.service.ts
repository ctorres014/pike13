import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = '';

  constructor(private http: HttpClient, private storage: Storage,
              private navCtrl: NavController,
              public alertController: AlertController) { }

  login() {
    const data = {};
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':  '*'
      })
    };
    return new Promise(resolve => {
      this.http.post(`${environment.urlToken}`, data, httpOptions).subscribe( (resp: any)  => {
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

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: `${message}`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
