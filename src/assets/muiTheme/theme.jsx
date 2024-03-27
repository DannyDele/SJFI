// theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.All-buttons': {
            // Your global styles for the Button component
            backgroundColor: '#F6B5BB',
            color: 'black',
            // Add any other styles you need
          },
        },
      },
    },
  },
});

export default theme;
