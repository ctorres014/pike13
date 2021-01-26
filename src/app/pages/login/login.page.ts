import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrimary', { static: true }) slide: IonSlides;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];
  avatarSlide = {
    slidesPerView: 3.5
  };


  constructor(private loginService: LoginService,
              private uiService: UiServiceService,
              private navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.slide.lockSwipes(true);
  }

  register(fRegister: NgForm) {
    console.log('register', fRegister.valid);
  }

  async login(fLogin: NgForm) {
    const isValid = await this.loginService.login();
    if(isValid) {
      this.navCtrl.navigateRoot('main', { animated: true });
    } else {
      this.uiService.alertInfo('Error al iniciar sesion');
    }
  }

  selectAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

  displayLogin() {
    this.slide.lockSwipes(false);
    this.slide.slideTo(0);
    this.slide.lockSwipes(true);
  }
  displayRegister(){
    this.slide.lockSwipes(false);
    this.slide.slideTo(1);
    this.slide.lockSwipes(true);
  }

  
}
