import { BackgroundImage, MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import React, { useEffect, useState } from "react";

import { localeStore } from '../stores/locales';
import { useSettings } from '../stores/settings';
import theme from '../theme';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import StoreUI from './Store/main';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const primaryColor = useSettings((data) => data.primaryColor);
  const primaryShade = useSettings((data) => data.primaryShade);
  const customTheme = useSettings((data) => data.customTheme);
  const game = useSettings((data) => data.game);
  useEffect(() => {
    const fontFamily =
      game === 'rdr3' ? '"Red Dead", sans-serif' :
      game === 'fivem' ? '"Akrobat Regular", sans-serif' :
      'sans-serif';

    document.body.style.fontFamily = fontFamily;
    document.body.classList.toggle('game-rdr3', game === 'rdr3');

  }, [game]);
  
  const fetchSettings = useSettings((state) => state.fetchSettings);
  const fetchLocales  = localeStore((state) => state.fetchLocales);
  // Ensure the theme is updated when the settings change

  useEffect(() => {
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: customTheme
      },
    };
    
    setCurTheme(updatedTheme);
    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: primaryColor,
      primaryShade: primaryShade,
    });
  }, [primaryColor, primaryShade, customTheme]);



  useEffect(() => {
    fetchSettings();
    fetchLocales();
  }, [fetchSettings, fetchLocales]);

  return (
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Wrapper>
        <StoreUI />
  
      </Wrapper>
    </MantineProvider>
  );
};



function Wrapper({ children }: { children: React.ReactNode }) {
  const game = useSettings((state) => state.game);
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' mah='100vh' mih='100vh' style={{overflow:'hidden'}}
      src={
        game === 'fivem' ?
        "https://i.ytimg.com/vi/TOxuNbXrO28/maxresdefault.jpg"
        : "https://raw.githubusercontent.com/Jump-On-Studios/RedM-jo_libs/refs/heads/main/source-repositories/Menu/public/assets/images/background_dev.jpg"
      }
    >  
      {children}
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}

export default App;
