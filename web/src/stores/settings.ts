import { MantineColor, MantineColorShade, MantineColorsTuple } from "@mantine/core";
import { create } from "zustand";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";


export type SettingsProps = {
  game: 'rdr3' | 'fivem';
  primaryColor: MantineColor;
  primaryShade: MantineColorShade;
  customTheme: MantineColorsTuple;
  background: 'themed' | 'dark' | 'transparent';
  itemImgPath: string;
  fetchSettings: () => void;
  // Add more settings here
  currency: string; // Currency setting
};

export const useSettings = create<SettingsProps>((set) => ({
  game: 'rdr3', // Default game setting
  primaryColor: 'red', // Default primary color
  primaryShade: 9,
  customTheme: [
    "#fff7e4",
    "#f7edd4",
    "#ebd9ad",
    "#dfc483",
    "#d5b25f",
    "#cfa748",
    "#cca13b",
    "#b48c2c",
    "#a17c23",
    "#8b6b16"
  ],
  background: 'themed', // Default background setting
  itemImgPath: 'nui://dirk_inventory/web/images',
  currency: '$', // Default currency setting

  fetchSettings: () => {
    if (!isEnvBrowser()) {
      fetchNui<Partial<SettingsProps>>('GET_SETTINGS')
        .then((data) => {
          set((prev) => ({
            ...prev,
            ...data, 
          }));
        }) 
        .catch((error) => {
          console.error('Failed to fetch settings:', error);
        });
    }
  },
}));

// setInterval(() => {
//   if (isEnvBrowser()) {
//     useSettings.setState((state) => ({
//       game: state.game === 'rdr3' ? 'fivem' : 'rdr3',
//     }));
//   }
// }, 5000); // Fetch settings every 5 seconds in browser environment