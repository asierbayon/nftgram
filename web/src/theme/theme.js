import { createMuiTheme } from "@material-ui/core";
import componentsOverride from "./overrides";

const theme = createMuiTheme({
  typography: {
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    }
  }
});

theme.components = componentsOverride(theme);

export default theme;