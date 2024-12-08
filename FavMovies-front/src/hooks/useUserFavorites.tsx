import { useEffect } from "react";
import { useDispatch } from "react-redux";
import favoriteApi, { FavApiResponse } from "../api/modules/favorite.api";
import { setListFavorites } from "../redux/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { ResponseError, SignApiResponse } from "../../../lib/types";
import toast from "react-hot-toast";

const useUserFavorites = (user: SignApiResponse | null) => {
  const dispatch = useDispatch();
  const {
    data: favorites,
    isError,
    error: favoritesError,
  } = useQuery<{ response: FavApiResponse[] }, ResponseError>({
    queryKey: ["favorites"],
    queryFn: () => favoriteApi.getList(),
    enabled: !!user,
  });

  useEffect(() => {
    if (favorites && favorites.response) {
      dispatch(setListFavorites(favorites.response));
    }
    if (isError) {
      toast.error(favoritesError?.info || "Can't fetch favorites");
    }
  }, [favorites, favoritesError, dispatch]);
};

export default useUserFavorites;
