import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useScrollState } from '../../../src/scroll.context';
import { Header3 } from '../../global/typography';
import { StyledScrollBody, StyledScrollContainer, StyledScrollInfo } from './elementScroll.styles';
import ParagraphComponent from '../content/paragraph';

interface IElementScroll {
}

const ElementScroll: FC<IElementScroll> = (props) => {
    const contextRef = useRef<HTMLDivElement>(null);
    const [scroll, setCurrentScroll] = useState<{ currentScroll: number, lastScroll: number }>({ currentScroll: 0, lastScroll: 0 });
    const { registerScrollCallback, unregisterScrollCallback, setElementContext } = useScrollState({ stateInterval: 10, listenerInterval: 10 });

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
        <StyledScrollContainer ref={contextRef}>
            <StyledScrollBody>
                <Header3>Scrollable Content</Header3>
            </StyledScrollBody>
            <StyledScrollInfo>
                <ParagraphComponent text={`Current Position: ${scroll.currentScroll}px`} />
                <ParagraphComponent text={`Previous Position: ${scroll.lastScroll}px`} />
            </StyledScrollInfo>
        </StyledScrollContainer>
    )
}

export default ElementScroll
