import * as React from "react";
import Image from 'next/image';
import enderImage from '../../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";
import { InViewComponent } from "../../../src";

export interface IImageComponent {
    transitionInView?: boolean;
}

const ImageComponent: React.FC<IImageComponent> = (props) => {

    return props.transitionInView ?
        <InViewComponent>
            <StyledImage>
                <Image src={enderImage} layout="responsive"></Image>
            </StyledImage>
        </InViewComponent> :
        <StyledImage>
            <Image src={enderImage} layout="responsive"></Image>
        </StyledImage>
}

export default ImageComponent;