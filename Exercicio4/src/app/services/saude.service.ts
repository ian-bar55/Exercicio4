import { Injectable } from '@angular/core';
import { Sintoma } from '../models/sintoma.model';
import { DatePipe } from '@angular/common';
import { ListaSintomas } from '../models/lista-sintomas.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SaudeService {

  constructor(private storage: Storage, private datePipe: DatePipe) { }


  public insert(sintoma: Sintoma) {
    let key = this.datePipe.transform(new Date(), 'ddMMyyyyHHmmss');          
    return this.save(key,sintoma);
  }

  public update(key: string, sintoma: Sintoma) {
    return this.save(key,sintoma);
  }
  
  public save(key:string,sintoma: Sintoma) {
    this.storage.set(key,sintoma);
  }

  public delete(key: string) {
    return this.storage.remove(key);
  }

  public get(key: string) {
    return this.storage.get(key);
  }

  public getAll() {
      let sintomas: ListaSintomas[] = [];
      return this.storage.forEach(
        (value: Sintoma, key: string, interationNumber: Number) => {
           let listaSintoma = new ListaSintomas();
           listaSintoma.key = key;
           listaSintoma.sintoma = value;
           sintomas.push(listaSintoma);
        }).then( () => {
          return Promise.resolve(sintomas);
        }).catch( (error) => {
          return Promise.reject(error);
        })    
  }


}
