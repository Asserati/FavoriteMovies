import { Swiper, SwiperSlide } from "swiper/react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { NavLink } from "react-router-dom";
import sprite from "../assets/sprite.svg";
import { CircularRate } from "./CircularRate";
import { routesGen } from "../routes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useMoviesQuery from "../hooks/useMoviesQuery";
import useGenresQuery from "../hooks/useGenresQuery";

type THeroSlide = {
  mediaType: string;
  mediaCategory: string;
};

export const HeroSlide = ({ mediaType, mediaCategory }: THeroSlide) => {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const { data, isLoading, isError, error } = useMoviesQuery(
    mediaType,
    mediaCategory
  );
  const {
    data: genreData,
    isError: genreIsError,
    error: genreError,
  } = useGenresQuery(mediaType);

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError || genreIsError) {
    content = (
      <ErrorBlock
        title={error?.message || genreError?.message || "An error eccured"}
        message={error?.info || genreError?.info || "Failed fetch movies"}
      />
    );
  }

  if (data) {
    content = (
      <div className="heroSlide">
        <Swiper
          slidesPerView={1}
          style={{ width: "100%", height: "max-content" }}
        >
          {data.response?.results.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="heroSlide__Image">
                <img
                  src={`${tmdbConfigs.backdropPath(
                    movie.backdrop_path || movie.poster_path || ""
                  )}`}
                  alt={movie.title}
                />
              </div>
              <div className={`heroSlide__Gradient ${themeMode}`}>
                <div className={`heroSlide__Content ${themeMode}`}>
                  <h1 className={`heroSlide__title ${themeMode}`}>
                    {movie.title}
                  </h1>
                  <div className={`heroSlide__rategenre ${themeMode}`}>
                    <CircularRate value={movie.vote_average} />
                    {movie.genre_ids &&
                      [...movie.genre_ids]
                        .splice(0, 2)
                        .map((genreId, index) => (
                          <div
                            className={`heroSlide__genre ${themeMode}`}
                            key={index}
                          >
                            {genreData?.response?.genres.find(
                              (e) => e.id === genreId
                            ) &&
                              genreData?.response?.genres.find(
                                (e) => e.id === genreId
                              )?.name}
                          </div>
                        ))}
                  </div>
                  <p className={`heroSlide__description ${themeMode}`}>
                    {movie.overview}
                  </p>
                  <NavLink
                    to={routesGen.mediaDetail(
                      mediaType,
                      movie.mediaId || movie.id
                    )}
                    end
                  >
                    <svg className="heroSlide__playIcon">
                      <use xlinkHref={`${sprite}#icon-play`} />
                    </svg>
                    Watch now
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  return <div className="heroSlideContent">{content}</div>;
};
