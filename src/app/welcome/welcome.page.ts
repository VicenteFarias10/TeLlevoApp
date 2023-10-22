// welcome.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  username: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Recupera el nombre de usuario de localStorage.
    this.username = localStorage.getItem('username') as string;
  }
  
}
