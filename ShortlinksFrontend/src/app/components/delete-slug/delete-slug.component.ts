import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { UrlManagerService } from '../../services/urlManager/url-manager.service';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { NgIf } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-delete-slug',
  standalone: true,
  imports: [NgIf],
  templateUrl: './delete-slug.component.html',
  styleUrl: './delete-slug.component.css'
})
export class DeleteSlugComponent {

  @Input() url_key:string = ''

  @Output() reloadUserUrls: EventEmitter<void> = new EventEmitter<void>();

  urlUpdated:boolean = false

  constructor(private urlManager:UrlManagerService, private userManger:UserManagerService){}

  closeModal(){
    $('#deleteSlugModal').modal('hide');
  }

  deleteUrl(event:Event){
    event.preventDefault()

    this.urlManager.deleteShortedURL(this.url_key, this.userManger.getUserLogged()).subscribe(
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
