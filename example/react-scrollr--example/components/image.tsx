import * as React from "react";
import Head from 'next/head';
import { useState } from "react";
import Image from 'next/image';
import enderImage from '../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";
import { InViewComponent } from '../../../src'

const ImageComponent: React.FC = () => {

    return (
        <InViewComponent transitionStyle="fade-in">
            <StyledImage>
                <Image src={enderImage} layout="responsive"></Image>
            </StyledImage>
        </InViewComponent>
    )
}

export default ImageComponent;