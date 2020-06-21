import { Component, OnInit } from '@angular/core';
import { ListaSintomas } from '../models/lista-sintomas.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SaudeService } from '../services/saude.service';

@Component({
  selector: 'app-sintomas-saude',
  templateUrl: './sintomas-saude.page.html',
  styleUrls: ['./sintomas-saude.page.scss'],
})
export class SintomasSaudePage implements OnInit {

  sintomas: ListaSintomas[];
  constructor(private toast: ToastController, private router: Router, private saudeService: SaudeService) { }

  async ionViewDidEnter() {
    this.sintomas = await this.saudeService.getAll();    
  }

  ngOnInit() {
  }

  addSintoma() {
    this.router.navigate(['/editar-sintomas']);
  }

  editarSintoma(sintomaKey: ListaSintomas) {    
    this.router.navigate(['/editar-sintomas', { key: sintomaKey }]);
  }

  async removerSintoma(sintomaKey: ListaSintomas) {
    await this.saudeService.delete(sintomaKey.key);
    let indice = this.sintomas.indexOf(sintomaKey);
    this.sintomas.splice(indice, 1);
    let response = await this.toast.create({
      message: "Sintoma deletado com sucesso",
      duration: 5000,
      position: "bottom",
    });
    response.present();
  }
}
