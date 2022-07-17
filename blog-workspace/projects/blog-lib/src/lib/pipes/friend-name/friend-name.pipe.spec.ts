import { FriendNamePipe } from './friend-name.pipe';

describe('FriendNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FriendNamePipe();
    expect(pipe).toBeTruthy();
  });
});
