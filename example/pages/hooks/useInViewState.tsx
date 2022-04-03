import type { NextPage } from 'next'
import FunctionLayout from '../../components/layouts/documentation/function.layout';

const useInViewStatePage: NextPage = () => {

    return (
        <FunctionLayout
            functionName='useInViewState'
            description={[
                '',
            ]}
            parameters={[
                {
                    name: "threshold",
                    type: "number",
                    optional: true
                },
                {
                    name: "untrackOnCallback",
                    type: "boolean",
                    optional: true
                },
                {
                    name: "callback",
                    type: "InViewCallback",
                    optional: true
                },
            ]}
        >
        </FunctionLayout>
    )
}

export default useInViewStatePage;