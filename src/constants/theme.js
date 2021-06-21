import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
      primary :{
        main: '#3a9198',
        contrastText: '#fff'
      },
      secondary: {
        light: '#b22028',
        main: '#b22028',
      },
      text: {
        primary: '#323232',
      },
      gray: {
        light: '#CCC3C3',
        main: '#CCC3C3'
      } 
    },
    typography: {
      
      useNextVariants: true,
      fontFamily: [
        "Calibri",
        'Poppins',
        "Candara",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Optima",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h1: {
        fontSize: '36px'
      }
    },
  
    overrides: {
      MuiButton: {
        root:{
          fontFamily: 'Poppins'
        }
      },
      MuiInputBase:{
        input: {
          padding: "14.5px 14px"
        },
      },
      MuiOutlinedInput: {
        // Name of the rule
        root: {
          borderRadius: '5px',
          color: '#323232',
          background: 'white',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2);',
          '&$error': {
            border: '1px solid red',
            color: 'red'
          }
        },
      },
    },
  });
