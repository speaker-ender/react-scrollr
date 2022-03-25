import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as React from "react";
import { useSiteState } from '../../hooks/useSiteState';
import Drawer from '../content/drawer';
import { RawInvertTheme } from '../invertTheme';
import { StyledNavigation, StyledNavigationContent, StyledNavigationFooter, StyledNavigationHeader, StyledNavigationLink } from './navigation.styles';

const DynamicInvertTheme = dynamic(() => import('../invertTheme'), {
    ssr: false,
    loading: () => <RawInvertTheme />
});

interface INavigation {
    sidebarStyle?: boolean;
}

const Navigation: React.FC<INavigation> = (props) => {
    const { navOpen } = useSiteState();

    return (
        <StyledNavigation sidebarStyle={props.sidebarStyle} open={navOpen}>
            <StyledNavigationContent sidebarStyle={props.sidebarStyle} open={navOpen}>
                <div>
                    <StyledNavigationHeader>
                        Components
                    </StyledNavigationHeader>
                    <StyledNavigationLink><Link href={'/components/observerContextProvider'}>ObserverContextProvider</Link></StyledNavigationLink>
                    <StyledNavigationLink><Link href={'/components/scrollContextProvider'}>ScrollContextProvider</Link></StyledNavigationLink>
                    <StyledNavigationLink><Link href={'/components/inViewComponent'}>InViewComponent</Link></StyledNavigationLink>
                    <StyledNavigationHeader>
                        Hooks
                    </StyledNavigationHeader>
                    <StyledNavigationLink><Link href={'/hooks/useScrollState'}>useScrollState</Link></StyledNavigationLink>
                    <Drawer title='Demos'>
                        <StyledNavigationLink><Link href={'/demos/inViewAnimations'}>In View Animations</Link></StyledNavigationLink>
                        <StyledNavigationLink><Link href={'/demos/elementInView'}>Element In View</Link></StyledNavigationLink>
                        <StyledNavigationLink><Link href={'/demos/advancedInView'}>Advanced In View Animations</Link></StyledNavigationLink>
                        <StyledNavigationLink><Link href={'/demos/elementScrollState'}>Element Scroll State</Link></StyledNavigationLink>
                        <StyledNavigationLink><Link href={'/demos/headerBehaviors'}>Header Behaviors</Link></StyledNavigationLink>
                    </Drawer>
                </div>
                <StyledNavigationFooter sidebarStyle={props.sidebarStyle}>
                    <DynamicInvertTheme />
                </StyledNavigationFooter>
            </StyledNavigationContent>
        </StyledNavigation>
    )
}

export default Navigation;