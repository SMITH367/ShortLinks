import { Injectable } from '@angular/core';
import { RestService } from '../rest-service/rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class UrlManagerService {
  public response: any;

  constructor(private restService: RestService) {}

  createShortedURL(newUrlData: any, token: string) {
    return this.restService.postData(
      {
        user_id: newUrlData.user_id,
        personalized_slug: newUrlData.personalized_slug,
        url: newUrlData.url,
      },
      'url',
      token
    );
  }

  updateShortedURL(id_url: string, destination_url: string, token: string) {
    return this.restService.putData(
      {
        destination_url: destination_url,
      },
      `url/${id_url}`,
      token
    );
  }

  deleteShortedURL(id_url: string, token: string) {
    return this.restService.deleteData(`url/${id_url}`, token);
  }

  getStatsByUrl(idUrl: string, token: string) {
    return this.restService.getData(idUrl, 'url/stats', token);
  }
}
