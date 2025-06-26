import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { UserProps } from "../types/user";

export function IsAuthenticated(){
  const { user } = useContext(AuthContext) as UserProps;
  return user.name !== '';
};