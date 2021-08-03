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
      <Typography variant="h4" style={{ marginRight: '20px' }}>
        VaxData
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          className="date-picker"
          variant="inline"
          format="MM/dd/yyyy"
          label="Pick date to examine"
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
