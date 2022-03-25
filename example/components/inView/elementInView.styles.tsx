
import styled from "styled-components";
import { StyledContentItem } from "../layouts/content/contentItem.styles";
import { ScrollbarStyles } from "../../global/scrollbar.styles";

export const StyledScrollContainer = styled(StyledContentItem)`
    position: relative;
    ${ScrollbarStyles}
    width: 100%;
    max-width: 100%;
    overflow-x: scroll;
`

export const StyledScrollBody = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    width: 200vw;
`
