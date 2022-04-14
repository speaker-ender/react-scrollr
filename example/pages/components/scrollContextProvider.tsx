import type { NextPage } from "next";
import DescriptionLayout from "../../components/layouts/documentation/description.layout";

const ScrollContextProviderPage: NextPage = () => {
  return (
    <DescriptionLayout
      componentName="ScrollContextProvider"
      description={[
        "This component is used for handling the scroll state of the window.",
        "You can use the hook, useScrollContext to get the current scroll position from any child component of ScrollContextProvider.",
        "The default sample rate is 10ms.",
      ]}
      parameters={[
        {
          name: "listenerInterval",
          type: "number",
          optional: true,
        },
        {
          name: "stateInterval",
          type: "number",
          optional: true,
        },
      ]}
    ></DescriptionLayout>
  );
};

export default ScrollContextProviderPage;
