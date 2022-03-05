import type { NextPage } from 'next'
import ImageComponent from '../components/image';
import { StyledImageGrid } from '../components/imageGrid.styles';
import { StyledPanel } from '../global/panel.styles';
import { Header4 } from '../global/typography';
import { StyledPage } from '../global/page.styles';

const Home: NextPage = () => {

  return (
    <StyledPage>
      <StyledPanel>
        <Header4>Welcome to my starter code</Header4>
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
      <StyledImageGrid columns={1}>
        <ImageComponent />
        <ImageComponent />
      </StyledImageGrid>
    </StyledPage>
  )
}

export default Home
