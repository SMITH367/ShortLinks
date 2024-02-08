import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { NgIf } from '@angular/common';
import { urlValidator } from '../../services/validations/urlValidator';
import { UrlManagerService } from '../../services/urlManager/url-manager.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-createshly',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './createshly.component.html',
  styleUrl: './createshly.component.css'
})

export class CreateshlyComponent {

  createShForm: FormGroup;

  urlCreated: boolean = false;


  constructor(
    private fb: FormBuilder,
    private urlManager: UrlManagerService,
    private userManager: UserManagerService,
  ) {
    this.createShForm = this.fb.group({
      urlToShort: ['', [Validators.required, urlValidator()]],
      personalizedSlug: ['', [Validators.required]],
    });
  }

  createNewShly() {


    let newUrlData = {
      url: this.createShForm.get('urlToShort')?.value,
      personalized_slug: this.createShForm.get('personalizedSlug')?.value,
      user_id: this.userManager.getUserData().email

    }

    this.urlManager.createShortedURL(newUrlData, this.userManager.getUserLogged()).subscribe((response: any) => {

      this.urlCreated = true;

      this.createShForm.setValue({
        urlToShort: '',
        personalizedSlug: ''
      })

      setTimeout(() => {
        this.urlCreated = false;
      }, 3000)

    },
      (error: any) => {
        console.error('Response POST Error:', error);
        alert(error.error.error)
      })


  }

}
