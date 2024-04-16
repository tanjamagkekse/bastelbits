import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from './message';

@Injectable({
    providedIn: 'root'
  })

export class MessageService{
    private api = 'http://mailthis.to/alias'
    messageData: IMessage = {name: '', email: '', message: ''}

    constructor(private http: HttpClient){}

    // submitForm() {
    //     const formData = {
    //       email: this.messageData.email,
    //       // Andere Formularfelder hier hinzufügen
    //     };
    
    //     // Hier HTTP-Anfrage an deinen Backend-Service senden, der die E-Mail sendet
    //     //this.http.post('URL_DEINES_BACKEND_SERVICES', formData).subscribe(response => {
    //       // Erfolgsnachricht anzeigen oder andere Aktionen ausführen
    //     //});
    //   }
}