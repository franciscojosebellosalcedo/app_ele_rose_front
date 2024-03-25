import { useDispatch, useSelector } from "react-redux";
import "./Users.css";
import ItemUser from "../itemUser/ItemUser";
import { setUserListFound } from "../../../../features/user/userListSlice";

const Users = () => {
  const users=useSelector((state)=>state.userList.data.list);
  const usersFound=useSelector((state)=>state.userList.data.found);
  const dispatch=useDispatch();


  const handlerSearchUser=(value)=>{
    const dataFilter=users.filter((client)=>client.name.trim().toLowerCase().includes(value));
    dispatch(setUserListFound(dataFilter));
  }

  return (
    <section className="container">
      <h1 className="container_title">Usuarios</h1>
      <br />
      <form className="form_search">
        <input onInput={(e)=>handlerSearchUser(e.currentTarget.value)}  type="search" className="input_search" placeholder="Buscar usuario" />
      </form>
      <table className="table_users">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {
            usersFound && usersFound.length > 0 ?
              <>
                {
                  usersFound.map((user, index) => {
                    return <ItemUser user={user} key={index}/>
                  })
                }
              </>
              : 
              users && users.length > 0 ?
              <>
                {
                  users.map((user, index) => {
                    return <ItemUser user={user} key={index}/>
                  })
                }
              </>:""
          }

        </tbody>
      </table>
    </section>
  )
}

export default Users;