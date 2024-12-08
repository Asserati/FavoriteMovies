import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import mediaApi from "../api/modules/media.api";
import ErrorBlock from "../components/UI/ErrorBlock";
import { DetailApiResponse, Genre, ResponseError } from "../../../lib/types";
import tmdbConfigs from "../api/configs/tmdb.configs";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { CircularRate } from "../components/CircularRate";
import sprite from "../assets/sprite.svg";
import MediaVideosSlide from "../components/MediaVideoSlide";
import RecommendSlide from "../components/RecommendSlide";
import MediaSlide from "../components/MediaSlide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import favoriteApi, {
  AddFavorite,
  FavApiResponse,
  RemoveApiResponse,
} from "../api/modules/favorite.api";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import { queryClient } from "../App";
import toast from "react-hot-toast";

export const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const dispatch = useDispatch();

  const { user, listFavorites } = useSelector((state: RootState) => state.user);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const [media, setMedia] = useState<DetailApiResponse>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const videoRef = useRef(null);

  if (!mediaType || !mediaId)
    return (
      <ErrorBlock
        title="This weblink is not reachable"
        message="Invalid media"
      />
    );

  //setting the data
  const { data, isLoading, isError, error } = useQuery<
    {
      response: DetailApiResponse;
    },
    ResponseError
  >({
    queryKey: ["movies", mediaId, !!user],
    queryFn: () =>
      mediaApi.getDetail({
        mediaType,
        mediaId,
      }),
  });
  useEffect(() => {
    if (data && data.response) {
      setMedia(data.response);
      setIsFavorite(data.response.isFavorite);
      setGenres(data.response.genres.splice(0, 2));
    }
  }, [data]);

  //remove favorite
  const removeFavoriteMutation = useMutation<
    {
      response: RemoveApiResponse;
    },
    ResponseError,
    number
  >({
    mutationFn: (favoriteId: number) => favoriteApi.remove({ favoriteId }),
    onSuccess: (data, variables) => {
      dispatch(removeFavorite({ mediaId: variables }));
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      setIsFavorite(false);
    },
    onError(error) {
      toast.error(error.info || "Failed to remove");
    },
  });

  const onRemoveFavorite = async () => {
    if (listFavorites == null) return;
    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media!.id.toString()
    );
    if (!favorite) return;
    removeFavoriteMutation.mutate(favorite.id);
  };

  //add favorite
  const addFavoriteMutation = useMutation<
    {
      response: FavApiResponse;
    },
    ResponseError,
    AddFavorite
  >({
    mutationFn: (favorite: AddFavorite) => favoriteApi.add(favorite),
    onSuccess: (favorite) => {
      dispatch(addFavorite(favorite.response!));
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      setIsFavorite(true);
    },
    onError(error) {
      toast.error(error.info || "Failed to remove");
    },
  });

  //heartIcon div onClick
  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }
    if (
      media?.id &&
      (media?.title || media?.name) &&
      media?.poster_path &&
      media?.vote_average
    ) {
      const body: AddFavorite = {
        mediaId: media.id,
        title: media.title || media.name || "",
        poster: media.poster_path,
        rate: media.vote_average,
      };

      addFavoriteMutation.mutate(body);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : isError ? (
        <ErrorBlock
          title={error?.message || "Error while fetching details"}
          message={error?.info || "Please try again later"}
        />
      ) : media ? (
        <>
          <div
            className={`image-header ${themeMode}`}
            style={{
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                media.backdrop_path || media.poster_path || ""
              )})`,
            }}
          />
          <div className={`mediaDetail ${themeMode}`}>
            <div className={`mediaDetail__flex ${themeMode}`}>
              <div className={`mediaDetail__poster ${themeMode}`}>
                <div
                  className={`mediaDetail__poster-image ${themeMode}`}
                  style={{
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path || ""
                    )})`,
                  }}
                />
              </div>
              <div className={`mediaDetail__content ${themeMode}`}>
                <div className={`mediaDetail__content__h1 ${themeMode}`}>
                  <h1>{media.title || media.name}</h1>
                </div>
                <div
                  className={`mediaDetail__content__rate-genres ${themeMode}`}
                >
                  <CircularRate value={media.vote_average} />{" "}
                  {genres.map((genre) => (
                    <div
                      className={`mediaDetail__content__genres ${themeMode}`}
                      key={genre.id}
                    >
                      <span>{genre.name}</span>
                    </div>
                  ))}
                </div>

                <div className={`mediaDetail__content__overview ${themeMode}`}>
                  <p>{media.overview}</p>
                </div>
                <div className={`mediaDetail__content__clickable ${themeMode}`}>
                  <div className="flexCenter" onClick={onFavoriteClick}>
                    <svg
                      className={`mediaDetail__content__heartIcon ${
                        isFavorite && user ? "" : "outlined"
                      } ${themeMode}`}
                    >
                      <use xlinkHref={`${sprite}#icon-heart`} />
                    </svg>
                  </div>
                  <a href="#video">
                    <svg
                      className={`mediaDetail__content__playIcon ${themeMode}`}
                    >
                      <use xlinkHref={`${sprite}#icon-play`} />
                    </svg>
                    Watch now
                  </a>
                </div>
              </div>
            </div>
            <div ref={videoRef} className="video" id="video">
              <MediaVideosSlide
                videos={[...media.videos.results].splice(0, 5)}
              />
            </div>
            {media.recommend.length > 0 && (
              <div className={`recommend ${themeMode}`}>
                <h2>You may also like</h2>
                <RecommendSlide
                  medias={media.recommend}
                  mediaType={mediaType}
                />
              </div>
            )}
            {media.recommend.length === 0 && (
              <div className={`recommend ${themeMode}`}>
                <h2>You may also like</h2>
                <MediaSlide
                  mediaType={mediaType}
                  mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                />
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};
