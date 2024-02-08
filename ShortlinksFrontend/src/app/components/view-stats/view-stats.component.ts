import { Component } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-view-stats',
  standalone: true,
  imports: [],
  templateUrl: './view-stats.component.html',
  styleUrl: './view-stats.component.css'
})
export class ViewStatsComponent {

  closeModal(){
    console.log("closing")
    $('#statsModal').modal('hide');
  }
}
