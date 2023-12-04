import NavBar from "../../../components/navBar/NavBar";
import "./Layaut.css";
import { Outlet} from "react-router-dom";
import { Toaster } from "sonner";


const Layaut = () => {
  return (
    <section className='layaut'>
      <Toaster richColors position="bottom-left" expand={false} />
      <NavBar/>
      <Outlet/>
    </section>
  )
}

export default Layaut;