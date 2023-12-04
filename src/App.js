import Loader from "./components/loader/Loader";
import Routers from "./routes/Routers";
import { getNewTokenUser } from "./service/user";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "./features/user/userSlice";
import { Toaster } from "sonner";


function App() {
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();

  const getNewAccessTokenUser = async () => {
    setIsLoader(true);
    try {
      const dataUser = JSON.parse(localStorage.getItem("dataEleRose"));
      if (dataUser) {
        const responseNewToken = await getNewTokenUser(dataUser.refressToken);
        if (responseNewToken.status === 200 && responseNewToken.response) {
          const data = responseNewToken.data;
          const dataUser = {
            refressToken: data.refressToken,
            user: data.user,
          };
          localStorage.setItem("dataEleRose", JSON.stringify(dataUser));
          dispatch(setUser(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoader(false);
  };

  useEffect(() => {
    getNewAccessTokenUser();
  }, []);
  return (
    <>
      {isLoader === true ? (
        <Loader />
      ) : (
        <>
          <Toaster richColors position="bottom-right" expand={false} />
          <Routers />
        </>
      )}
    </>
  );
}

export default App;
