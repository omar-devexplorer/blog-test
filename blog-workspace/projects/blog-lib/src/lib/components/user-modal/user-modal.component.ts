import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'way-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: User) {}
}
