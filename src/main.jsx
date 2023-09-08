import React, { useState, useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }
  // }, [isLoading]);

  const handleAuth = () => {
    if (!isAuth) {
      setIsLoading(true);
      setTimeout(() => {
        setIsAuth(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsAuth(false);
    }
  };

  const shareObj = { handleAuth, isAuth, isLoading };
  return (
    <AuthContext.Provider value={shareObj}>{children}</AuthContext.Provider>
  );
};

function App() {
  const { handleAuth, isAuth, isLoading } = useContext(AuthContext);
  return (
    <div className="App">
      {isLoading ? (
        <h1>Loding...</h1>
      ) : (
        <h1>Welcome... {isAuth ? "Guest" : "User"}</h1>
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
