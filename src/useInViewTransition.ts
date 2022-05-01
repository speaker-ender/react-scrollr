import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import { useClientHook, useEventCallback } from "@speaker-ender/react-ssr-tools";
import { usePrevious } from "./helpers/hooks";
import { useObserverContext } from "./observer.context";

export type InViewCallback = (
  isIntersecting: boolean,
  threshold: number
) => void;

export type IInViewState = ReturnType<typeof useInViewTransition>;

export const useInViewTransition = (
  threshold: number = 0.2,
  untrackOnCallback?: boolean,
  callback?: InViewCallback
): [refCallback: (element: HTMLElement | null) => void] => {
  const isClient = useClientHook();
  const { registerInViewElement, unregisterInViewElement } =
    useObserverContext();
  const isInView = useRef(false);
  const inViewElementRef = useRef<HTMLElement | null>(null);
  const prevElementRef = usePrevious<HTMLElement | null>(
    inViewElementRef.current
  );

  const inViewCallback = useEventCallback(
    (isIntersecting: boolean, currentThreshold: number) => {
      const newInView = currentThreshold >= threshold && isIntersecting;

      if (newInView !== isInView.current) {
          if (newInView) {
            if (inViewElementRef.current) inViewElementRef.current.style.opacity = '1'
          } else {
            if (inViewElementRef.current) inViewElementRef.current.style.opacity = '0'
          }

          isInView.current = newInView;
      }

      !!callback && callback(isIntersecting, currentThreshold);

      !!newInView &&
        !!untrackOnCallback &&
        !!unregisterInViewElement &&
        unregisterInViewElement({
          element: inViewElementRef.current || (prevElementRef as HTMLElement),
          callback: inViewCallback,
        });
    },
    [
      isInView.current,
      unregisterInViewElement,
      inViewElementRef.current,
      prevElementRef,
    ]
  );

  const refCallback = useCallback((element: HTMLElement | null) => {
    inViewElementRef.current = element;
  }, []);

  useEffect(() => {
    !!isClient &&
      !!registerInViewElement &&
      registerInViewElement({
        element: inViewElementRef.current as HTMLElement,
        callback: inViewCallback,
      });

    return () => {
      !!unregisterInViewElement &&
        unregisterInViewElement({
          element: prevElementRef as HTMLElement,
          callback: inViewCallback,
        });
    };
  }, [isClient, inViewElementRef.current]);

  useEffect(() => {
    return () => {
      !!unregisterInViewElement &&
        unregisterInViewElement({
          element: inViewElementRef.current || (prevElementRef as HTMLElement),
          callback: inViewCallback,
        });
    };
  }, []);

  return [refCallback];
};
