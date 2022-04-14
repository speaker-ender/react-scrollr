import { useClientHook } from "@speaker-ender/react-ssr-tools";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type IObserverOptions = {
  rootMargin?: string;
  root?: MutableRefObject<HTMLElement | null> | null;
  threshold?: number[];
};

export type IObserverState = Partial<ReturnType<typeof useObserverState>>;

type IObserverContext = IObserverState & IObserverOptions;

export const ObserverContext = createContext<IObserverContext | null>(null);

export type InViewCallback = (
  isIntersecting: boolean,
  threshold: number
) => void;

export type IInViewElement = {
  callback: InViewCallback;
  untrackOnCallback?: boolean;
  element: Element;
};

export interface IObserverContextProvider extends IObserverOptions {
  children?: ReactNode;
}

export const useObserverState = (props: IObserverOptions) => {
  const isClient = useClientHook();
  const [inViewObserver, setInViewObserver] = useState<IntersectionObserver>(
    null!
  );
  const inViewElements = useRef<IInViewElement[]>([]);

  const registerInViewElement = useCallback(
    (inViewElement: IInViewElement) => {
      !!inViewObserver && inViewObserver.observe(inViewElement.element);
      inViewElements.current = [...inViewElements.current, inViewElement];
    },
    [inViewObserver, inViewElements.current]
  );

  const unregisterInViewElement = useCallback(
    (inViewElement: IInViewElement) => {
      const inViewElementRef = inViewElements.current.find(
        (element) => element.callback === inViewElement.callback
      );

      !!inViewElementRef &&
        !!inViewObserver &&
        inViewObserver.unobserve(inViewElementRef.element);

      inViewElements.current = inViewElements.current.filter(
        (element) => element !== inViewElementRef
      );
    },
    [inViewObserver, inViewElements.current]
  );

  const updateElementInView = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        const inViewNode = entry.target;
        const callbackObject = inViewElements.current.find(
          (object) => object.element == inViewNode
        );

        if (!!callbackObject) {
          callbackObject.callback(
            entry.isIntersecting,
            entry.intersectionRatio
          );
        }
      });
    },
    [inViewElements.current]
  );

  useEffect(() => {
    if (!!inViewElements && !!inViewObserver) {
      inViewElements.current.forEach((inViewElement) =>
        inViewObserver.observe(inViewElement.element)
      );
    }
  }, [inViewObserver]);

  useEffect(() => {
    if (!!isClient && !inViewObserver) {
      const observerOptions: IntersectionObserverInit = {
        root: !!props.root ? props.root.current : null,
        rootMargin: props.rootMargin || "-90px 0px -10% 0px",
        threshold: props.threshold || [0],
      };

      setInViewObserver(
        new IntersectionObserver(updateElementInView, observerOptions)
      );
    }

    return () => {
      !!inViewObserver && inViewObserver.disconnect();
    };
  }, [isClient]);

  return {
    inViewObserver,
    registerInViewElement,
    unregisterInViewElement,
  };
};

export const useObserverContext = () => {
  const observerContext = useContext(ObserverContext);

  if (!observerContext) {
    throw new Error(
      "Observer Context used outside of ObserverContext.Provider"
    );
  }

  return observerContext;
};

export const ObserverContextProvider: React.FC<IObserverContextProvider> = (
  props
) => {
  const observerState = useObserverState(props);

  return (
    <ObserverContext.Provider value={observerState}>
      {props.children}
    </ObserverContext.Provider>
  );
};
