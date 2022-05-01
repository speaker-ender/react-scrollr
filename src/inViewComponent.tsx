import * as React from "react";
import { ReactNode } from "react";
import { InViewCallback } from "./observer.context";
import { useInViewState } from "./useInViewState";
import { useInViewTransition } from "./useInViewTransition";

export interface IInViewComponent {
  transitionStyle?: "fade-in" | "fade-up" | "fade-side" | "none";
  threshold?: number;
  callback?: InViewCallback;
  untrackOnCallback?: boolean;
  children?: ReactNode;
}

export const InViewComponent: React.FC<IInViewComponent> = (props) => {
  const [inViewRef] = useInViewTransition(
    props.threshold,
    props.untrackOnCallback,
    props.callback
  );

  return (
    <div
      style={{
        transition: "opacity 350ms ease-in-out",
        opacity: "0",
      }}
      ref={inViewRef}
    >
      {props.children}
    </div>
  );
};
