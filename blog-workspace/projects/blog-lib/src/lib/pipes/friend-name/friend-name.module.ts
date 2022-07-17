import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendNamePipe } from './friend-name.pipe';

@NgModule({
  declarations: [FriendNamePipe],
  imports: [CommonModule],
  exports: [FriendNamePipe],
})
export class FriendNameModule {}
