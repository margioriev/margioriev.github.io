import { useEffect } from "react";
import "./style.css";
import { useColorMode } from "@chakra-ui/react";

export const ContentBoard = (props: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode()
  useEffect(() => {

    require('./crystallize_v3.js');
    require('./crystallize_v3_a4.js');

    require('./crystallize_v4.js');
    require('./crystallize_v4_a2.js');

  }, []);
  return (
    <div className='feed'>
      <div className='content-board'>{props.children}</div>
    </div>
  );
};
