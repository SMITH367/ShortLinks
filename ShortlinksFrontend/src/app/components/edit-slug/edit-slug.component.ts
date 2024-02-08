import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { UrlManagerService } from '../../services/urlManager/url-manager.service';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { Validators } from '@angular/forms';
import { urlValidator } from '../../services/validations/urlValidator';
import { FormBuilder,  ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';

declare var $:any
@Component({
  selector: 'app-edit-slug',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-slug.component.html',
  styleUrl: './edit-slug.component.css'
})
export class EditSlugComponent {

  updateUrlForm:FormGroup

  urlUpdated:boolean = false

  @Output() reloadUserUrls: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private urlManager: UrlManagerService,
    private userManager: UserManagerService,
  ) {
    this.updateUrlForm = this.fb.group({
      urlToUpdate: ['', [Validators.required, urlValidator()]],
    });
  }
  @Input() url_key!:string


  closeModal(){
    $('#editSlugModal').modal('hide');
  }

  editUrl(event:Event){
    event.preventDefault()

    let destination_url = this.updateUrlForm.get('urlToUpdate')?.value

    this.urlManager.updateShortedURL(this.url_key, destination_url, this.userManager.getUserLogged()).subscribe(
      (response)=>{

        this.urlUpdated = true;

        this.reloadUserUrls.emit()

        setTimeout(() => {
          this.urlUpdated = false;
          this.closeModal()
        }, 2000)

      },
      (error:any)=>{
        console.error(error)
      }
    )

  }
}
