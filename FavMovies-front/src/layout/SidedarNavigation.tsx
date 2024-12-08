import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Logo } from "../components/Logo";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import UserMenu from "../components/UserMenu";
import { ThemeMode } from "../components/ThemeMode";
import { links } from "./MainNavigation";

type SidebarNavigationProps = {
  isScrolled: boolean;
};

const SidebarNavigation = ({ isScrolled }: SidebarNavigationProps) => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const handleStartSigning = () => {
    dispatch(setAuthModalOpen(true));
  };
  const toggleNav = () => {
    setIsChecked(false);
  };

  return (
    <>
      <header>
        <div
          className={
            isScrolled
              ? `header ${themeMode} isScrolled`
              : `header ${themeMode}`
          }
        >
          <NavLink to="/" end className="logo__link">
            <Logo className="logo__header" />
          </NavLink>
          <ThemeMode />
          <div className={`navigation ${themeMode}`}>
            <input
              className="navigation__checkbox"
              type="checkbox"
              id="navi-toggle"
              checked={isChecked}
              onChange={(event) => setIsChecked(event.target.checked)}
            />
            <label htmlFor="navi-toggle" className={`navigation__button`}>
              <span className={`navigation__icon ${themeMode}`}>&nbsp;</span>
            </label>
            <div className={`navigation__background ${themeMode}`}>&nbsp;</div>
            <nav className="navigation__nav">
              <ul className="navigation__list">
                {Object.entries(links).map(([name, path]) => (
                  <li className="navigation__item" key={name}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive
                          ? `navigation__link active ${themeMode}`
                          : `navigation__link ${themeMode}`
                      }
                      end
                      onClick={() => setIsChecked(false)}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}

                {!user && (
                  <li className="navigation__item">
                    <button
                      className={`navigation__link-btn ${themeMode}`}
                      onClick={() => {
                        setIsChecked(false);
                        handleStartSigning();
                      }}
                    >
                      Sign In
                    </button>
                  </li>
                )}
                {user && <UserMenu isPhone={true} toggleNav={toggleNav} />}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
export default SidebarNavigation;
