import type { NextPage } from "next";
import { StyledPanel } from "../../global/panel.styles";
import { StyledPage } from "../../global/page.styles";
import { Header2, Header3 } from "../../global/typography";
import ParagraphComponent from "../../components/content/paragraph";
import CustomHeader from "../../components/scroll/headers/customHeader";

const HeaderBehaviors: NextPage = () => {
  const parallaxHeaderCallback = (
    currentScroll?: number,
    previousScroll?: number
  ) => {
    return {
      transform: `translate3d(0, -${(currentScroll || 0) / 3}px, 0)`,
      backdropFilter: `blur(${(currentScroll || 0) / 10}px)`,
    };
  };

  const showHideHeaderCallback = (
    currentScroll?: number,
    previousScroll?: number
  ) => {
    if (currentScroll) {
      const scrollChange = currentScroll - (previousScroll || 0);

      if (scrollChange > 0 && (!previousScroll || previousScroll > 0)) {
        return {
          transform: `translate3d(0, -100%, 0)`,
        };
      } else if (currentScroll === 0 || scrollChange < 0) {
        return {
          transform: `translate3d(0, 0, 0)`,
        };
      }
    }
  };

  return (
    <StyledPage>
      <Header2>Header Behaviors</Header2>
      <StyledPanel>
        <ParagraphComponent text="Here are some examples of popular scroll behaviors" />
      </StyledPanel>
      <Header3>Parallax</Header3>
      <CustomHeader updateHeaderCallback={parallaxHeaderCallback} />
      <Header3>Show/Hide</Header3>
      <CustomHeader
        hasTransition={true}
        updateHeaderCallback={showHideHeaderCallback}
      />
    </StyledPage>
  );
};

export default HeaderBehaviors;
