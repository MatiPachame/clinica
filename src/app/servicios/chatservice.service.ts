import { inject, Injectable } from '@angular/core';
import { Firestore, getDocs, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  private firestore;
  constructor() { 
    this.firestore = inject(Firestore);
  }

  public setForo( valor: any){
     addDoc(collection(this.firestore, 'foro'),valor);
  }


}
