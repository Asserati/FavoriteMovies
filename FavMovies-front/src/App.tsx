import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { router } from "./routes";
import "./css/style.css";
import "swiper/swiper-bundle.css";
import "swiper/css";

export const queryClient = new QueryClient();

function App() {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(themeMode);
  }, [themeMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
