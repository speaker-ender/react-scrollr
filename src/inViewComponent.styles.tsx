import styled, { css } from 'styled-components';
export type TransitionStyles = 'fade-in' | 'fade-up' | 'fade-side' | 'none';

export interface IStyledInViewProps {
    transitionStyle?: TransitionStyles;
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

export const fadeInView = css`
    opacity: ${opacity.full};

    &.in-view {
        opacity: ${opacity.full};

        &--visible {
            transition: opacity ${animation};
            opacity: ${opacity.none};
        }
    }
`;

export const fadeUpAndInView = css`
    opacity: ${opacity.full};
    transform: translate3d(0, 25px, 0);

    &.in-view {
        opacity: ${opacity.full};
        transform: translate3d(0, 25px, 0);

        &--visible {
            transition: opacity ${animation}, transform ${animation};
            opacity: ${opacity.none};
            transform: translate3d(0, 0, 0);
        }
    }
`;

export const fadeFromSideAndInView = css`
    opacity: ${opacity.full};

    &.in-view {
        max-width: 100vw;
        opacity: ${opacity.full};
        transform: translate3d(-25px, 0, 0);
        overflow-x: hidden;

        &--visible {
            transition: opacity ${animation}, transform ${animation};
            opacity: ${opacity.none};
            transform: translate3d(0, 0, 0);
        }
    }
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
