import type { NextPage } from 'next'
import DescriptionLayout from '../../components/layouts/documentation/description.layout';

const ObserverContextProviderPage: NextPage = () => {

    return (
        <DescriptionLayout
            componentName='ObserverContextProvider'
            description={['This component is used for handling window observer states.']}
            parameters={[
                {
                    name: "root",
                    type: "Element | Document | null",
                    optional: true
                },
                {
                    name: "rootMargin",
                    type: "string",
                    optional: true
                },
                {
                    name: "threshold",
                    type: "number[]",
                    optional: true
                },
            ]}
        >
        </DescriptionLayout>
    )
}

export default ObserverContextProviderPage
