import NavBar from "../../../components/navBar/NavBar";
import "./Layaut.css";
import { Outlet} from "react-router-dom";


const Layaut = () => {
  return (
    <section className='layaut'>
      <NavBar/>
      <Outlet/>
    </section>
  )
}

export default Layaut;