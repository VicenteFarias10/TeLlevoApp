// welcome.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  username: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Recupera el nombre de usuario desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { username: string };
    if (state) {
      this.username = state.username;
    }
  }
}
