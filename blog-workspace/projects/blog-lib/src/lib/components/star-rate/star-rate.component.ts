import { Component } from '@angular/core';

@Component({
  selector: 'way-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
})
export class StarRateComponent {
  stars: any[] = [...new Array(5).keys()];
  rate: any[] = [];

  constructor() {}

  starHandler(value: number): void {
    this.rate = [...new Array(value).keys()];
  }
}
