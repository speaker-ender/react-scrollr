import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { scrollTopDistance, hasWindow } from "@speaker-ender/js-measure";
import {
  useClientHook,
  useEventCallback,
} from "@speaker-ender/react-ssr-tools";
import { useRegisteredCallbacks } from "./helpers/hooks";

export type IScrollOptions = {
  withContext?: boolean;
};

export type IScrollState = ReturnType<typeof useScrollState>;

export const ScrollContext = createContext<IScrollState | null>(null);

export interface IScrollContextProvider extends Partial<IScrollOptions> {
  children?: ReactNode;
}

export interface ScrollState {
  currentPosition: number;
  prevPosition?: number;
}

const selectScrollState = (
  prevPosition?: number,
  element?: HTMLElement
): ScrollState | undefined =>
  hasWindow
    ? {
        currentPosition: element ? element.scrollTop : scrollTopDistance(),
        prevPosition,
      }
    : undefined;

export type ScrollCallback = (scroll?: number, lastScroll?: number) => void;

export const useScrollState = ({
  withContext,
}: IScrollOptions): [
  scrollRef: MutableRefObject<ScrollState | undefined>,
  registerScrollCallback: (callback: ScrollCallback) => void,
  unregisterScrollCallback: (callback: ScrollCallback) => void,
  setElementContext: (element: HTMLElement) => void
] => {
  const isClientSide = useClientHook();
  const rafRunning = useRef(false);
  const scrollRef = useRef<ScrollState | undefined>(selectScrollState());
  const [elementContext, setElementContext] = useState<HTMLElement>();
  const [registerScrollCallback, unregisterScrollCallback, scrollCallbacks] =
    useRegisteredCallbacks<ScrollCallback>([]);

  const raf = useEventCallback(() => {
    const newScrollState = selectScrollState(
      scrollRef.current && scrollRef.current.currentPosition,
      elementContext
    );

    if (
      newScrollState?.currentPosition !== scrollRef.current?.currentPosition
    ) {
      scrollCallbacks.current.map((scrollCallback: ScrollCallback) =>
        scrollCallback(
          newScrollState ? newScrollState.currentPosition : 0,
          newScrollState ? newScrollState.prevPosition : 0
        )
      );

      scrollRef.current = newScrollState;
    } else {
      rafRunning.current = false;
    }

    rafRunning.current && window.requestAnimationFrame(raf);
  }, [scrollRef.current, scrollCallbacks]);

  const startScroll = useEventCallback(() => {
    if (!rafRunning.current && isClientSide && withContext) {
      if (withContext || elementContext) {
        rafRunning.current = true;
        window.requestAnimationFrame(raf);
      }
    }
  }, [isClientSide]);

  useEffect(() => {
    if (isClientSide && withContext) {
      window.addEventListener("scroll", startScroll);
    }
    return () => {
      rafRunning.current = false;
      window.removeEventListener("scroll", startScroll);
    };
  }, [isClientSide]);

  return [
    scrollRef,
    registerScrollCallback,
    unregisterScrollCallback,
    setElementContext,
  ];
};

export const useScrollContext = () => {
  const scrollContext = useContext(ScrollContext);

  if (!scrollContext) {
    throw new Error("Scroll Context used outside of ScrollContext.Provider");
  }

  return scrollContext;
};

export const ScrollContextProvider: React.FC<IScrollContextProvider> = (
  props
) => {
  const scrollState = useScrollState({
    withContext: true,
    ...props,
  });

  return (
    <ScrollContext.Provider value={scrollState}>
      {props.children}
    </ScrollContext.Provider>
  );
};
