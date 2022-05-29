import styled from "styled-components";
import { StyledContentItem } from "../layouts/content/contentItem.styles";
import { ScrollbarStyles } from "../../global/scrollbar.styles";

export const StyledScrollContainer = styled(StyledContentItem)`
  position: relative;
  ${ScrollbarStyles}
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  background: linear-gradient(
    to right,
    ${(p) => p.theme.themeProps.primaryDark},
    ${(p) => p.theme.themeProps.secondaryLight}
  );
`;

export const StyledScrollBody = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  width: 100%;
  min-width: 200vw;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;
