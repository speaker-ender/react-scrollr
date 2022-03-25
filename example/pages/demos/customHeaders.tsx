import type { NextPage } from 'next'
import { StyledPanel } from '../../global/panel.styles';
import { StyledPage } from '../../global/page.styles';
import { Header2 } from '../../global/typography';
import ParagraphComponent from '../../components/content/paragraph';
import CustomHeader from '../../components/scroll/customHeader';

const CustomHeaders: NextPage = () => {

    return (
        <StyledPage>
            <Header2>Custom Headers</Header2>
            <StyledPanel>
                <ParagraphComponent text="Here are some examples of popular scroll behaviors" />
            </StyledPanel>
            <CustomHeader />
        </StyledPage>
    )
}

export default CustomHeaders
