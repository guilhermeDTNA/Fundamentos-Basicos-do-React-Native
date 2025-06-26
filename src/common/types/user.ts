interface UserData{
  name: string;
}

export interface UserProps{
  user: UserData;
  changeName: (name: string) => void;
}