import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { MediaDetail } from "./pages/MediaDetail";
import FavoritesList from "./pages/FavoritesList";
import ProtectedPage from "./components/ProtectedPage";

export const routesGen = {
  home: "/",
  mediaList: (type: string) => `/${type}`,
  mediaDetail: (type: string, id: number) => `/${type}/${id}`,
  mediaSearch: "/search",
  favoriteList: "/favorites",
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/:mediaType/:mediaId", element: <MediaDetail /> },
      {
        path: "/favorites",
        element: (
          <ProtectedPage>
            <FavoritesList />
          </ProtectedPage>
        ),
      },
    ],
  },
]);
