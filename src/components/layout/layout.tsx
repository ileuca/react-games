import { FC, ReactNode, useContext } from "react";
import { ReactComponent as SunIcon } from "../icons/svg/sun-icon.svg";
import { ReactComponent as MoonIcon } from "../icons/svg/moon-icon.svg";
import { ThemeContext } from "../../contexts/theme-context";
type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme == "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };
  return (
    <div>
      <div className="navbar bg-base-300" style={{ marginBottom: "10px" }}>
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">React Games</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a>TicTacToe</a>
            </li>
            <li>
              <a>BattleShips</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul>
            <li>
              <a
                className="btn btn-square btn-xs btn-ghost"
                onClick={changeTheme}
              >
                {theme == "dark" ? <SunIcon /> : <MoonIcon />}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
