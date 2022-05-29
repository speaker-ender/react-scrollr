import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { StyledPage } from "../global/page.styles";
import { Header2, Header3 } from "../global/typography";
import ParagraphComponent from "../components/content/paragraph";
import {
  InViewComponent,
  ObserverContextProvider,
  ScrollContextProvider,
} from "@speaker-ender/react-scrollr";
import CustomHeader from "../components/scroll/headers/customHeader";
import ElementScroll from "../components/scroll/elementScroll";
import ElementInView from "../components/inView/elementInView";

const Home: NextPage = () => {
  const parallaxHeaderCallback = (
    currentScroll?: number,
    previousScroll?: number
  ) => {
    return {
      transform: `translate3d(0, -${(currentScroll || 0) / 3}px, 0)`,
      backdropFilter: `blur(${(currentScroll || 0) / 10}px)`,
    };
  };

  return (
    <StyledPage>
      <ObserverContextProvider
        rootMargin="-150px 0px -5% 0px"
        threshold={[0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]}
      >
        <InViewComponent>
          <Header2>React Scrollr</Header2>
        </InViewComponent>
        <InViewComponent>
          <StyledPanel>
            <ParagraphComponent text="This package contains all the tools you need to handle scroll events at scale." />
            <ParagraphComponent text="React Scrollr uses a callback pattern in conjunction with context hooks in order to keep your code clean while also avoiding re-rendering of your components" />
          </StyledPanel>
        </InViewComponent>
        <InViewComponent>
          <Header3>Usage Examples</Header3>
        </InViewComponent>
        <InViewComponent>
          <StyledPanel>
            <ParagraphComponent text="You can create animations whenever an element enders or leaves the viewport" />
          </StyledPanel>
        </InViewComponent>
        <ElementInView />
        <InViewComponent>
          <StyledPanel>
            <ParagraphComponent text="You can keep track of the current scroll position of the Window or any scrollable container" />
          </StyledPanel>
        </InViewComponent>
        <ScrollContextProvider>
          <ElementScroll />
        </ScrollContextProvider>
        <InViewComponent>
          <StyledPanel>
            <ParagraphComponent text="You can create animations based off of scroll events, such as headers" />
          </StyledPanel>
        </InViewComponent>
        <ScrollContextProvider>
          <CustomHeader updateHeaderCallback={parallaxHeaderCallback} />
        </ScrollContextProvider>
      </ObserverContextProvider>
    </StyledPage>
  );
};

export default Home;
