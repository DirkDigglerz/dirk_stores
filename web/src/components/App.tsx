import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import "./App.css";
import { Notifications } from '@mantine/notifications';

import { MantineProvider } from '@mantine/core';
import theme from '../theme';
import { useSettings } from '../providers/settings/settings';
import StoreUI from './Main/main';
import '@mantine/notifications/styles.css';
import { LocalesProvider } from '../providers/locales/locales';
import { StoreProvider } from '../providers/store/provider';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const settings = useSettings();
  // Ensure the theme is updated when the settings change
  useEffect(() => {
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: settings.customTheme
      },
    };
    
    setCurTheme(updatedTheme);

    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: settings.primaryColor,
      primaryShade: settings.primaryShade,
    });

  }, [settings]);

  return (
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <LocalesProvider>
        <StoreProvider>
            <Notifications />
            <StoreUI />
        </StoreProvider>
      </LocalesProvider>
    </MantineProvider>
  );
};

export default App;
