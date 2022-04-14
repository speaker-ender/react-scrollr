import type { NextPage } from "next";
import { StyledPage } from "../../global/page.styles";
import { Header2 } from "../../global/typography";
import ElementInView from "../../components/inView/elementInView";

const ElementInViewPage: NextPage = () => {
  return (
    <StyledPage>
      <Header2>In View Animations</Header2>
      <ElementInView />
    </StyledPage>
  );
};

export default ElementInViewPage;
