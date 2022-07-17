import { Pipe, PipeTransform } from '@angular/core';

import { users } from '../../mocks/users';

@Pipe({
  name: 'friendName',
})
export class FriendNamePipe implements PipeTransform {
  transform(id: number): unknown {
    const userList = users;
    const user = userList.find((user) => user.id === id);
    return user?.username;
  }
}
