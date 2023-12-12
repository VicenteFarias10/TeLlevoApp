import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private router: Router) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.navigateToLogin();
    }, 5000); 
  }

  navigateToLogin() {
    this.router.navigate(['/iniciar-sesion']);
  }
}
