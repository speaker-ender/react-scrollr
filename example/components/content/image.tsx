import * as React from "react";
import Image from 'next/image';
import enderImage from '../../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";
import { InViewComponent } from "../../../src";

const ImageComponent: React.FC = (props) => {

    return (
        <InViewComponent>
            <StyledImage>
                <Image src={enderImage} layout="responsive"></Image>
            </StyledImage>
        </InViewComponent>
    )
}

export default ImageComponent;