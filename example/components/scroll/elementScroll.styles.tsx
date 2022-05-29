import styled from "styled-components";
import { StyledContentItem } from "../layouts/content/contentItem.styles";
import { ScrollbarStyles } from "../../global/scrollbar.styles";
import { InterfaceBackgroundStyles } from "../../global/background.styles";

export const StyledScrollContainer = styled(StyledContentItem)`
  position: relative;
  ${ScrollbarStyles}
  max-height: 50vh;
  overflow-y: scroll;
`;

export const StyledScrollBody = styled.div`
  height: 100vh;
  padding-top: 25px;
  text-align: center;
  background: linear-gradient(
    to bottom,
    ${(p) => p.theme.themeProps.primaryLight},
    ${(p) => p.theme.themeProps.secondaryDark}
  );
`;

export const StyledScrollInfo = styled.div`
  ${InterfaceBackgroundStyles}
  position: sticky;
  bottom: 0;
`;
