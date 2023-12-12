import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage{
  public alertButtons = ['OK'];
  email: string = '';
  
  constructor(private router: Router) {}

  back() {

    
    setTimeout(() => {
      
     
      this.router.navigate(['/iniciar-sesion'] );

    }, 1400);
  }

}
