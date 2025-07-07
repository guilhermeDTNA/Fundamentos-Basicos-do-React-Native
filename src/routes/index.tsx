import React, { useContext } from "react";
import { UserProps } from '../common/types/user';
import { AuthContext } from '../contexts/auth';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default function Routes(){
  const { isAuthenticated } = useContext(AuthContext) as UserProps;

  if(isAuthenticated){
    return <PrivateRoutes />;
  }

  return <PublicRoutes />;
}