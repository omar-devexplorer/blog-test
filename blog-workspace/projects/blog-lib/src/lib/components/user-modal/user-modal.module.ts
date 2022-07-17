import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { FriendNameModule } from '../../pipes/friend-name/friend-name.module';
import { UserModalComponent } from './user-modal.component';

const modules = [
  CommonModule,
  DragDropModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
];

@NgModule({
  declarations: [UserModalComponent],
  imports: [...modules, FriendNameModule],
  exports: [UserModalComponent],
})
export class UserModalModule {}
