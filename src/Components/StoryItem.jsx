import React from "react";
import { ExternalLink, MessageSquare, ArrowUpCircle } from "lucide-react";
import { formatTime, formatUrl } from "../utils/helperFunctions";

export const StoryItem = ({ title, url, score, by, time, descendants }) => {
  return (
    <div className="border-b p-3 border-gray-200 dark:border-gray-700 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex items-center text-primary-dark dark:text-blue-400">
          <ArrowUpCircle className="w-5 h-5" />
          <span className="ml-1 text-sm font-medium">{score}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                {formatUrl(url)}
              </a>
            )}
          </div>
          <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>by {by}</span>
            <span>{formatTime(time)}</span>
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {descendants} comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
