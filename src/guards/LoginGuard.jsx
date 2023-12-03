import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import { ROUTES } from '../constants/constants';

const LoginGuard = () => {
    const data=localStorage.getItem("dataEleRose");
  return data ? <Navigate replace to={`${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`}/>:<Outlet/> ;
}
export default LoginGuard;