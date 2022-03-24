import Link from "next/link";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useScrollContext } from "../../../src";
import { useSiteState } from "../../hooks/useSiteState";
import { StyledHeader, StyledHeaderTitle, StyledNavButton } from "./header.styles";

interface IHeader {
}

const Header: React.FC<IHeader> = (props) => {
    const { setOverlayActive, navOpen, setNavOpen, setAlertActive, alert, overlayActive } = useSiteState();
    const [scroll, setCurrentScroll] = useState<{ currentScroll: number, lastScroll: number }>({ currentScroll: 0, lastScroll: 0 });
    const { registerScrollCallback, unregisterScrollCallback } = useScrollContext();

    const handleClick = () => {
        !alert.active ? setNavOpen(!navOpen) : setAlertActive(false);
        setOverlayActive(!overlayActive);
    }

    const updateCurrentScroll = useCallback((newCurrentScroll?: number, newLastScroll?: number) => {
        setCurrentScroll({
            currentScroll: !!newCurrentScroll ? newCurrentScroll : 0,
            lastScroll: !!newLastScroll ? newLastScroll : 0
        });
    }, [setCurrentScroll])

    useEffect(() => {
        registerScrollCallback && registerScrollCallback(updateCurrentScroll);

        return () => {
            unregisterScrollCallback && unregisterScrollCallback(updateCurrentScroll);
        }
    }, []);


    return (
        <StyledHeader style={{ transform: `translate3d(0, -${scroll.currentScroll / 4}px, 0)`, opacity: `${1 - scroll.currentScroll / 400}`, backdropFilter: `blur(${(scroll.currentScroll / 4) + 5}px)` }}>
            <StyledHeaderTitle>
                <Link href={'/'}>
                    3NDER
                </Link>
            </StyledHeaderTitle>
            <StyledNavButton onClick={() => handleClick()}>
                {navOpen || alert.active ? '❌' : '✙'}
            </StyledNavButton>
        </StyledHeader>
    )
}

export default Header;