import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    senha: '',
  }
  loading=false;
  error=false;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
  }

  async login() {
    this.error=false;
    this.loading=true;
    let user: any;
    try { 
      user = await this.firebaseAuth.signInWithEmailAndPassword(this.user.email,this.user.senha)
      if (user.user.email) {      
        console.log("autenticado");
        this.router.navigate(['sintomas-saude']);
      }
      else {
        console.log("error");
      }    
    }
    catch(e){
      console.error(e);
      this.error=true;
    }   
    this.loading = false; 
  }

  async registrar() {
    this.error=false;
    this.loading=true;
    let user: any;
    try {
      user = await this.firebaseAuth.createUserWithEmailAndPassword(this.user.email,this.user.senha);    
      if (user.user.email) {
        console.log("registrado com sucesso");
        this.router.navigate(['sintomas-saude']);
      }
      else {
        console.log("erro no registro");
      }
    }
    catch(e){
      console.error(e);           
      this.error = true;
    }
    this.loading = false;
  }

}
