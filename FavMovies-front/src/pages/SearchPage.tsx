import React, { useEffect, useState } from "react";
import { MediaItemExtend, SearchApiResponse } from "../../../lib/types";
import MediaGrid from "../components/MediaGrid";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { ScrollToTop } from "../components/UI/ScrollToTop";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useDebounce from "../hooks/useDebounce";
import useSearchQuery from "../hooks/useSearchQuery";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [medias, setMedias] = useState<MediaItemExtend[]>([]);
  const [page, setPage] = useState(1);

  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const { data, isLoading, isError, error } = useSearchQuery(
    debouncedQuery,
    page
  );

  useEffect(() => {
    if (data && data.response?.results) {
      if (page !== 1) setMedias((prev) => [...prev, ...data.response.results]);
      else setMedias(data.response.results);
    }
  }, [data]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onLoadMore = () => setPage(page + 1);

  return (
    <>
      <div className={`search-input ${themeMode}`}>
        <input
          type="text"
          placeholder="Type in to search..."
          onChange={onQueryChange}
        />
      </div>
      <MediaGrid medias={medias} isError={isError} error={error} />
      {isLoading ? (
        <LoadingIndicator />
      ) : medias.length === 0 || isError ? null : (
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
