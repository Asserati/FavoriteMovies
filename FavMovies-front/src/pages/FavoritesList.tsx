import { useDispatch, useSelector } from "react-redux";
import MediaItem from "../components/MediaItem";
import favoriteApi, {
  FavApiResponse,
  RemoveApiResponse,
} from "../api/modules/favorite.api";
import { removeFavorite } from "../redux/features/userSlice";
import { ResponseError, TFavoriteItem } from "../../../lib/types";
import { useEffect, useState } from "react";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RootState } from "../redux/store";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import toast from "react-hot-toast";

type FavoriteItemProps = {
  media: TFavoriteItem;
  onRemoved: (id: number) => void;
};
const FavoriteItem = ({ media, onRemoved }: FavoriteItemProps) => {
  const dispatch = useDispatch();
  const { mutate, isPending, isError, error } = useMutation<
    { response: RemoveApiResponse },
    ResponseError
  >({
    mutationFn: () =>
      favoriteApi.remove({
        favoriteId: media.id,
      }),
    onSuccess: () => {
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    },
    onError: (error) => {
      toast.error(error.info || "Failed to remove");
    },
  });
  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <div className="favorites__gridContainer__item__remove">
        <button
          className={"button"}
          onClick={() => mutate()}
          disabled={isPending}
        >
          remove
        </button>
      </div>
    </>
  );
};

const FavoritesList = () => {
  const [medias, setMedias] = useState<TFavoriteItem[]>([]);
  const [filteredMedias, setFilteredMedias] = useState<TFavoriteItem[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const { listFavorites } = useSelector((state: RootState) => state.user);
  const skip = 16;

  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const { data, isPending, isLoading, isError, error } = useQuery<
    { response: FavApiResponse[] },
    ResponseError
  >({
    queryKey: ["favorites"],
    queryFn: () => favoriteApi.getList(),
    staleTime: 1000 * 60 * 10, //10 mins
  });

  useEffect(() => {
    if (data && data.response) {
      setCount(data.response.length);
      setMedias([...data.response]);
      setFilteredMedias([...data.response].splice(0, skip));
    }
  }, [data]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id: number) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}:{" "}
      {isError && (
        <ErrorBlock
          title={error.message}
          message={error.info || "Was not able to find your favorites"}
        />
      )}{" "}
      :
      {
        <div className="favorites">
          <h2 className={`${themeMode}`}>Your favorites {`(${count})`}</h2>
          {filteredMedias.length === 0 && (
            <h1 className={`favorites__warning ${themeMode}`}>
              There are no movies that are in your favorites list
            </h1>
          )}
          {filteredMedias.length > 0 && !isPending && (
            <div className="favorites__gridContainer">
              {filteredMedias.map((media, index) => (
                <div className="favorites__gridContainer__item" key={index}>
                  <FavoriteItem media={media} onRemoved={onRemoved} />
                </div>
              ))}
            </div>
          )}

          {filteredMedias.length < medias.length && (
            <button onClick={onLoadMore}>load more</button>
          )}
        </div>
      }
    </>
  );
};

export default FavoritesList;
