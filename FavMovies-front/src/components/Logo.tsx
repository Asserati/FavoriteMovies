import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  return (
    <div className={`logo logo__${themeMode} ${className}`}>
      Fav<span className={`logo logo__movie`}>Movies</span>
    </div>
  );
};
