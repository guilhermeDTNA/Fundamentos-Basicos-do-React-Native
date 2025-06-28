export interface UserData{
  name: string;
  email?: string;
  photo?: string;
  lastName?: string;
}

export interface UserProps{
  user: UserData;
  updateUser: (userData: UserData) => void;
  isAuthenticated: boolean;
  authenticate: (value: boolean) => void;
}