import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Model } from './models';
import { Mapper } from './decorator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(service : DataService) {
    service.get().subscribe((data : Model[]) => {
      data = data.map((entry : Model) => {
        return new Mapper(Model).map(entry);
      });
      console.log(data);
    });
  }
}
