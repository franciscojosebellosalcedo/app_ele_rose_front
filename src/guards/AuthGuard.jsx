import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import { ROUTES } from '../constants/constants';

const AuthGuard = () => {
    const data=localStorage.getItem("dataEleRose");
  return data ? <Outlet/>:<Navigate replace to={ROUTES.LOGIN}/> ;
}

export default AuthGuard;