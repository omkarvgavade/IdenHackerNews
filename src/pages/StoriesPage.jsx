import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../hooks/useRequest";
import { StoryItem } from "../Components/StoryItem";
import { SkeletonStory } from "../Components/SkeletonStory";
import { setStories } from "../store/storiesSlice";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const StoriesPage = ({ type }) => {
  const dispatch = useDispatch();

  const { data, loading, error, hasMore, loadMore } = useRequest(
    `https://hacker-news.firebaseio.com/v0/${type}stories.json`,
    {
      pageSize: 30,
      initialPage: 1,
    }
  );

  React.useEffect(() => {
    if (data) {
      dispatch(setStories(data));
    }
  }, [data, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  const lastElementRef = useInfiniteScroll(handleLoadMore, hasMore);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 dark:text-red-400">
        Error loading stories: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-16">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
        {loading && !data?.length
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonStory key={index} />
            ))
          : data?.map((story, index) => (
              <div
                key={story.id}
                ref={index === data.length - 1 ? lastElementRef : null}
              >
                <StoryItem
                  title={story.title}
                  url={story.url}
                  score={story.score}
                  by={story.by}
                  time={story.time}
                  descendants={story.descendants}
                />
              </div>
            ))}

        {loading &&
          data?.length > 0 &&
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonStory key={`loading-${index}`} />
          ))}
      </div>
    </div>
  );
};
