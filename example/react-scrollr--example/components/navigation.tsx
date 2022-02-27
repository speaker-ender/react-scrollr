import Link from 'next/link';
import * as React from "react";
import { StyledNavigation, StyledNavigationLink } from './navigation.styles';

interface INavigation {
    open: boolean;
    updateNavOpen: (navState?: boolean) => void;
}

const Navigation: React.FC<INavigation> = (props) => {

    const handleClick = () => {
        props.updateNavOpen()
    }

    return (
        <StyledNavigation open={!!props.open} onClick={() => props.updateNavOpen()}>
            <StyledNavigationLink><Link href={'/'}>Home</Link></StyledNavigationLink>
        </StyledNavigation>
    )
}

export default Navigation;