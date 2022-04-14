import { useClientHook } from "@speaker-ender/react-ssr-tools";
import * as React from "react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { usePrevious } from "../../../src/helpers/hooks";
import {
  StyledCustomInView,
  StyledCustomInViewPanel,
  StyledCustomInViewWrapper,
} from "./customInViewComponent.styles";
import { useObserverContext } from "@speaker-ender/react-scrollr";

export interface IInViewComponent {
  untrackOnCallback?: boolean;
  children?: ReactNode;
}

export const CustomInViewComponent: React.FC<IInViewComponent> = (props) => {
  const isClient = useClientHook();
  const { registerInViewElement, unregisterInViewElement } =
    useObserverContext();
  const [transitionNumberedStage, setTransitionNumberedStage] = useState(0);
  const inViewElementRef = useRef<HTMLDivElement>(null);
  const prevElementRef = usePrevious<HTMLDivElement | null>(
    inViewElementRef.current
  );

  const inViewCallback = React.useCallback(
    (isIntersecting: boolean, threshold: number) => {
      let newNumberedStage = 0;

      if (isIntersecting) {
        if (threshold >= 0.1) {
          newNumberedStage = 1;

          if (threshold >= 0.25) {
            newNumberedStage = 2;

            if (threshold >= 0.5) {
              newNumberedStage = 3;

              if (threshold >= 0.75) {
                newNumberedStage = 4;

                if (threshold >= 0.9) {
                  newNumberedStage = 5;
                }
              }
            }
          }
        }
      }

      setTransitionNumberedStage(newNumberedStage);
    },
    [setTransitionNumberedStage]
  );

  useEffect(() => {
    !!isClient &&
      !!registerInViewElement &&
      registerInViewElement({
        element: inViewElementRef.current as HTMLElement,
        callback: inViewCallback,
      });
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

  return (
    <StyledCustomInView
      transitionNumberedStage={transitionNumberedStage}
      ref={inViewElementRef}
    >
      <StyledCustomInViewWrapper>
        <StyledCustomInViewPanel>{props.children}</StyledCustomInViewPanel>
      </StyledCustomInViewWrapper>
    </StyledCustomInView>
  );
};
