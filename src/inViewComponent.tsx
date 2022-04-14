import * as React from "react";
import { ReactNode } from "react";
import { StyledInView, TransitionStyles } from "./inViewComponent.styles";
import { InViewCallback } from "./observer.context";
import { useInViewState } from "./useInViewState";

export interface IInViewComponent {
  transitionStyle?: TransitionStyles;
  threshold?: number;
  callback?: InViewCallback;
  untrackOnCallback?: boolean;
  children?: ReactNode;
}

export const InViewComponent: React.FC<IInViewComponent> = (props) => {
  const [inViewRef, isInView] = useInViewState(
    props.threshold,
    props.untrackOnCallback,
    props.callback
  );

  return (
    <StyledInView
      transitionStyle={props.transitionStyle}
      ref={inViewRef}
      inView={isInView}
    >
      {props.children}
    </StyledInView>
  );
};
