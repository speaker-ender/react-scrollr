import { Header4, Paragraph } from "../../global/typography";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useScrollContext } from "@speaker-ender/react-scrollr";

interface IScrollInfo {}

const ScrollInfo: React.FC<IScrollInfo> = (props) => {
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const { registerScrollCallback, unregisterScrollCallback } =
    useScrollContext();

  const updateCurrentScroll = useCallback(
    (currentScroll?: number, lastScroll?: number) => {
      setCurrentScroll(!!currentScroll ? currentScroll : 0);
    },
    [setCurrentScroll]
  );

  useEffect(() => {
    !!registerScrollCallback && registerScrollCallback(updateCurrentScroll);

    return () => {
      unregisterScrollCallback && unregisterScrollCallback(updateCurrentScroll);
    };
  }, []);

  return (
    <div>
      <Header4>Scroll Info</Header4>
      <Paragraph>Scroll Position: {currentScroll.toPrecision(10)}px</Paragraph>
    </div>
  );
};

export default ScrollInfo;
