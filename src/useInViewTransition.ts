import { useCallback } from "react";
import { useEffect, useRef } from "react";
import { useClientHook, useEventCallback } from "@speaker-ender/react-ssr-tools";
import { usePrevious } from "./helpers/hooks";
import { useObserverContext } from "./observer.context";

export type InViewCallback = (
  isIntersecting: boolean,
  threshold: number,
) => void;

export const useInViewTransition = (
  threshold: number = 0.2,
  untrackOnCallback?: boolean,
  callback?: InViewCallback,
  transitionStyle?: "fade-in" | "fade-up" | "fade-side" | "none"
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
            if (inViewElementRef.current) {
              switch (transitionStyle) {
                case 'fade-in':
                  inViewElementRef.current.style.opacity = '1'
                  break
                case 'fade-side':
                  inViewElementRef.current.style.opacity = '1'
                  inViewElementRef.current.style.transform = 'translate3d(0px, 0, 0)'
                  break
                case 'fade-up':
                  inViewElementRef.current.style.opacity = '1'
                  inViewElementRef.current.style.transform = 'translate3d(0, 0px, 0)'
                  break
                default:
                  inViewElementRef.current.style.opacity = '1'
                  break
              }
            } 
          } else {
            
            if (inViewElementRef.current) {
              switch (transitionStyle) {
                case 'fade-in':
                  inViewElementRef.current.style.opacity = '0'
                  break
                case 'fade-side':
                  inViewElementRef.current.style.opacity = '0'
                  inViewElementRef.current.style.transform = 'translate3d(-20px, 0, 0)'
                  break
                case 'fade-up':
                  inViewElementRef.current.style.opacity = '0'
                  inViewElementRef.current.style.transform = 'translate3d(0, 20px, 0)'
                  break
                  default:
                    inViewElementRef.current.style.opacity = '0'
                    break
              }
            }
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
