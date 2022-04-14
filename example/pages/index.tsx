import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { StyledPage } from "../global/page.styles";
import { Header2 } from "../global/typography";
import ParagraphComponent from "../components/content/paragraph";
import {
  InViewComponent,
  ObserverContextProvider,
} from "@speaker-ender/react-scrollr";

const Home: NextPage = () => {
  return (
    <StyledPage>
      <ObserverContextProvider
        rootMargin="-200px 0px -5% 0px"
        threshold={[0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]}
      >
        <InViewComponent>
          <Header2>React Scrollr</Header2>
        </InViewComponent>
        <InViewComponent>
          <StyledPanel>
            <ParagraphComponent text="Tools for performant scroll animations" />
          </StyledPanel>
        </InViewComponent>
      </ObserverContextProvider>
    </StyledPage>
  );
};

export default Home;
