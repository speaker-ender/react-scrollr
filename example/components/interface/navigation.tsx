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
                    <StyledNavigationLink><Link href={'/demo'}>Demo</Link></StyledNavigationLink>
                    <StyledNavigationHeader>
                        Components
                    </StyledNavigationHeader>
                    <StyledNavigationLink><Link href={'/components/observerContextProvider'}>ObserverContextProvider</Link></StyledNavigationLink>
                    <StyledNavigationLink><Link href={'/components/scrollContextProvider'}>ScrollContextProvider</Link></StyledNavigationLink>
                    <StyledNavigationLink><Link href={'/components/inViewComponent'}>InViewComponent</Link></StyledNavigationLink>
                </div>
                <StyledNavigationFooter sidebarStyle={props.sidebarStyle}>
                    <DynamicInvertTheme />
                </StyledNavigationFooter>
            </StyledNavigationContent>
        </StyledNavigation>
    )
}

export default Navigation;