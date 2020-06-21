import { Component, OnInit } from '@angular/core';
import { Sintoma } from '../models/sintoma.model';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SaudeService } from '../services/saude.service';

@Component({
  selector: 'app-editar-sintomas',
  templateUrl: './editar-sintomas.page.html',
  styleUrls: ['./editar-sintomas.page.scss'],
})
export class EditarSintomasPage implements OnInit {

  titulo: string;
  model: Sintoma;
  key: string;
  constructor(private toast: ToastController, private activatedRoute: ActivatedRoute, private saudeService: SaudeService, private router: Router) { }

  async ngOnInit() {
    this.model = new Sintoma();
    this.activatedRoute.params.subscribe( (data) => {
    
      if ( Object.keys(data).length >= 1) {
        this.saudeService.get(data.key).then( data_object => {
        this.model.descricao = data_object.descricao;
        this.model.intensidade = data_object.intensidade;
        this.model.data = data_object.data;
        this.key = data.key;
        });
      }
    });    
  }
  
  ionViewDidLeave() {
    delete this.model; 
  }

  async save() {
    await this.saveSintoma();
    let response = await this.toast.create({
      message: "Sintoma Salvo com Sucesso",
      duration: 5000,
      position: "bottom",
    })
    response.present();
    this.router.navigate(['/sintomas-saude']);
  }

  async saveSintoma() {
    if (this.key) {
      return await this.saudeService.update(this.key,this.model);
    } else {
      return await this.saudeService.insert(this.model);
    }
  }

}
