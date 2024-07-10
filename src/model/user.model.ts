export interface UserModel {
  id?: number;
  name?: string;
  email?: string;
  role?: 'INTERN' | 'ADMIN' | 'ENGINEER';
}
