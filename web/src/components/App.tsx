import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import "./App.css";

import { MantineProvider } from '@mantine/core';
import theme from '../theme';
import { useSettings } from '../providers/settings/settings';
import StoreUI from './Main/main';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const settings = useSettings();
  // Ensure the theme is updated when the settings change
  useEffect(() => {
    const cloned = { ...curTheme };
    cloned.primaryColor = settings.primaryColor;
    cloned.primaryShade = settings.primaryShade;
    setCurTheme(cloned);
  }, [settings]);

  return (
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <StoreUI />
    </MantineProvider>
  );
};

export default App;
