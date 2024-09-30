import { MantineColor, MantineColorShade, MantineColorsTuple } from "@mantine/core";

export type SettingsProps = {
  primaryColor: MantineColor;
  primaryShade: MantineColorShade;
  customTheme: MantineColorsTuple;
  currency: string;
  item_img_path: string;

  // Add more settings here
};
