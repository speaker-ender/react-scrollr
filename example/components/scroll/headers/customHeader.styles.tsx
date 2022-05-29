import styled from "styled-components";
import { StyledContentItem } from "../../layouts/content/contentItem.styles";
import { ScrollbarStyles } from "../../../global/scrollbar.styles";
import { StyledHeader, StyledHeaderTitle } from "../../interface/header.styles";
import { transition } from "../../../global/animation.styles";
import { StyledPanel } from "../../../global/panel.styles";

interface IStyledCustomHeader {
  hasTransition?: boolean;
}

export const StyledCustomHeaderContainer = styled(StyledContentItem)`
  position: relative;
  ${ScrollbarStyles}
  max-height: 50vh;
  overflow-y: scroll;
  z-index: 1;
`;

export const StyledCustomHeader = styled(StyledHeader)<IStyledCustomHeader>`
  position: sticky;
  transition: ${(p) => p.hasTransition && `transform ${transition.appear}`};
  background-color: ${(p) => p.theme.themeProps.backgroundInvertMediumOpacity};

  & ${StyledHeaderTitle} {
    color: ${(p) => p.theme.themeProps.textInvert};
  }
`;

export const StyledCustomHeaderBody = styled.div`
  height: 100vh;
  background: linear-gradient(
    to bottom,
    ${(p) => p.theme.themeProps.primaryLight},
    ${(p) => p.theme.themeProps.secondaryDark}
  );

  & ${StyledPanel} {
    margin: 1rem;
  }
`;
