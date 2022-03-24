import type { NextPage } from 'next'
import ImageComponent from '../components/content/image';
import { StyledImageGrid } from '../components/content/imageGrid.styles';
import { StyledPanel } from '../global/panel.styles';
import { StyledPage } from '../global/page.styles';
import { Header2 } from '../global/typography';
import ParagraphComponent from '../components/content/paragraph';
import { InViewComponent } from '../../src';
import { CustomInViewComponent } from '../components/inView/customInViewComponent';

const Demo: NextPage = () => {

    return (
        <StyledPage>
            <Header2>Demo</Header2>
            <InViewComponent transitionStyle='fade-up'>
                <StyledPanel>
                    <ParagraphComponent text="Just scroll down the page and see what happens" />
                    <ParagraphComponent text="Click on the bug in the bottom right corner to see the current scroll position update as you scroll" />
                </StyledPanel>
            </InViewComponent>
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
            <InViewComponent transitionStyle='fade-side'>
                <StyledPanel>
                    <ParagraphComponent text="Just scroll down the page and see what happens" />
                    <ParagraphComponent text="Click on the bug in the bottom right corner to see the current scroll position update as you scroll" />
                </StyledPanel>
            </InViewComponent>
            <CustomInViewComponent>
                <StyledPanel>
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                    <ParagraphComponent text="Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." />
                    <ParagraphComponent text="Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." />
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                    <ParagraphComponent text="Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." />
                    <ParagraphComponent text="Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." />
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                    <ParagraphComponent text="Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." />
                    <ParagraphComponent text="Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." />
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                    <ParagraphComponent text="Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." />
                    <ParagraphComponent text="Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." />
                </StyledPanel>
            </CustomInViewComponent>
            <StyledImageGrid columns={1}>
                <ImageComponent />
                <ImageComponent />
            </StyledImageGrid>
        </StyledPage>
    )
}

export default Demo
