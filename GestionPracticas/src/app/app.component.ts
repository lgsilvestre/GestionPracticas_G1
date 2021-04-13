import { Component } from '@angular/core';
declare let alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){}

  success()
  {
    alertify.success("Todo bien, todo correcto");
  }

}
