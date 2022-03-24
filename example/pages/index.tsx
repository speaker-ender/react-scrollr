import type { NextPage } from 'next'
import { StyledPanel } from '../global/panel.styles';
import { StyledPage } from '../global/page.styles';
import { Header2 } from '../global/typography';
import ParagraphComponent from '../components/content/paragraph';
import { InViewComponent } from '../../src';

const Home: NextPage = () => {

  return (
    <StyledPage>
      <InViewComponent>
        <Header2>React Scrollr</Header2>
      </InViewComponent>
      <InViewComponent>
        <StyledPanel>
          <ParagraphComponent text="Tools for performant scroll animations" />
        </StyledPanel>
      </InViewComponent>
    </StyledPage>
  )
}

export default Home
