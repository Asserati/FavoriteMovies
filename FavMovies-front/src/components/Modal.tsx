import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type TModal = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: TModal) {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />

      <motion.dialog
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        open
        className={`modal ${themeMode}`}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
}
