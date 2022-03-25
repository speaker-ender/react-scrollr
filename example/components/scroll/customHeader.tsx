import { StyledCustomHeader, StyledCustomHeaderBody, StyledCustomHeaderContainer } from './customHeader.styles';
import { FC, ForwardedRef, useCallback, useEffect, useRef, useState } from 'react';
import { useScrollState } from '../../../src/scroll.context';
import { StyledHeaderTitle } from '../interface/header.styles';
import { StyledPanel } from '../../global/panel.styles';
import { Header3 } from '../../global/typography';

interface ICustomHeader {
}

const CustomHeader: FC<ICustomHeader> = (props) => {
    const contextRef = useRef<HTMLDivElement>(null);
    const [scroll, setCurrentScroll] = useState<{ currentScroll: number, lastScroll: number }>({ currentScroll: 0, lastScroll: 0 });
    const { registerScrollCallback, unregisterScrollCallback, setElementContext } = useScrollState({ scrollStateInterval: 10, scrollCallbackInterval: 10 });


    const updateCurrentScroll = useCallback((newCurrentScroll?: number, newLastScroll?: number) => {
        setCurrentScroll({
            currentScroll: !!newCurrentScroll ? newCurrentScroll : 0,
            lastScroll: !!newLastScroll ? newLastScroll : 0
        });
    }, [setCurrentScroll, contextRef])

    useEffect(() => {
        contextRef.current && setElementContext(contextRef.current as HTMLElement);

        return () => {
        }
    }, [contextRef.current]);

    useEffect(() => {
        registerScrollCallback && registerScrollCallback(updateCurrentScroll);

        return () => {
            unregisterScrollCallback && unregisterScrollCallback(updateCurrentScroll);
        }
    }, []);

    return (
        <StyledCustomHeaderContainer ref={contextRef}>
            <StyledCustomHeaderBody>
                <StyledCustomHeader style={{
                    transform: `translate3d(0, -${scroll.currentScroll / 5}px, 0)`,
                    backdropFilter: `blur(${(scroll.currentScroll / 10)}px)`
                }}>
                    <StyledHeaderTitle>Header</StyledHeaderTitle>
                </StyledCustomHeader>
                <StyledPanel>
                    <Header3>Content</Header3>
                </StyledPanel>
            </StyledCustomHeaderBody>
        </StyledCustomHeaderContainer>
    )
}

export default CustomHeader
