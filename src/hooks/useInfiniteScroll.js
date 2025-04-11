import { useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (onIntersect, enabled = true) => {
  const observerRef = useRef(null);

  const lastElementRef = useCallback(
    (node) => {
      if (!enabled) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        {
          rootMargin: "100px",
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
};
