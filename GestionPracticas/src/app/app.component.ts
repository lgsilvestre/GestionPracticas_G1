import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
declare let alertify: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  fullscreenRoute: boolean = false;

	public title: String = "Sistema de Gestión de Prácticas de la Universidad de Talca";

	constructor(private router: Router) {
	}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log(event);
      if (
        event.url === "/login"
      ) {
        this.fullscreenRoute = true;
      } else {
        this.fullscreenRoute = false;
      }
    });
  }
}

