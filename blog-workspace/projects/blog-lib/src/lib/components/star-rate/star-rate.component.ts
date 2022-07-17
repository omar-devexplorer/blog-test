import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'way-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
})
export class StarRateComponent implements OnInit {
  stars: any[] = [...new Array(5).keys()];
  rate: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  starHandler(value: number): void {
    const star = 5 - value;
    this.rate = [...new Array(star).keys()];
  }
}
