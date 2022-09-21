import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingPanel } from './services/loading/loading-panel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(dialog : MatDialog){
    this.loadingPanel = new LoadingPanel(dialog);
  }
  public loadingPanel: LoadingPanel | any;
  title = 'Matuyd Restaurant';

}
