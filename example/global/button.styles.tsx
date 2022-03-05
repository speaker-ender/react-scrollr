import styled, { css } from "styled-components";

interface IStyledButton {
}

export const ButtonStyles = css`
    background-color: ${p => p.theme.themeProps.primary};
    color: ${p => p.theme.themeProps.text};
    border: none;
    padding: 10px 19px;
    border-radius: 12px;
    box-shadow: 0px 0px 1px rgba(255,0,0,0), 0px 0px 1px rgba(0,0,255,0);
    transition: box-shadow 450ms ease-in-out, background-color 250ms ease;

    &:hover {
        background-color: ${p => p.theme.themeProps.primaryLight};
        box-shadow: 3px 3px 1px rgba(255,0,0,1), -3px -3px 1px rgba(0,0,255,1);
    }
`;

export const StyledButton = styled.button<IStyledButton>`
    ${ButtonStyles}
`;
