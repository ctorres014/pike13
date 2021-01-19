import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { PeopleService } from 'src/app/service/people.service';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit{
  peoples: any;

  constructor(private peopleService: PeopleService,
              private loginService: LoginService,
              private uiService: UiServiceService) {}

  ngAfterViewInit() {
    this.uiService.presentLoading();
    this.peopleService.getPeople().then( people => {
      console.log('personas', people);
      this.peoples = people;
    });
  }

  exit() {
    this.loginService.logOut();
  }

}
