import * as React from "react";
import { ILayoutProps } from "..";
import { StyledPage } from "../../../global/page.styles";
import { StyledPanel } from "../../../global/panel.styles";
import { Header2, StyledCodeHeader } from "../../../global/typography";
import Paragraph from "../../content/paragraph";

// Gallery Layout
//  _______________________________________
// | Header                                |
// ----------------------------------------
// |                                       |
// |            Page Content               |
// |                                       |
// |                                       |
// |                                       |
// |                                       |
// |_______________________________________|
// |               Footer                  |
// |_______________________________________|

export type parameter = {
    name: string,
    type: string,
    optional?: boolean,
    defaultValue?: string,
    description?: string,
}
export interface IDescriptionLayout extends ILayoutProps {
    componentName: string;
    parameters?: parameter[];
    description: string[];
}


const DescriptionLayout: React.FC<IDescriptionLayout> = (props) => {

    return (
        <StyledPage>
            <Header2><StyledCodeHeader>
                {props.componentName}({props.parameters && props.parameters.map((parameter, index, array) => `${parameter.name}${parameter.optional ? '?' : ''}: ${parameter.type}${index < array.length - 1 ? ', ' : ''}`)})
            </StyledCodeHeader></Header2>
            <StyledPanel>
                {props.description.map((paragraph, index) => {
                    return <Paragraph text={paragraph} key={index} />
                })}
            </StyledPanel>
            {props.children}
        </StyledPage>
    )
}

export default DescriptionLayout;