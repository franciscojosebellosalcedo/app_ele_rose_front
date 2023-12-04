import "./Login.css";
import {toast} from "sonner";
import { ROUTES } from "../../constants/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../service/user";
import {  useDispatch} from "react-redux";
import {setUser  } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch=useDispatch();
  const [credencials,setCredencials]=useState({email:"",password:""});
  const navigate=useNavigate();

  const handlerFormLogin=(target,value)=>{
    setCredencials({...credencials,[target]:value});
  }

  const login=async (e)=>{
    e.preventDefault();
    try{
      if(credencials.email==="" || credencials.password===""){
        toast.warning("Llene todos los campos por favor")
      }else{
        const responseLogin=await loginUser(credencials);
        if(responseLogin.status===200 && responseLogin.response){
          const dataResponse=responseLogin.data;
          dispatch(setUser(dataResponse));
          setCredencials({email:"",password:""});
          navigate(`${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`);
        }else{
          toast.error(responseLogin.message);
        }
      }
    }catch(error){
      toast.error("Se produjo un error")
    }
  }
  
  return (
    <section className="layaut layaut_login">
      <form className="form form_access">
        <img className="image_form" src={require("../../assest/logo-page-ele-rose.png")} alt="" />
        <p className="form_text">Indique sus datos para iniciar sesión 😊</p>
        <section className="section_form">
          {/* <label className="label_form label_form_access" htmlFor="email">Correo:</label> */}
          <div className="box_section">
            <input className="input_form input_form_access" id="email" onInput={(e)=>handlerFormLogin("email",e.target.value)}  value={credencials.email}  type="email" placeholder="Ingrese su correo electrónico" />
          </div>
        </section>
        <section className="section_form">
          {/* <label className="label_form label_form_access" htmlFor="password">Contraseña:</label> */}
          <div className="box_section">
            <input className="input_form input_form_access" id="password" onInput={(e)=>handlerFormLogin("password",e.target.value)} value={credencials.password}  type="password" placeholder="Ingrese su contraseña" />
            {/* <i className="uil uil-eye icon_eye_input_password"></i> */}
          </div>
        </section>
        <button onClick={(e)=>login(e)} className="btn_excute btn">Iniciar sesión</button>
        <Link className="text_forgot_password" to={"#"}>¿ Olvidaste tu contraseña ?</Link>
      </form>
    </section>
  )
}

export default Login;