import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Topbar } from "./components/layout/Topbar";
import { ContentBoard } from "./components/layout/ContentBoard";
import { Home } from "./pages/Home";

function App() {
  useEffect(() => {
    require('./crystallize_v4.js');
    require('./crystallize_v4_a2.js');
  }, []);


  return (
    <ChakraProvider>
      <div className='App'>
      <Topbar></Topbar>
        <ContentBoard>
    
          <Home />
        </ContentBoard>
      </div>
    </ChakraProvider>
  );
}

export default App;
