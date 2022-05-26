import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { StyledPage } from "../global/page.styles";
import { Header2 } from "../global/typography";
import ParagraphComponent from "../components/content/paragraph";
import {
  InViewComponent,
  ObserverContextProvider,
  ScrollContextProvider,
} from "@speaker-ender/react-scrollr";
import CustomHeader from "../components/scroll/headers/customHeader";
import ElementScroll from "../components/scroll/elementScroll";
import ElementInView from "./demos/elementInView";

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
            <ParagraphComponent text="Managing lots of scroll events in your React Site can be difficult to maintain can serverly degrade performance" />
            <ParagraphComponent text="React Scrollr uses a callback pattern in conjunction with context hooks in order to keep your code clean while also avoiding re-rendering of your components" />
          </StyledPanel>
        </InViewComponent>
      </ObserverContextProvider>
      <ElementInView />
      <ScrollContextProvider>
        <ElementScroll />
      </ScrollContextProvider>
      <ScrollContextProvider>
        <CustomHeader updateHeaderCallback={parallaxHeaderCallback} />
      </ScrollContextProvider>
    </StyledPage>
  );
};

export default Home;
