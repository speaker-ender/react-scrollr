import styled, { css } from 'styled-components';
import { theme } from '../../global/theme.styles';
import { OPACITY } from '../../global/variables/opacity';
export type TransitionStages = 'initial' | 'enter' | 'animate' | 'complete' | 'exit';

export interface IStyledInViewProps {
    transitionStage: TransitionStages;
}

export const animation = `500ms cubic-bezier(0.33, 1, 0.68, 1)`;

export const initial = css<IStyledInViewProps>`
    opacity: ${OPACITY.full};
    transform: translate3d(0px, 0px, 0px);
    background-color: ${theme.themeProps.primaryLight};
`;

export const enter = css<IStyledInViewProps>`
    transform: translate3d(0px, 0px, 0px);
    opacity: ${OPACITY.none};
    background-color: ${theme.themeProps.primary};
`;

export const animate = css<IStyledInViewProps>`
    transform: translate3d(25px, 15px, -5px);
    opacity: ${OPACITY.none};
    background-color: ${theme.themeProps.primaryDark};
`;

export const complete = css<IStyledInViewProps>`
    transform: translate3d(40px, 50px, -15px);
    opacity: ${OPACITY.none};
    background-color: ${theme.themeProps.secondary};
`;

export const exit = css<IStyledInViewProps>`
    transform: translate3d(0px, 0px, 0px);
    opacity: ${OPACITY.full};
    background-color: ${theme.themeProps.tertiary};
`;


const handleTransitionStage = (style: TransitionStages) => {
    switch (style) {
        case "initial":
            return initial;
        case "enter":
            return enter;
        case "animate":
            return animate;
        case "complete":
            return complete;
        case "exit":
            return exit;
        default:
            return initial;
    }
};

export const StyledCustomInViewWrapper = styled.div`
        width: 100%;
        height: 100%;
        transform: translate3d(0px, 0px, 0px);
        opacity: ${OPACITY.full};
        background-color: ${theme.themeProps.primaryDark};
        transition: opacity ${animation}, transform ${animation}, background-color ${animation};
`;

export const StyledCustomInView = styled.div<IStyledInViewProps>`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    & ${StyledCustomInViewWrapper} {

        ${p => handleTransitionStage(p.transitionStage)}
    }
`;
