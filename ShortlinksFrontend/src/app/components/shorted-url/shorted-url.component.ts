import { Component, Input } from '@angular/core';
import { UrlData } from '../../models/urlData.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shorted-url',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './shorted-url.component.html',
  styleUrl: './shorted-url.component.css'
})
export class ShortedURLComponent {

  @Input() urlData:UrlData = {
    urlShorted:'',
    originalUrl:'',
    urlKey:''
  };

  copied:Boolean = false;
  shorted:string = ''


  async copyUrl (){
    try {

      this.shorted = this.urlData.urlShorted;
      await navigator.clipboard.writeText(this.shorted);
      this.copied = true;

    } catch (err) {
      console.error('Error al copiar: ', err);
    }

  }

}
