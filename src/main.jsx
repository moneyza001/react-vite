import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//Context
// Create Context
// 1. createContext [Provider,Consumer] => ชื่อ Context

const ThemeContext = createContext();
// 2. สร้าง HOC : Higher Order Component (Provider)
// HOC is FN who get Component and return new Component
// function ThemeContextProvider(props) {
//   return <ThemeContext.Provider>{props.children}</ThemeContext.Provider>;
// }

function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const styleObj = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  const styleBtObj = {
    backgroundColor: isDarkMode ? "white" : "black",
    color: isDarkMode ? "black" : "white",
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const shareObj = {
    theme: styleObj,
    btTheme: styleBtObj,
    toggleTheme: handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={shareObj}>
      {props.children}
    </ThemeContext.Provider>
  );
}

//UI : Component
function App() {
  const { theme, btTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="App" style={theme}>
      <h1>Theme App</h1>
      <button style={btTheme} onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
