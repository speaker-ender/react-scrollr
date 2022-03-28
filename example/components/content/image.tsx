import * as React from "react";
import Image from 'next/image';
import enderImage from '../../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";
import { InViewComponent } from "@speaker-ender/react-scrollr";

export interface IImageComponent {
    transitionInView?: boolean;
}

const ImageComponent: React.FC<IImageComponent> = (props) => {

    return props.transitionInView ?
        <InViewComponent>
            <StyledImage>
                <Image src={enderImage} layout="responsive" alt=""></Image>
            </StyledImage>
        </InViewComponent> :
        <StyledImage>
            <Image src={enderImage} layout="responsive" alt=""></Image>
        </StyledImage>
}

export default ImageComponent;