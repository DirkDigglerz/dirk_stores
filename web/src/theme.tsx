import { createTheme } from "@mantine/core";
import { useSettings } from "./stores/settings";

const theme = createTheme({
  primaryColor: "red",
  primaryShade: 9,
  defaultRadius: "xxs",
  fontFamily: "Red Dead, sans-serif",

  radius:{
    xxs: '0.3vh',
    xs: '0.4vh',
    sm: '0.75vh',
    md: '1vh',
    lg: '1.5vh',
    xl: '2vh',
    xxl: '3vh',
  },

  fontSizes: {
    xxs: '1.2vh',
    xs: '1.5vh',
    sm: '1.8vh',
    md: '2.2vh',
    lg: '2.8vh',
    xl: '3.3vh',
    xxl: '3.8vh',
  },

  spacing:{
    xxs: '0.5vh',
    xs: '0.75vh',
    sm: '1.5vh',
    md: '2vh',
    lg: '3vh',
    xl: '4vh',
    xxl: '5vh',
  },

  components:{
    Progress:{
      styles:{
        root:{
          backgroundColor: 'rgba(77, 77, 77, 0.4)',
        },
        
      }
    },

    Select:{
      styles:{
        dropdown:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        input:{
          padding: 'var(--mantine-spacing-sm)',
        },
        item:{
          
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        wrapper:{
          
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        option:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },

      }
    },
    MultiSelect:{
      styles:{
        dropdown:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        pill:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        item:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        wrapper:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        option:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },

      }
    },

    Notifications:{
      styles:{
        notification:{
          backgroundColor: 'rgba(77, 77, 77, 0.4)',
          ...(useSettings.getState().game === "rdr3" ? 
            {
                WebkitMaskImage: "url(https://raw.githubusercontent.com/Jump-On-Studios/RedM-jo_libs/af7545b6840972aa403287280346bbd1b8c443aa/source-repositories/Menu/public/assets/images/background.png)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                WebkitMaskComposite: "source-in",
            } : {}),
        }
      }
    },

    TextInput:{
      styles:{
        section:{
          marginRight: '0.2vh',
        },

        input:{
          padding: 'var(--mantine-spacing-sm)',
        },

       
        
      }
    },
  },

  colors: {
    dark:[
      "#ffffff",
      "#e2e2e2",
      "#c6c6c6",
      "#aaaaaa",
      "#8d8d8d",
      "#717171",
      "#555555",
      "#393939",
      "#1c1c1c",
      "#000000",
    ],
    dirk:[
      "#ffffff",
      "#f3fce9",
      "#dbf5bd",
      "#c3ee91",
      "#ace765",
      "#94e039",
      "#7ac61f",
      "#5f9a18",
      "#29420a",
      "#446e11",
    ],
  },
});


export default theme;