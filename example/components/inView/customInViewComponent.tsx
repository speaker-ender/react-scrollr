import { useClientHook } from '@speaker-ender/react-ssr-tools';
import * as React from 'react';
import { useEffect } from 'react';
import { usePrevious } from '../../../src/helpers/hooks';
import { StyledCustomInView, StyledCustomInViewWrapper, TransitionStages } from './customInViewComponent.styles';
import { useObserverContext } from '../../../src/observer.context';

export interface IInViewComponent {
    untrackOnCallback?: boolean;
}

export const CustomInViewComponent: React.FC<IInViewComponent> = props => {
    const isClient = useClientHook();
    const { registerInViewElement, unregisterInViewElement, inViewObserver } = useObserverContext();
    const [transitionStage, setTransitionStage] = React.useState<TransitionStages>('initial');
    const inViewElementRef = React.useRef<HTMLDivElement>(null);
    const prevElementRef = usePrevious<HTMLDivElement | null>(inViewElementRef.current);

    const inViewCallback = React.useCallback((isIntersecting: boolean, threshold: number) => {
        let newStage: TransitionStages = 'initial';

        if (isIntersecting) {
            // I hate this. Change later
            if (threshold > 0) {
                newStage = 'enter'

                if (threshold > 0.15) {
                    newStage = 'animate'

                    if (threshold > 0.4) {
                        newStage = 'complete'

                        if (threshold > 0.7) {
                            newStage = 'animate'

                            if (threshold > 0.8) {
                                // newStage = 'complete'
                                // if (threshold > 0.9) {
                                //     newStage = 'animate'
                                // }
                            }
                        }
                    }
                }
            }
        }
        console.log(newStage);
        setTransitionStage(newStage);
    }, [setTransitionStage])

    useEffect(() => {
        !!isClient && !!registerInViewElement && registerInViewElement({
            element: inViewElementRef.current as HTMLElement,
            callback: inViewCallback,
            untrackOnCallback: props.untrackOnCallback
        });

    }, [isClient, inViewElementRef.current]);

    useEffect(() => {

        return () => {
            !!unregisterInViewElement && unregisterInViewElement({
                element: inViewElementRef.current || prevElementRef as HTMLElement,
                callback: inViewCallback,
                untrackOnCallback: props.untrackOnCallback
            });
        };
    }, []);

    return (
        <StyledCustomInView transitionStage={transitionStage} ref={inViewElementRef}>
            <StyledCustomInViewWrapper>
                {props.children}
            </StyledCustomInViewWrapper>
        </StyledCustomInView>
    );
};
