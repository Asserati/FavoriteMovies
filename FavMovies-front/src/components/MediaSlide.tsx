import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { MediaItemExtend } from "../../../lib/types";
import useMoviesQuery from "../hooks/useMoviesQuery";
import LoadingIndicator from "./UI/LoadingIndicator";
import ErrorBlock from "./UI/ErrorBlock";

type TMediaSlide = {
  mediaType: string;
  mediaCategory: string;
};
const MediaSlide = ({ mediaType, mediaCategory }: TMediaSlide) => {
  const [medias, setMedias] = useState<MediaItemExtend[]>([]);

  const { data, isLoading, isError, error } = useMoviesQuery(
    mediaType,
    mediaCategory
  );

  useEffect(() => {
    if (data && data.response?.results) {
      setMedias(data.response.results);
    }
  }, [data]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {isError ? (
        <ErrorBlock
          title={error.message}
          message={error.info || "Try again later"}
        />
      ) : (
        <AutoSwiper>
          {medias.map((media, index) => (
            <SwiperSlide key={index}>
              <MediaItem media={media} mediaType={mediaType} slider={true} />
            </SwiperSlide>
          ))}
        </AutoSwiper>
      )}
    </>
  );
};

export default MediaSlide;
