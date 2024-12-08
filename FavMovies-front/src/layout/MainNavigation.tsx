import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Logo } from "../components/Logo";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import UserMenu from "../components/UserMenu";
import { ThemeMode } from "../components/ThemeMode";

type MainNavigationProps = {
  isScrolled: boolean;
};
export const links = {
  Home: "/",
  Search: "/search",
};

const MainNavigation = ({ isScrolled }: MainNavigationProps) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const handleStartSigning = () => {
    dispatch(setAuthModalOpen(true));
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
          <Logo className="logo__header" />
          {Object.entries(links).map(([name, path]) => (
            <div className="header__navigation" key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? `header__link active ${themeMode}`
                    : `header__link ${themeMode}`
                }
                end
              >
                {name}
              </NavLink>
            </div>
          ))}

          <ThemeMode />
          {!user && (
            <div className="signin">
              <button className="button" onClick={handleStartSigning}>
                Sign In
              </button>
            </div>
          )}
          {user && <UserMenu isPhone={false} />}
        </div>
      </header>
    </>
  );
};
export default MainNavigation;
