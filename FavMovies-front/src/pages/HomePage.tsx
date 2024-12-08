import { HeroSlide } from "../components/HeroSlide";
import MediaGrid from "../components/MediaGrid";

import tmdbConfigs from "../api/configs/tmdb.configs";
import { useEffect, useMemo, useState } from "react";
import { ScrollToTop } from "../components/UI/ScrollToTop";
import { MediaItemExtend } from "../../../lib/types";
import { useQuery } from "@tanstack/react-query";
import mediaApi from "../api/modules/media.api";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const HomePage = () => {
  const [currCategory, setCurrCategory] = useState(0);
  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];
  const [currPage, setCurrPage] = useState(1);
  const [medias, setMedias] = useState<MediaItemExtend[]>([]);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const onCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return;
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };
  const onLoadMore = () => setCurrPage(currPage + 1);

  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["movies", currPage, currCategory],
    queryFn: () =>
      mediaApi.getList({
        mediaType: tmdbConfigs.mediaType.movie,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      }),
    staleTime: 1000 * 60 * 10, //10 mins
  });
  useEffect(() => {
    if (data && data.response?.results) {
      if (currPage !== 1)
        setMedias((prev) => [...prev, ...data.response.results]);
      else setMedias(data.response.results);
    }
  }, [data]);

  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      {isLoading || isError ? null : (
        <div className="mediaCategory">
          {category.map((cate, index) => (
            <button
              key={index}
              className={
                currCategory === index
                  ? `mediaCategory__categoryBtn active ${themeMode}`
                  : `mediaCategory__categoryBtn ${themeMode}`
              }
              onClick={() => onCategoryChange(index)}
            >
              {cate}
            </button>
          ))}
        </div>
      )}

      <MediaGrid medias={medias} isError={isError} error={error} />
      {medias.length === 0 || isError ? null : isPending ? (
        <LoadingIndicator />
      ) : (
        <div className="loadMore">
          <button className="button" onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
      <ScrollToTop />
    </>
  );
};
