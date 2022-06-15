import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from "../logo.webp";

function Navbar(): JSX.Element {
  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <img width={50} src={logo} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Metawar
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
