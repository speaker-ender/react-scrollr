import {
  StyledCustomHeader,
  StyledCustomHeaderBody,
  StyledCustomHeaderContainer,
} from "./customHeader.styles";
import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScrollContext } from "@speaker-ender/react-scrollr";
import { StyledHeaderTitle } from "../../interface/header.styles";
import { StyledPanel } from "../../../global/panel.styles";
import { Header3 } from "../../../global/typography";

interface ICustomHeader {
  updateHeaderCallback?: (
    currentScroll?: number,
    lastScroll?: number
  ) => CSSProperties | void;
  hasTransition?: boolean;
}

const CustomHeader: FC<ICustomHeader> = (props) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const [scroll, setCurrentScroll] = useState<{
    currentScroll: number;
    lastScroll: number;
  }>({ currentScroll: 0, lastScroll: 0 });
  const [headerStyles, setHeaderStyles] = useState<CSSProperties>();
  const [
    scrollRef,
    registerScrollCallback,
    unregisterScrollCallback,
    setElementContext,
  ] = useScrollContext();

  const updateCurrentScroll = useCallback(
    (newCurrentScroll?: number, newLastScroll?: number) => {
      setCurrentScroll({
        currentScroll: !!newCurrentScroll ? newCurrentScroll : 0,
        lastScroll: !!newLastScroll ? newLastScroll : 0,
      });

      if (props.updateHeaderCallback) {
        const newStyles = props.updateHeaderCallback(
          newCurrentScroll,
          newLastScroll
        );
        newStyles && setHeaderStyles(newStyles);
      }
    },
    [setCurrentScroll, contextRef, setHeaderStyles, props.updateHeaderCallback]
  );

  useEffect(() => {
    contextRef.current && setElementContext(contextRef.current as HTMLElement);

    return () => {};
  }, [contextRef.current]);

  useEffect(() => {
    registerScrollCallback && registerScrollCallback(updateCurrentScroll);

    return () => {
      unregisterScrollCallback && unregisterScrollCallback(updateCurrentScroll);
    };
  }, []);

  return (
    <StyledCustomHeaderContainer ref={contextRef}>
      <StyledCustomHeaderBody>
        <StyledCustomHeader
          hasTransition={props.hasTransition}
          style={headerStyles}
        >
          <StyledHeaderTitle>Header</StyledHeaderTitle>
        </StyledCustomHeader>
        <StyledPanel>
          <Header3>Content</Header3>
        </StyledPanel>
      </StyledCustomHeaderBody>
    </StyledCustomHeaderContainer>
  );
};

export default CustomHeader;
