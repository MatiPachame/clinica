import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ChatserviceService } from 'src/app/servicios/chatservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  public chats: any[]=[];
  public mensaje: string="";
  public nombre: string="";
  public apellido: string="";

  constructor(private navCtrl: NavController,public srvChat: ChatserviceService) { }

  public enviar(){
    this.srvChat.setForo({nombre:this.nombre, apellido:this.apellido,mensaje:this.mensaje});
    alert("Mensaje enviado");
    this.navCtrl.navigateRoot('menu');
  }

}
