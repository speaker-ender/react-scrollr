import type { NextPage } from "next";
import DescriptionLayout from "../../components/layouts/documentation/description.layout";

const ScrollContextProviderPage: NextPage = () => {
  return (
    <DescriptionLayout
      componentName="ScrollContextProvider"
      description={[
        "This component is used for handling the scroll state of the window.",
        "You can use the hook, useScrollContext to register scroll callbacks whenever the scroll state changes.",
      ]}
      parameters={[]}
    ></DescriptionLayout>
  );
};

export default ScrollContextProviderPage;
