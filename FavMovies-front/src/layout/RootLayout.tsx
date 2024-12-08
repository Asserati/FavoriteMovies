import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthModal from "../components/AuthModal";
import { useEffect, useState } from "react";
import SidebarNavigation from "./SidedarNavigation";
import useUserInfo from "../hooks/useUserInfo";
import useUserFavorites from "../hooks/useUserFavorites";
import { Toaster } from "react-hot-toast";

const RootLayout: React.FC = () => {
  const { authModalOpen } = useSelector((state: RootState) => state.authModal);
  const { user } = useSelector((state: RootState) => state.user);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);
  //for navigation
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      setIsScrolled(window.scrollY > rem);
    };

    window.addEventListener("scroll", checkScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useUserInfo();
  useUserFavorites(user);

  const toastBackground = themeMode === "dark" ? "#363636" : "#f0f0f0";
  const toastFontColor = themeMode === "dark" ? "#fff" : "#000";

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            fontSize: "2rem",
            background: toastBackground,
            color: toastFontColor,
          },
        }}
      />
      <AnimatePresence>{authModalOpen && <AuthModal />}</AnimatePresence>
      {windowWidth > 680 && <MainNavigation isScrolled={isScrolled} />}
      {windowWidth <= 680 && <SidebarNavigation isScrolled={isScrolled} />}

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
