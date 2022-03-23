import type { NextPage } from 'next'
import { StyledPanel } from '../global/panel.styles';
import { StyledPage } from '../global/page.styles';
import { Header2 } from '../global/typography';
import ParagraphComponent from '../components/content/paragraph';

const Home: NextPage = () => {

  return (
    <StyledPage>
      <Header2>React Scrollr</Header2>
      <StyledPanel>
        <ParagraphComponent text="Tools for performant scroll animations" />
      </StyledPanel>
    </StyledPage>
  )
}

export default Home
