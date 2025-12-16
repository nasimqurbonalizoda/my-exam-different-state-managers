import { useContext } from "react";
import { ThemeContext } from "../theme/themecolor";

const themeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const style = {
    background: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "50px",
    textAlign: "center",
  };

  return (
    <div style={style}>
      <h2> Ekran:{theme}</h2>
      <button onClick={toggleTheme}>ivazkunak</button>
    </div>
  );
};

export default themeSwitcher;
