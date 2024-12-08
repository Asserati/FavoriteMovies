import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";
import { Video } from "../../../lib/types";

type MediaVideoProps = {
  video: Video;
};

const MediaVideo = ({ video }: MediaVideoProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = iframeRef.current.offsetWidth * (9 / 16) + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, [video]);

  return (
    <div style={{ height: "max-content" }}>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

type MediaVideosSlideProps = {
  videos: Video[];
};

const MediaVideosSlide = ({ videos }: MediaVideosSlideProps) => {
  return (
    <NavigationSwiper>
      {videos.map((video) => (
        <SwiperSlide key={video.id}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
