import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, propNames, useColorMode } from "@chakra-ui/react";
import { Topbar } from "./components/layout/Topbar";
import { ContentBoard } from "./components/layout/ContentBoard";
import { Home } from "./pages/Home";
import { useSearchParams } from "react-router-dom";
import { Boda } from "./pages/Boda";

const App = () => {
  const [isLightTheme, setIsLightTheme] = useState(true)
  const [searchParams] = useSearchParams();
  const card = searchParams.get('card')

  return (card ? <Boda name={card} /> : <>
    <div style={{ height: '0px' }}>
      <div id="canvas-wrapper" style={{ height: '120px' }}><canvas id="canvas" style={{ display: isLightTheme ? 'none' : 'block' }} />
        <canvas id="canvas2" style={{ display: !isLightTheme ? 'none' : 'block' }} /></div></div>
    <ChakraProvider>
      <div className='App'>
        <Topbar isLightTheme={isLightTheme} setIsLightTheme={setIsLightTheme}></Topbar>
        <ContentBoard>
          <Home />
        </ContentBoard>
      </div>

    </ChakraProvider></>
  );
}

export default App;
