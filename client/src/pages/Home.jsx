import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    let isMounted = true;
    const cancelTokenSource = axios.CancelToken.source();

    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.post(
            "http://localhost:5000",
            {},
            {
              withCredentials: true,
              cancelToken: cancelTokenSource.token,
            }
          );
    
          if (isMounted) {
            const { status, user } = data;
            setUsername(user);
    
            if (status) {
              toast(`Hello ${user}`, {
                position: "top-right",
              });
            } else {
              removeCookie("token");
              navigate("/login");
            }
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            // Request was canceled due to component unmounting
          } else if (error.response && error.response.status === 401) {
            // Token is not valid or present (logged out)
            removeCookie("token");
            navigate("/login");
          } else {
            // Handle other errors
            console.error("Error verifying cookie:", error);
          }
        }
      }
    };
    


    verifyCookie();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
      cancelTokenSource.cancel("Component unmounted");
    };
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
