import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { setOpenMenu } from "../../features/sectionActive/sectionActiveSlice";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/constants";

const NavBar = () => {
  const openMenu = useSelector((state) => state.sectionActive.data.openMenu);
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user.data.user);

  const handlerOpenMenu = () => {
    dispatch(setOpenMenu());
  }

  return (
    <section className="container_nav">
      <article className="section_header">
        <i onClick={() => handlerOpenMenu()} className="uil uil-subject icon_bar_menu"></i>
        <img className="logo" src={require("../../assest/logo-page-ele-rose.png")} alt="imagen_menu" />
      </article>
      <nav className={`nav ${openMenu && 'open_menu'}`}>
        <i onClick={() => handlerOpenMenu()} className="uil uil-times icon_close_menu"></i>

        <div className="box_flex_menu">
          <img className="logo logo_menu_white" src={require("../../assest/logo-page-ele-rose-white.png")} alt="imagen_menu" />
          <h2 className="text_user">!Hola {user?.name} 😊¡</h2>
          <NavLink onClick={()=>handlerOpenMenu()} to={ROUTES.CATEGORIES} className={({isActive})=>isActive ===true? "item_active":""}><i className="uil uil-apps icon_menu_item"></i> Categorias</NavLink>
          <NavLink onClick={()=>handlerOpenMenu()} to={ROUTES.PRODUCTS} className={(data)=>data.isActive ? "item_active":""}><i className="uil uil-box icon_menu_item"></i> Productos</NavLink>
          <NavLink onClick={()=>handlerOpenMenu()} to={ROUTES.PRODUCTS_NEWS} className={(data)=>data.isActive ? "item_active":""}><i className="uil uil-create-dashboard icon_menu_item"></i> Productos nuevos</NavLink>
          <NavLink onClick={()=>handlerOpenMenu()} to={ROUTES.USERS} className={(data)=>data.isActive ? "item_active":""}><i className="uil uil-users-alt icon_menu_item"></i> Usuarios</NavLink>
          <button className="btn btn_logout"><i className="uil uil-signout icon_logout"></i> Cerrar sesión</button>
        </div>
      </nav>
    </section>
  )
}

export default NavBar;