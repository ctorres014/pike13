import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/service/people.service';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {
  private peopleId: number;
  peoples: any;

  constructor(private peopleService: PeopleService,
              private uiService: UiServiceService,
              private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
          console.log('queryparams', params.peopleId);
          this.peopleId = params.peopleId;
        });
              }

  ngAfterViewInit() {
    this.uiService.presentLoading();
    this.peopleService.getPeopleById(this.peopleId).then( people => {
      console.log('persona', people[0]);
      console.log('persona profile_photo', people[0].profile_photo.x200);
      this.peoples = people;
    });
  }

}
