import type { NextPage } from "next";
import ImageComponent from "../../components/content/image";
import { StyledImageGrid } from "../../components/content/imageGrid.styles";
import { StyledPanel } from "../../global/panel.styles";
import { StyledPage } from "../../global/page.styles";
import { Header2, Header3, StyledCodeHeader } from "../../global/typography";
import ParagraphComponent from "../../components/content/paragraph";
import {
  InViewComponent,
  ObserverContextProvider,
} from "@speaker-ender/react-scrollr";
import { useCallback, useState } from "react";

const InViewAnimationsPage: NextPage = () => {
  const [currentThreshold, setCurrentThreshold] = useState(0);

  const inViewCallback = useCallback(
    (isIntersecting: boolean, threshold: number) => {
      setCurrentThreshold(threshold);
    },
    [setCurrentThreshold]
  );

  return (
    <StyledPage>
      <ObserverContextProvider
        rootMargin="-200px 0px -5% 0px"
        threshold={[0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]}
      >
        <InViewComponent transitionStyle="fade-up">
          <Header2>In View Animations</Header2>
        </InViewComponent>
        <InViewComponent transitionStyle="fade-up">
          <StyledPanel>
            <ParagraphComponent text="These are the built in animations for transitioning elements into view" />
            <ParagraphComponent text="You can see them change as you scroll along this page" />
          </StyledPanel>
        </InViewComponent>
        <StyledImageGrid columns={2}>
          <StyledImageGrid columns={2}>
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
          </StyledImageGrid>
          <StyledImageGrid columns={4} rows={2}>
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
          </StyledImageGrid>
        </StyledImageGrid>
        <StyledImageGrid columns={2}>
          <StyledImageGrid columns={2}>
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
          </StyledImageGrid>
          <StyledImageGrid columns={4} rows={2}>
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
            <ImageComponent transitionInView={true} />
          </StyledImageGrid>
        </StyledImageGrid>
        <InViewComponent transitionStyle="fade-in">
          <StyledPanel>
            <Header3>
              <StyledCodeHeader>fade-in</StyledCodeHeader>
            </Header3>
            <ParagraphComponent text="By default, InViewComponents will transition as soon as 20% of it is in the viewport." />
            <ParagraphComponent text="This corresponds to a 'threshold' attribute being set to 0.2" />
          </StyledPanel>
        </InViewComponent>
        <InViewComponent transitionStyle="fade-side" threshold={0.95}>
          <StyledPanel>
            <Header3>
              <StyledCodeHeader>fade-side</StyledCodeHeader>
            </Header3>
            <ParagraphComponent text="This component uses the 'threshold' attribute to wait until the element is almost completely in the viewport before becoming visible." />
          </StyledPanel>
        </InViewComponent>
        <InViewComponent transitionStyle="fade-up" threshold={0}>
          <StyledPanel>
            <Header3>
              <StyledCodeHeader>fade-up</StyledCodeHeader>
            </Header3>
            <ParagraphComponent text="This component uses the 'threshold' attribute to animate as soon as any part of the component enters the viewport." />
            <ParagraphComponent text="The margins of the Observer Root have been adjusted so that you can see the transition working" />
          </StyledPanel>
        </InViewComponent>
        <InViewComponent
          transitionStyle="fade-side"
          threshold={0}
          untrackOnCallback={true}
        >
          <StyledPanel>
            <Header3>
              <StyledCodeHeader>Single Transition</StyledCodeHeader>
            </Header3>
            <ParagraphComponent text="If you want to only transition elements the first time they become visible, you can set 'untrackOnCallback' to true." />
          </StyledPanel>
        </InViewComponent>
        <InViewComponent transitionStyle="none" callback={inViewCallback}>
          <StyledPanel>
            <Header3>
              <StyledCodeHeader>none</StyledCodeHeader>
            </Header3>
            <ParagraphComponent text="The transition style can also be set to 'none' in order to implement your own styles or event handlers." />
            <ParagraphComponent
              text={`The current threshold of this component is ${currentThreshold}`}
            />
            <ParagraphComponent text="In this example, I am using a callback function to display the current threshold of this component" />
          </StyledPanel>
        </InViewComponent>
      </ObserverContextProvider>
    </StyledPage>
  );
};

export default InViewAnimationsPage;
