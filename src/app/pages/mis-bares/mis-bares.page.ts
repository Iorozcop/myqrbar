import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Bar } from '../../interfaces/bar';
import {Plugins} from '@capacitor/core';
const {Share} = Plugins;

@Component({
  selector: 'app-mis-bares',
  templateUrl: './mis-bares.page.html',
  styleUrls: ['./mis-bares.page.scss'],
})
export class MisBaresPage implements OnInit {

  constructor(
    private modalControler: ModalController) { 

    }
  
  @Input()dato: Bar;
  public miBrowser = Plugins.Browser;

  ngOnInit() {
  }

//método para volver a la anterior pantalla sin guardar cambios
  cancelar(){
    this.modalControler.dismiss();
  }

  //método para volver a la anterior pantalla conservando los cambios
  modificar(){
    this.modalControler.dismiss(this.dato);
  }

//método para mostrar el contenido de la url
  verContenido(miurl:string){
    this.miBrowser.open({
      url:miurl
    })
  }

  //método para compartir con rrss, email, mensaje, etc
  async compartir(bar:Bar){
   await Share.share({
     title: bar.nombre,
     text: 'ver carta',
     url:bar.url
   });
  }

}
