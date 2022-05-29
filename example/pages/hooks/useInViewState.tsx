import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useInViewStatePage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useInViewState"
      description={[
        "This hook can be used to keep track of an elements in view state.",
        "This hook is not meant for a large amount of components as it relies on state updates and not callbacks.",
        "If you need to handle many components, register a callback through the useObserverContext hook.",
      ]}
      parameters={[
        {
          name: "threshold",
          type: "number",
          optional: true,
        },
        {
          name: "untrackOnCallback",
          type: "boolean",
          optional: true,
        },
        {
          name: "callback",
          type: "InViewCallback",
          optional: true,
        },
      ]}
    ></FunctionLayout>
  );
};

export default useInViewStatePage;
