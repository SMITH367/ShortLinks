import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShortedURLComponent } from '../../components/shorted-url/shorted-url.component';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { urlValidator } from '../../services/validations/urlValidator';
import { RestService } from '../../services/rest-service/rest-service.service';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ShortedURLComponent, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  dataUrl = {
    urlShorted: localStorage.getItem('urlShorted') ?? '',
    originalUrl: localStorage.getItem('originalUrl') ?? '',
    urlKey:''
  };

  shortUrlForm: FormGroup;


  constructor(private fb: FormBuilder,private restService:RestService, public userManager:UserManagerService) {
    this.shortUrlForm = this.fb.group({
      url: ['', [Validators.required, urlValidator()]],
    });
  }


  getShorted(event: Event) {
    event.preventDefault();


    this.restService.postData({url: this.shortUrlForm.get('url')?.value},'url/createshly').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.dataUrl.urlShorted = response.message.default_short_url
        localStorage.setItem('urlShorted', this.dataUrl.urlShorted);

      },
      (error) => {
        console.error('Error en la solicitud POST:', error);
      }
    );

    this.dataUrl.originalUrl = this.shortUrlForm.get('url')?.value;

    localStorage.setItem('originalUrl', this.dataUrl.originalUrl);
  }
}
