import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private _SearchService: SearchService) {}

  onSearchBarClick() {
    this._SearchService.showSearchSteps.next(true);
  }
}
