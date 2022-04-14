import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { usePrevious } from "./helpers/hooks";
import { useObserverContext } from "./observer.context";

export type InViewCallback = (
  isIntersecting: boolean,
  threshold: number
) => void;

export type IInViewState = ReturnType<typeof useInViewState>;

export const useInViewState = (
  threshold: number = 0.2,
  untrackOnCallback?: boolean,
  callback?: InViewCallback
): [refCallback: (element: HTMLElement | null) => void, isInView: boolean] => {
  const isClient = useClientHook();
  const { registerInViewElement, unregisterInViewElement } =
    useObserverContext();
  const [isInView, setIsInView] = useState(false);
  const inViewElementRef = useRef<HTMLElement | null>(null);
  const prevElementRef = usePrevious<HTMLElement | null>(
    inViewElementRef.current
  );

  const inViewCallback = React.useCallback(
    (isIntersecting: boolean, currentThreshold: number) => {
      const newInView = currentThreshold >= threshold && isIntersecting;
      setIsInView(newInView);

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
      setIsInView,
      isInView,
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

  return [refCallback, isInView];
};
