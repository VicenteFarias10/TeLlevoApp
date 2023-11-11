import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome-cond',
  templateUrl: './welcome-cond.page.html',
  styleUrls: ['./welcome-cond.page.scss'],
})
export class WelcomeCondPage implements OnInit {
  username: string = '';
  role: string ='';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Recupera el nombre de usuario de localStorage.
    this.username = localStorage.getItem('username') as string;
    this.role = localStorage.getItem('role') as string;
    
  }
  
  
}
