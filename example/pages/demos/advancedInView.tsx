import type { NextPage } from 'next'
import { StyledPage } from '../../global/page.styles';
import { Header2 } from '../../global/typography';
import ParagraphComponent from '../../components/content/paragraph';
import { ObserverContextProvider } from '@speaker-ender/react-scrollr';
import { CustomInViewComponent } from '../../components/inView/customInViewComponent';

const AdvancedInViewPage: NextPage = () => {

    return (
        <StyledPage>
            <ObserverContextProvider rootMargin="-10% 0px -10% 0px" threshold={[0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]}>
                <CustomInViewComponent>
                    <Header2>Advanced In View Animations</Header2>
                    <Header2>Using A Custom In View Component</Header2>
                </CustomInViewComponent>
                <CustomInViewComponent>
                    <Header2>Incremental Animation</Header2>
                    <ParagraphComponent text="This is an example of how you can create your own custom InViewComponent to make new and intersting animations" />
                    <ParagraphComponent text="By using callback you can set an animation stage that will progress as you scroll" />
                </CustomInViewComponent>
                <CustomInViewComponent>
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                    <ParagraphComponent text="Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." />
                    <ParagraphComponent text="Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." />
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                    <ParagraphComponent text="Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." />
                    <ParagraphComponent text="Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." />
                    <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />

                </CustomInViewComponent>
            </ObserverContextProvider>
        </StyledPage>
    )
}

export default AdvancedInViewPage
