import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import { create } from "zustand";


type localeType = (key: string, ...args: string[]) => string;

type LocalesProps = {
  [key: string]: string;
}


type LocaleStoreProps = {
  locale: localeType;
  fetchLocales: () => void;
  locales: LocalesProps;
};

export const localeStore = create<LocaleStoreProps>((set, get) => {
  return {
    locales: {},
    locale: (key: string, ...args: (string|number)[]): string => {
      
      let translation = get().locales[key] || key;
      if (args.length) {
        // convert the arg to a string and replace the %s in the translation
  

        translation = translation.replace(/%s/g, () => String(args.shift() || ''));
      }
      return translation;
    },
    fetchLocales: () => {
      if (!isEnvBrowser()) {
        fetchNui<LocalesProps>('GET_LOCALES')
          .then((data) => {
            set({ locales: data });
          })
          .catch((error) => {
            console.error('Failed to fetch locales:', error);
          });
      }
    },
  };
});

// export locale as a standalone function 
export const locale = localeStore.getState().locale;