import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IMessage } from './message';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent{
  ContactForm!: FormGroup;
  messageData: IMessage = {name: '', email: '', message: ''}
  
  constructor() { }


  sendMessage() {
    //validation? TODO
    // this.messageService.submitForm(this.messageData).subscribe({
    //   next: () => this.router.navigate(['/message-thanks'])
    // });
  }

}
