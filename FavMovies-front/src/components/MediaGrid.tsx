import MediaItem from "./MediaItem";
import { MediaItemExtend, ResponseError } from "../../../lib/types";

import ErrorBlock from "../components/UI/ErrorBlock";
type TMediaGrid = {
  medias: MediaItemExtend[];
  isError: boolean;
  error: ResponseError | null;
};
const MediaGrid = ({ medias, isError, error }: TMediaGrid) => {
  const actualMediaType = "movie";

  let content;

  if (isError) {
    content = (
      <ErrorBlock
        title={error?.message || "An error occurred"}
        message={error?.info || "Failed to fetch movies"}
      />
    );
  } else {
    content = (
      <div className="mediaGrid">
        {medias.map((media, index) => (
          <div key={index} className="mediaItem__size">
            <MediaItem media={media} mediaType={actualMediaType} />
          </div>
        ))}
      </div>
    );
  }

  return <div className="mediaGrid__container"> {content} </div>;
};

export default MediaGrid;
