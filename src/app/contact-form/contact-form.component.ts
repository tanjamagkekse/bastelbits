import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IMessage } from './message';
import { MessageService } from './message.service';

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
  
  constructor(private formBuilder: FormBuilder, 
              private messageService: MessageService,
              private router: Router) { }


  sendMessage() {
    //validation? TODO
    // this.messageService.submitForm(this.messageData).subscribe({
    //   next: () => this.router.navigate(['/message-thanks'])
    // });
  }

}
