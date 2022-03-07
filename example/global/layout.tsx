import * as React from "react";
import Head from 'next/head';
import Header from "../components/header";
import Navigation from "../components/navigation";
import { StyledPage } from "./page.styles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.styles";
import { GlobalStyle } from "./global.styles";
import InvertTheme from "../components/invertTheme";
import { useSiteState } from "../hooks/useSiteState";
import Overlay from "../components/overlay";
import Alert from "../components/alert";
import Message from "../components/message";
import { ObserverContextProvider, ScrollContextProvider } from "../../src";
import DebugPanel from "example/components/debugPanel";
import ScrollInfo from "example/components/debug/scrollInfo";


const Layout: React.FC = ({ children }) => {
    const { themeInverted } = useSiteState();

    return (
        <ScrollContextProvider>
            <ObserverContextProvider>
                <ThemeProvider theme={{ ...theme, isInvert: themeInverted }}>
                    <div className="container">
                        <GlobalStyle />
                        <Head>
                            <title>Next.JS Starter</title>
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <main>
                            <Header />
                            <Navigation />
                            <StyledPage>
                                {children}
                            </StyledPage>
                        </main>
                        <Overlay />
                        <Alert />
                        <InvertTheme />
                        <Message />
                        <DebugPanel defaultOpen={true}>
                            <ScrollInfo />
                        </DebugPanel>
                    </div>
                </ThemeProvider>
            </ObserverContextProvider>
        </ScrollContextProvider>
    )
}

export default Layout;