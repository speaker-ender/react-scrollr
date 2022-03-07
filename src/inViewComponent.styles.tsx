import styled, { css } from 'styled-components';
export type TransitionStyles = 'fade-in' | 'fade-up' | 'fade-side' | 'none';

export interface IStyledInViewProps {
    transitionStyle?: TransitionStyles;
    inView?: boolean;
}

export const opacity = {
    none: 1,
    partial: 0.8,
    medium: 0.6,
    half: 0.5,
    high: 0.4,
    most: 0.2,
    full: 0,
}

export const animation = `500ms cubic-bezier(0.33, 1, 0.68, 1)`;

export const fadeInView = css<IStyledInViewProps>`
    opacity: ${p => p.inView ? opacity.none : opacity.full};
    transition: opacity ${animation};
`;

export const fadeUpAndInView = css<IStyledInViewProps>`
    opacity: ${p => p.inView ? opacity.none : opacity.full};
    transform: ${p => p.inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 25px, 0)'};
    transition: opacity ${animation}, transform ${animation};
`;

export const fadeFromSideAndInView = css<IStyledInViewProps>`
    opacity: ${opacity.full};
    max-width: 100vw;
    opacity: ${p => p.inView ? opacity.none : opacity.full};
    transform: ${p => p.inView ? 'translate3d(0, 0, 0)' : 'translate3d(-25px, 0, 0)'};
    overflow-x: hidden;
    transition: opacity ${animation}, transform ${animation};
`;

const handleTransitionType = (style: string | undefined) => {
    switch (style) {
        case "fade-in":
            return fadeInView;
        case "fade-up":
            return fadeUpAndInView;
        case "fade-side":
            return fadeFromSideAndInView;
        case "none":
            return;
        default:
            return fadeInView;
    }
};

export const StyledInView = styled.div<IStyledInViewProps>`
    ${p => handleTransitionType(p.transitionStyle)}
`;
