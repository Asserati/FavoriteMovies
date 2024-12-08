import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type ErrorBlockProps = {
  title?: string;
  message: string;
};

export default function ErrorBlock({ title, message }: ErrorBlockProps) {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);
  return (
    <div className={`error-block ${themeMode}`}>
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
