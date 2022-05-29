import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useScrollContextPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useScrollContext"
      description={[
        "This hook is used for registering scroll callbacks for use in your components",
      ]}
      parameters={[]}
    ></FunctionLayout>
  );
};

export default useScrollContextPage;
