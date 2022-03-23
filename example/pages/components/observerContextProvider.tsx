import type { NextPage } from 'next'
import DescriptionLayout from '../../components/layouts/documentation/description.layout';

const ObserverContextProviderPage: NextPage = () => {

    return (
        <DescriptionLayout
            componentName='ObserverContextProvider'
            description={['This component is used for handling window observer states.']}
        >
        </DescriptionLayout>
    )
}

export default ObserverContextProviderPage
