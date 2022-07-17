import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../interfaces/user.interface';
import { users } from '../../mocks/users';

@Component({
  selector: 'way-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModalComponent implements OnInit {
  user: User | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    const userList = users;
    this.user = userList.find((user) => user.id === this.data.id);
  }
}
