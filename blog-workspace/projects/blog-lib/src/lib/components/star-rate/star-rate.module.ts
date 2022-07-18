import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarRateComponent } from './star-rate.component';

@NgModule({
  declarations: [StarRateComponent],
  imports: [CommonModule],
  exports: [StarRateComponent],
})
export class StarRateModule {}
