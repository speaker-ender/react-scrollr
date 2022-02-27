import * as React from 'react';
import { StyledInView, TransitionStyles } from './inViewComponent.styles';
import { useObserverContext } from './observer.context';

export interface IInViewComponent {
    transitionStyle?: TransitionStyles;
}

export const InViewComponent: React.FC<IInViewComponent> = props => {
    const { inViewObserver, registerElementInView, unregisterElementInView } = useObserverContext();
    const inViewElementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        inViewElementRef.current && registerElementInView && registerElementInView(inViewElementRef.current as HTMLElement);

        return () => {
            inViewElementRef.current && unregisterElementInView && unregisterElementInView(inViewElementRef.current as HTMLElement);
        };
    }, [inViewObserver, inViewElementRef]);

    return (
        <StyledInView transitionStyle={props.transitionStyle} ref={inViewElementRef}>
            {props.children}
        </StyledInView>
    );
};
