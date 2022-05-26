import { LinkStyles } from "../../global/link.styles";
import {
  Header4Style,
  NavigationSubPageTextStyle,
  NavigationTextStyle,
} from "../../global/typography";
import styled, { css } from "styled-components";
import { LAYERS } from "../../global/variables/layers";
import { media } from "../../global/variables/breakpoints";
import { StyledInvertThemeButton } from "../invertTheme.styles";
import { InterfaceBackgroundStyles } from "../../global/background.styles";
import { OPACITY } from "../../global/variables/opacity";
import { ScrollbarStyles } from "../../global/scrollbar.styles";
import {
  StyledDrawerContent,
  StyledDrawerContentWrapper,
  StyledDrawerHeader,
} from "../content/drawer.styles";
import { theme } from "../../global/theme.styles";
import { transition } from "../../global/animation.styles";

interface IStyledNavigation {
  open?: boolean;
  sidebarStyle?: boolean;
}

export const StyledNavigation = styled.div<IStyledNavigation>`
  position: fixed;
  bottom: env(safe-area-inset-bottom, 0px);
  left: 0;
  width: 100%;
  max-width: 100vw;
  height: calc(
    100% - ${(p) => p.theme.spacingProps.headerHeight} -
      env(safe-area-inset-top) - env(safe-area-inset-bottom)
  );
  max-height: ${(p) => `calc(100vh - ${p.theme.spacingProps.headerHeight})`};
  opacity: ${(p) => (p.open ? OPACITY.none : OPACITY.full)};
  transition: opacity ${transition.appear};
  pointer-events: ${(p) => (p.open ? "" : "none")};
  z-index: ${LAYERS.navigation};
  overflow: hidden;

  @media ${media.tabletLandscape} {
    position: ${(p) => (p.sidebarStyle ? "sticky" : "fixed")};
    top: ${(p) => (p.sidebarStyle ? p.theme.spacingProps.headerHeight : "")};
    height: ${(p) =>
      p.sidebarStyle
        ? `calc(100vh - ${p.theme.spacingProps.headerHeight} - env(safe-area-inset-top) - env(safe-area-inset-bottom))`
        : ""};
    max-height: ${(p) =>
      p.sidebarStyle
        ? "none"
        : `calc(100vh - ${p.theme.spacingProps.headerHeight})`};
    opacity: ${(p) => (p.sidebarStyle || p.open ? OPACITY.none : OPACITY.full)};
    position: ${(p) => p.sidebarStyle && InterfaceBackgroundStyles};
    pointer-events: ${(p) => (p.sidebarStyle || p.open ? "all" : "none")};
  }
`;

export const NavigationHeaderStyles = css`
  ${Header4Style}
  padding: ${(p) =>
    `${p.theme.spacingProps.textSpacingY} ${p.theme.spacingProps.textSpacingX}`};
  color: ${theme.themeProps.text};
  text-transform: uppercase;
`;

export const StyledNavigationHeader = styled.div`
  ${NavigationHeaderStyles}
`;

export const StyledNavigationContentWrapper = styled.div`
  word-break: break-word;
`;

export const StyledNavigationLink = styled.div`
  ${NavigationTextStyle}
  padding: ${(p) =>
    `${p.theme.spacingProps.textSpacingY} ${p.theme.spacingProps.textSpacingX}`};
  word-break: break-word;

  & a {
    ${LinkStyles}
  }
`;

export const StyledNavGithubLink = styled.a`
  ${LinkStyles}
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const StyledNavGithub = styled.div`
  ${LinkStyles}
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  grid-column: 2;
  grid-row: 2;
  align-self: center;
  justify-self: start;

  svg {
    transform: translate3d(0, 0, 0);
  }
`;

export const StyledNavigationContent = styled.div<IStyledNavigation>`
  grid-area: navigation;
  position: absolute;
  left: 0;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  @media ${media.tabletLandscape} {
    display: ${(p) => (p.sidebarStyle ? "grid" : "")};
    position: ${(p) => (p.sidebarStyle ? "relative" : "absolute")};
    ${(p) => p.sidebarStyle && ScrollbarStyles};
    grid-template-rows: ${(p) => (p.sidebarStyle ? "1fr min-content" : "auto")};
  }

  & ${StyledDrawerHeader} {
    ${NavigationHeaderStyles}
  }

  & ${StyledDrawerContentWrapper}, & ${StyledDrawerContent} {
    pointer-events: ${(p) => (p.open ? "" : "none")};

    @media ${media.tabletLandscape} {
      pointer-events: ${(p) => (p.open || p.sidebarStyle ? "auto" : "none")};
    }
  }

  & ${StyledDrawerContent} {
    & ${StyledNavigationLink} {
      ${NavigationSubPageTextStyle}
      padding: ${(p) =>
        `calc(${p.theme.spacingProps.textSpacingY} / 2) calc(${p.theme.spacingProps.textSpacingX} / 2)`};
    }
  }
`;

export const StyledNavigationFooter = styled.div<IStyledNavigation>`
  display: grid;
  width: 100%;
  grid-template-columns: 0 1fr 1fr 0;
  grid-template-rows: repeat(3, min-content);
  grid-column-gap: ${(p) => p.theme.spacingProps.defaultSpacing};
  grid-row-gap: calc(${(p) => p.theme.spacingProps.defaultSpacing});

  @media ${media.tabletLandscape} {
    ${(p) => p.sidebarStyle && InterfaceBackgroundStyles};
    position: ${(p) => (p.sidebarStyle ? "sticky" : "")};
    bottom: 0px;
    left: 0;
    box-shadow: ${(p) =>
      p.sidebarStyle &&
      `0px -2px 6px -4px ${theme.themeProps.backgroundInvertMediumOpacity}`};
  }

  & ${StyledInvertThemeButton} {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    grid-column: 3;
    grid-row: 2;
    justify-self: end;
    align-self: center;

    svg {
      max-height: none;
      max-width: none;
      height: 100%;
      width: 100%;
    }
  }
`;
