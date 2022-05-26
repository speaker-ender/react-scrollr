import type { NextPage } from "next";
import { StyledPanel } from "../../global/panel.styles";
import { StyledPage } from "../../global/page.styles";
import { Header2 } from "../../global/typography";
import ParagraphComponent from "../../components/content/paragraph";
import ElementScroll from "../../components/scroll/elementScroll";
import { ScrollContextProvider } from "@speaker-ender/react-scrollr";

const ElementScrollState: NextPage = () => {
  return (
    <StyledPage>
      <Header2>Element Scroll State</Header2>
      <StyledPanel>
        <ParagraphComponent text="Here you can see how the scroll state can be applied to an element instead of the viewport" />
      </StyledPanel>
      <ScrollContextProvider>
        <ElementScroll />
      </ScrollContextProvider>
    </StyledPage>
  );
};

export default ElementScrollState;
