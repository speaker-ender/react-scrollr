import type { NextPage } from 'next'
import { StyledPanel } from '../../global/panel.styles';
import { StyledPage } from '../../global/page.styles';
import { Header2 } from '../../global/typography';
import ParagraphComponent from '../../components/content/paragraph';
import CustomHeader from '../../components/scroll/headers/customHeader';

const CustomHeaders: NextPage = () => {

    const parallaxHeaderCallback = (currentScroll?: number, previousScroll?: number) => {

        return {
            transform: `translate3d(0, -${(currentScroll || 0) / 4}px, 0)`,
            backdropFilter: `blur(${((currentScroll || 0) / 10)}px)`
        }
    }

    const showHideHeaderCallback = (currentScroll?: number, previousScroll?: number) => {
        if (currentScroll) {
            const scrollChange = currentScroll - (previousScroll || 0);

            if (scrollChange > 0) {
                return {
                    transform: `translate3d(0, -100%, 0)`,
                }
            } else if (currentScroll === 0 || scrollChange < 0) {
                return {
                    transform: `translate3d(0, 0, 0)`,
                }
            }
        }
    }

    return (
        <StyledPage>
            <Header2>Custom Headers</Header2>
            <StyledPanel>
                <ParagraphComponent text="Here are some examples of popular scroll behaviors" />
            </StyledPanel>
            <CustomHeader updateHeaderCallback={parallaxHeaderCallback} />
            <CustomHeader hasTransition={true} updateHeaderCallback={showHideHeaderCallback} />
        </StyledPage>
    )
}

export default CustomHeaders
