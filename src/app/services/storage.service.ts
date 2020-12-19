import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Bar } from '../interfaces/bar';
import { Storage } from '@ionic/Storage';


@Injectable({
  providedIn: 'root'
})

export class StorageService {
 
  constructor(private storage: Storage  ) { }

  getBar(barKey: string): Promise<Bar[]>{
    return this.storage.get(barKey);
  }

  setBar(key:string, value:Bar[]) {
    this.storage.set(key, value);
  }

}

