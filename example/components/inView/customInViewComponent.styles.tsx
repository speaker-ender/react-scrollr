import styled, { css } from "styled-components";
import { transition } from "../../global/animation.styles";
import { PanelStyles } from "../../global/panel.styles";
import { theme } from "../../global/theme.styles";
import { OPACITY } from "../../global/variables/opacity";

export type TransitionStages =
  | "initial"
  | "enter"
  | "animate"
  | "highlight"
  | "emphasize"
  | "complete"
  | "exit";

export interface IStyledInViewProps {
  transitionNumberedStage: number;
}

export const initial = css<IStyledInViewProps>`
  opacity: ${OPACITY.full};
  transform: translate3d(0px, -50%, 5px) scale(0.35) rotateX(4deg);
  background-color: ${theme.themeProps.primaryLight};
`;

export const enter = css<IStyledInViewProps>`
  transform: translate3d(0px, -50%, 5px) scale(0.45) rotateX(3deg);
  opacity: ${OPACITY.half};
  background-color: ${theme.themeProps.tertiaryDark};
`;

export const animate = css<IStyledInViewProps>`
  transform: translate3d(0px, -50%, 5px) scale(0.65) rotateX(2deg);
  opacity: ${OPACITY.partial};
  background-color: ${theme.themeProps.tertiary};
`;

export const highlight = css<IStyledInViewProps>`
  transform: translate3d(0px, -50%, 5px) scale(0.8) rotateX(1deg);
  opacity: ${OPACITY.none};
  background-color: ${theme.themeProps.secondary};
`;

export const emphasize = css<IStyledInViewProps>`
  transform: translate3d(0px, -50%, 5px) scale(0.9) rotateX(0deg);
  opacity: ${OPACITY.none};
  background-color: ${theme.themeProps.primaryLight};
`;

export const complete = css<IStyledInViewProps>`
  transform: translate3d(0px, -50%, 5px) scale(0.95) rotateX(0deg);
  opacity: ${OPACITY.none};
  background-color: ${theme.themeProps.primary};
`;

export const exit = css<IStyledInViewProps>`
  transform: translate3d(0px, -50%, 5px);
  opacity: ${OPACITY.full};
  background-color: ${theme.themeProps.tertiary};
`;

const transitionStages = css<IStyledInViewProps>`
  ${(p) => p.transitionNumberedStage >= 0 && initial}
  ${(p) => p.transitionNumberedStage >= 1 && enter}
    ${(p) => p.transitionNumberedStage >= 2 && animate}
    ${(p) => p.transitionNumberedStage >= 3 && highlight}
    ${(p) => p.transitionNumberedStage >= 4 && emphasize}
    ${(p) => p.transitionNumberedStage >= 5 && complete}
`;

export const StyledCustomInViewPanel = styled.div`
  ${PanelStyles}
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  min-height: 80%;
  margin: 0;
  opacity: ${OPACITY.full};
  transform: translate3d(0px, -50%, 5px);
  background-color: ${theme.themeProps.primaryLight};
  transition: opacity ${transition.appear},
    transform ${transition.appearSecondary},
    background-color ${transition.appearSecondary};
  backface-visibility: hidden;
  will-change: transform, opacity, background-color;
`;

export const StyledCustomInViewWrapper = styled.div`
  position: relative;
  height: 100%;

  perspective: 100px;
  transform-style: preserve-3d;
`;

export const StyledCustomInView = styled.div<IStyledInViewProps>`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & ${StyledCustomInViewPanel} {
    ${transitionStages}
  }
`;
