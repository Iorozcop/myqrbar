import { Component, Input, OnInit} from '@angular/core';
import { BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {Plugins} from '@capacitor/core';
import { StorageService } from 'src/app/services/storage.service';
import { Bar } from 'src/app/interfaces/bar';
import { AlertController, ModalController } from '@ionic/angular';
import { MisBaresPage } from '../mis-bares/mis-bares.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  public miBrowser = Plugins.Browser;
  barKey = 'misBares';
  datoscaneado: string;
  bares: Bar[] = [];
  botonVer: boolean= false;
  botonMostrar :boolean= false;
  verLogo: boolean=true;

  @Input() nombre:string='';
  
  constructor( public barcodeScanner: BarcodeScanner, 
    public iab: InAppBrowser, 
    public storage: StorageService,
    public modalController:ModalController,
    public alertController: AlertController) { 
  }

  ngOnInit() {
    //llamada al método para cargar los bares del storage
    this.cargarBares();
  }

  //método para hacer visible el botón mostrar
  mostrar(){
    this.botonMostrar = true;
    this.botonVer= false;
    this.verLogo = false;
  }

  //lee el codigo qr 
  LeerCodigo(){
     this.barcodeScanner.scan().then(barcodeData => {
      this.datoscaneado = barcodeData.text;
       //controladores de visibilidad de los botones
      this.botonVer = true;
      this.botonMostrar = false;
      this.verLogo = false;
    })
    .catch(err => {
      console.log("Error", err);
    });
  }

  //Método para controlar si existe el bar o si el escaneado es nulo.
  //Si todo es correcto llama a crear bar
  guardarBar(url:string){ 

    let existe:boolean = this.bares.some(bar => url === bar.url);

    if(existe){
      this.alert();
    }else if(url===''){
      this.alertNull();
    }else{
      this.crearBar(url);
      this.nombre='';
      this.botonMostrar = true;
    }
  }

 //crea un nuevo bar y lo almacena en el array de bares
  crearBar(miUrl:string):void{

    let barNuevo : Bar = {
      nombre: '¡Nuevo bar!',
      tlf: 999999999,
      url: miUrl,
      descripcion: ''
    }
  
    this.bares.unshift(barNuevo);
    this.guardar();
  }

 //llama al servicio y guarda el array actualizado en el storage
  guardar(){
    this.storage.setBar(this.barKey, this.bares);
  }

  //método para volver al inicio
  salir(){
    this.botonVer = false;
    this.botonMostrar = false;
    this.verLogo = true;
    this.nombre='';
  }

  //alerta de que el bar ya está guardado
  async alert() {
    const alert = await this.alertController.create({
      backdropDismiss:false,
      header: '¡Alerta!',
      message: 'Ya tienes guardado este bar',
      buttons: ['OK']
    });
    await alert.present();
  }

    //alerta de que la url es nula
    async alertNull() {
      const alert = await this.alertController.create({
        backdropDismiss:false,
        header: '¡Alerta!',
        message: 'No se ha escaneado nada',
        buttons: ['OK']
      });
      await alert.present();
    }

  //ver contenido del qr escaneado
  ver(codigo:string){
    if(codigo===''){
      this.alertNull();
    }else{
      this.miBrowser.open({
      url:codigo
      })
    }
  }

  //eliminar bar
  eliminar(bar:Bar){
    const index= this.bares.indexOf(bar);
    this.bares.splice(index,1);
    this.guardar();
  }

  //editar el objeto bar
  async editar(bar: Bar){
    const modal = await this.modalController.create({
      component: MisBaresPage,
      componentProps:{
        dato: bar
      }
    })
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if(data){
      bar = data;
    }
    this.guardar();
  }

  //llama al servicio y carga los bares guardados en storage
 cargarBares(){
  this.storage.getBar(this.barKey).then(respuesta => {
      if (respuesta != null){
        this.bares = respuesta;
      }
    });
  }


}


