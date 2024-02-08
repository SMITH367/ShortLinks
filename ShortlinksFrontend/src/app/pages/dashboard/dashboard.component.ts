import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { UrlManagerService } from '../../services/urlManager/url-manager.service';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { RestService } from '../../services/rest-service/rest-service.service';
import { ViewStatsComponent } from '../../components/view-stats/view-stats.component';
import { EditSlugComponent } from '../../components/edit-slug/edit-slug.component';
import { DeleteSlugComponent } from '../../components/delete-slug/delete-slug.component';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterLink, NgFor, NgIf, ViewStatsComponent, EditSlugComponent, DeleteSlugComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {

  shortedUrls: Array<any> = [];
  url_key:string = '';
  updateUrlForm:any

  constructor(
    private urlManager: UrlManagerService,
    public userManager: UserManagerService,
    private restService:RestService
  ) {}


  ngOnInit(): void {
    this.getUrlsByUser(
      this.userManager.getUserData().email,
      this.userManager.getUserLogged()
    );
  }

  getUrlsByUser(user: string, token: string): any {
    this.restService
      .postData({ user_id: user }, 'url/findbyuser', token)
      .subscribe(
        (response: any) => {
          this.shortedUrls = response;
          console.log(response)
        },
        (error: any) => {
          console.error('Response POST Error:', error);
          alert(error.error.error);
        }
      );
  }

  async copyUrl(item: any) {
    try {
      await navigator.clipboard.writeText(item.default_short_url);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  }

  viewStats(element: any) {
    this.urlManager
      .getStatsByUrl(element.url_key, this.userManager.getUserLogged())
      .subscribe(
        (response) => {
          const modal = $('#statsModal');
          modal.find('.modal-title').text(`Click stats for ${element.url_key}`);
          modal.find('.modal-body').text(`Your URL has been clicked in ${response.length} times`);
          modal.modal('show')
        },
        (error: any) => {
          console.error('Response POST Error:', error);
        }
      );
  }

  editUrlSlug(element:any) {
    this.url_key = element.url_key;
    const modal = $('#editSlugModal');
    modal.find('.input-edit-slug').val(`${element.destination_url}`)
    modal.modal('show');
  }

  deleteShortedUrl(element:any) {
    this.url_key = element.url_key;
    const modal = $('#deleteSlugModal');
    modal.modal('show');
  }
}
