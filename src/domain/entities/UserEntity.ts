export interface User {
  id: string;
  name: string;
}

export class UserEntity {
  constructor(public user: User) {}
}
