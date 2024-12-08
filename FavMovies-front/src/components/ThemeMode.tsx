import React from "react";
import { setThemeMode } from "../redux/features/themeModeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import sprite from "../assets/sprite.svg";

export const ThemeMode = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const onSwitchTheme = () => {
    const newTheme = themeMode === "dark" ? "light" : "dark";
    dispatch(setThemeMode(newTheme));
  };
  return (
    <div className="header__themeMode" onClick={onSwitchTheme}>
      <svg
        className={`${
          themeMode === "light" ? "weather-sunny_icon" : "moon_icon"
        }`}
      >
        <use
          xlinkHref={`${sprite}#icon-${
            themeMode === "light" ? "weather-sunny" : "moon"
          }`}
        ></use>
      </svg>
    </div>
  );
};
