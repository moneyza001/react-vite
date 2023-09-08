import React, { useState, useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }
  // }, [isLoading]);

  // const handleAuth = () => {
  //   if (!isAuth) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsAuth(true);
  //       setIsLoading(false);
  //     }, 1500);
  //   } else {
  //     setIsAuth(false);
  //   }
  // };
  const handleAuth = async () => {
    // Login to Logout
    if (isAuth) {
      setIsAuth(false);
      return;
    }

    // logout to Login
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(response.data);
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const shareObj = { handleAuth, isAuth, isLoading, user };
  return (
    <AuthContext.Provider value={shareObj}>{children}</AuthContext.Provider>
  );
};

function App() {
  const { handleAuth, isAuth, isLoading, user } = useContext(AuthContext);
  return (
    <div className="App">
      {isLoading ? (
        <h1>Loding...</h1>
      ) : (
        <h1>Welcome... {!isAuth ? "Guest" : user?.name}</h1>
      )}
      <button onClick={handleAuth} disabled={isLoading}>
        {isAuth ? "Login" : "Logout"}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
