import "./Slider.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";

const Slider = () => {
  const user = useSelector((state) => state.user.data.user);
  const navigate=useNavigate();

  return (
    <section className="container">
      <h1 className="container_title">Slider</h1>
      <button className="btn btn_new_category" onClick={()=>navigate(ROUTES.ADD_ELEMENT_SLIDER)}>Agregar elemento</button>
      <p className="text_slider_container">{user?.name} Aquí podrás asociar maximo tres productos al slider de tu pagina web 😚</p>
      <h3 className="subtitle_slider">Elementos agregados</h3>
    </section>
  )
}

export default Slider;