
import styled, { css } from "styled-components";
import { StyledContentItem } from "../../components/layouts/content/contentItem.styles";
import { ScrollbarStyles } from "../../global/scrollbar.styles";
import { StyledHeader } from "../interface/header.styles";


export const StyledCustomHeaderContainer = styled(StyledContentItem)`
    ${ScrollbarStyles}
    max-height: 50vh;
    overflow-y: scroll;
`

export const StyledCustomHeader = styled(StyledHeader)`
    position: sticky
`

export const StyledCustomHeaderBody = styled.div`
    height: 100vh;
`