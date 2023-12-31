import "./style.css";
import { Button, ButtonGroup, useColorMode } from "@chakra-ui/react";
import { Switch } from '@chakra-ui/react'
import i18n from "../../../i18n";
import { useEffect } from "react";

export const Topbar = (props: { children?: React.ReactNode, isLightTheme: boolean, setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()

  useEffect(() => {
    const color = props.isLightTheme ? 'light' : 'dark'
    setColorMode(color)
  }, [props.isLightTheme])
  return (

    <div className='global-nav-content'>
      <ButtonGroup gap='1' style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          // colorScheme='yellow'
          onClick={() => {
            i18n.changeLanguage("de");
          }}
        >
          DE
        </Button>
        <Button
          // colorScheme='blue'
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          EN
        </Button>
        <Button
          // colorScheme='red'
          onClick={() => {
            i18n.changeLanguage("es");
          }}
        >
          ES
        </Button>
        <><Switch aria-valuetext={colorMode == 'light' ? 'switch to dark' : 'switch to light'} onChange={
          () => props.setIsLightTheme(!props.isLightTheme)
        } id='toggle-theme' /><label aria-valuetext={colorMode == 'light' ? 'light' : 'dark'} style={{ marginLeft: '0.5rem' }}>{colorMode == 'light' ? '☼' : '☾'}</label></>


      </ButtonGroup>
      {props.children}
    </div>

  );
};
