import React from "react";

export const SkeletonStory = () => {
  return (
    <div className="border-b p-3 border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-start gap-4">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="ml-1 w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
