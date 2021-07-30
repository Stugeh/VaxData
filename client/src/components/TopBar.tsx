import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

const TopBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default TopBar;
