import { Dispatch, SetStateAction } from 'react';
import {
  AppBar, Toolbar, Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TopBar = ({ date, setDate }: {
  date: Date|null, setDate: Dispatch<SetStateAction<Date|null>>
}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h4">
        VaxData
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="date-picker"
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </Toolbar>
  </AppBar>
);

export default TopBar;
