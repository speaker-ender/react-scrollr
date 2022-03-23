import type { NextPage } from 'next'
import DescriptionLayout from '../../components/layouts/documentation/description.layout';

const InViewComponentPage: NextPage = () => {

    return (
        <DescriptionLayout
            componentName='InViewComponent'
            description={['This component is used for wrapping the elements that you would like to animate into view.',
                'You can choose from 3 pre-styled transitions, or select `none` to style yourself using the provided classes.',
                "`transitionStyle` can be set to 'fade-in', 'fade-up', 'fade-side', 'none'.",
                'You can also choose to animate as soon as it is in view, or untrack when in view']}
            parameters={[
                {
                    name: "transitionStyle",
                    type: "'fade-in' | 'fade-up' | 'fade-side' | 'none'",
                    optional: true
                },
                {
                    name: "untrackOnCallback",
                    type: "boolean",
                    optional: true
                }
            ]}
        >
        </DescriptionLayout>
    )
}

export default InViewComponentPage
