import type { NextPage } from 'next'
import ImageComponent from '../../components/content/image';
import { StyledImageGrid } from '../../components/content/imageGrid.styles';
import { StyledPanel } from '../../global/panel.styles';
import { StyledPage } from '../../global/page.styles';
import { Header2 } from '../../global/typography';
import ParagraphComponent from '../../components/content/paragraph';
import { InViewComponent } from '../../../src';
import { CustomInViewComponent } from '../../components/inView/customInViewComponent';

const CustomScroll: NextPage = () => {

    return (
        <StyledPage>

            <Header2>Demo</Header2>
            <StyledPanel>
                <ParagraphComponent text="Just scroll down the page and see what happens" />
                <ParagraphComponent text="Click on the bug in the bottom right corner to see the current scroll position update as you scroll" />
            </StyledPanel>
            <StyledImageGrid columns={2}>
                <ImageComponent />
                <ImageComponent />
                <StyledImageGrid columns={2}>
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                </StyledImageGrid>
                <StyledImageGrid columns={4} rows={4}>
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                    <ImageComponent />
                </StyledImageGrid>
            </StyledImageGrid>
            <StyledPanel>
                <ParagraphComponent text="Just scroll down the page and see what happens" />
                <ParagraphComponent text="Click on the bug in the bottom right corner to see the current scroll position update as you scroll" />
            </StyledPanel>
            <StyledImageGrid columns={1}>
                <ImageComponent />
                <ImageComponent />
            </StyledImageGrid>
        </StyledPage>
    )
}

export default CustomScroll
