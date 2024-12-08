import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { MediaItemExtend } from "../../../lib/types";
import { routesGen } from "../routes";
import sprite from "../assets/sprite.svg";
import { CircularRate } from "./CircularRate";

export type TMediaItem = {
  media: MediaItemExtend;
  mediaType: string;
  slider?: boolean;
  onRemove?: boolean;
};

const MediaItem = ({ media, mediaType, slider }: TMediaItem) => {
  const [title, setTitle] = useState<string>();
  const [posterPath, setPosterPath] = useState<string>();
  const [releaseDate, setReleaseDate] = useState<string>();
  const [rate, setRate] = useState<number>();

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster ||
          media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path ||
          "defaultFallbackPath"
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    }

    setRate(media.vote_average || media.mediaRate || media.rate);
  }, [media, mediaType]);

  return (
    <div className="mediaItem">
      <Link to={routesGen.mediaDetail(mediaType, media.mediaId || media.id)}>
        <div
          className="mediaItem__image"
          style={{ backgroundImage: `url(${posterPath})` }}
        >
          <div className="mediaItem__back-drop" />
          {mediaType !== "people" && (
            <>
              <div
                className={`mediaItem__play-btn${slider ? " forSlider" : ""}`}
              >
                <svg>
                  <use xlinkHref={`${sprite}#icon-play`} />
                </svg>
              </div>
              <div className={`mediaItem__info${slider ? " forSlider" : ""}`}>
                {rate && <CircularRate value={rate} />}
                {releaseDate ? <p>{releaseDate}</p> : null}

                <p>{title}</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MediaItem;
