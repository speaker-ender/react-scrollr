import { FC, useRef } from 'react';
import { InViewComponent, ObserverContextProvider } from '@speaker-ender/react-scrollr';
import { StyledPanel } from '../../global/panel.styles';
import { Header3 } from '../../global/typography';
import { StyledScrollBody, StyledScrollContainer } from './elementInView.styles';

interface IElementScroll {
}

const ElementInView: FC<IElementScroll> = (props) => {
    const contextRef = useRef<HTMLDivElement>(null);

    return (
        <ObserverContextProvider rootMargin="0px -15px 0px -15px" threshold={[0, 0.2, 0.8, 1]} root={contextRef}>
            <StyledScrollContainer ref={contextRef}>
                <StyledScrollBody>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                    <InViewComponent transitionStyle='fade-in'>
                        <StyledPanel>
                            <Header3>Scrollable Content</Header3>
                        </StyledPanel>
                    </InViewComponent>
                </StyledScrollBody>
            </StyledScrollContainer>
        </ObserverContextProvider>
    )
}

export default ElementInView
