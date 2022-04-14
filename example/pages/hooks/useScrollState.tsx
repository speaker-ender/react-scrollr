import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useScrollStatePage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useScrollState"
      description={[
        "This hook is used for managing the state of a scroll context.",
      ]}
      parameters={[
        {
          name: "scrollStateInterval",
          type: "number",
          optional: true,
        },
        {
          name: "scrollCallbackInterval",
          type: "number",
          optional: true,
        },
      ]}
    ></FunctionLayout>
  );
};

export default useScrollStatePage;
