import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setListFavorites, setUser } from "../redux/features/userSlice";
import { RootState } from "../redux/store";
import sprite from "../assets/sprite.svg";

type TUserMenu = {
  isPhone: boolean;
  toggleNav?: () => void;
};

const UserMenu = ({ isPhone, toggleNav }: TUserMenu) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const dispatch = useDispatch();

  return (
    <>
      {user && isPhone && (
        <>
          <li className="navigation__item">
            <Link
              to={"/favorites"}
              className={`navigation__link ${themeMode}`}
              onClick={() => toggleNav!()}
            >
              <svg>
                <use xlinkHref={`${sprite}#icon-heart`} />
              </svg>
              FAVORITES
            </Link>
          </li>
          <li className="navigation__item">
            <button
              className={`navigation__link-btn ${themeMode}`}
              onClick={() => {
                dispatch(setUser(null));
                dispatch(setListFavorites([]));
                toggleNav!();
              }}
            >
              {/* Replace with your actual icon */}
              <svg>
                <use xlinkHref={`${sprite}#icon-exit`} />
              </svg>
              Sign Out
            </button>
          </li>
        </>
      )}
      {user && !isPhone && (
        <div className="signin">
          <Link to={"/favorites"} className={`header__link ${themeMode}`}>
            <svg>
              <use xlinkHref={`${sprite}#icon-heart`} />
            </svg>
            FAVORITES
          </Link>
          <button
            className="button"
            onClick={() => {
              dispatch(setUser(null));
              dispatch(setListFavorites([]));
            }}
          >
            <svg>
              <use xlinkHref={`${sprite}#icon-exit`} />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
