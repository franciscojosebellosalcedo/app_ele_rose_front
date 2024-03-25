import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../helpers/helpers";
import "./Clients.css";
import ItemClient from "../itemClient/ItemClient";
import { setClientsFound } from "../../../../features/client/clientSlice";

const Clients = () => {
  const clients = useSelector((state) => state.client.data.list);
  const clientsFound = useSelector((state) => state.client.data.found);
  const dispatch=useDispatch();

  const handlerSearchClient=(value)=>{
    const dataFilter=clients.filter((client)=>client.name.trim().toLowerCase().includes(value));
    dispatch(setClientsFound(dataFilter));
  }

  return (
    <section className="container">
      <h1 className="container_title">Clientes</h1>
      <br />
      <form className="form_search">
        <input onInput={(e)=>handlerSearchClient(e.currentTarget.value)} type="search" className="input_search" placeholder="Buscar cliente" />
      </form>
      <table className="table_clients">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {
            clientsFound && clientsFound.length > 0 ?
              <>
                {
                  clientsFound.map((client, index) => {
                    return <ItemClient client={client} key={index}/>
                  })
                }
              </>
              : 
              clients && clients.length > 0 ?
              <>
                {
                  clients.map((client, index) => {
                    return <ItemClient client={client} key={index}/>
                  })
                }
              </>:""
          }

        </tbody>
      </table>
    </section>
  )
}

export default Clients;