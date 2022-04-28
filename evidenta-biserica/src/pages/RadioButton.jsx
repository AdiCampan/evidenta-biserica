import React from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRadioGroup } from '@mui/material/RadioGroup';


function RadioButton() {
  return (
    <div>


      <RadioGroup  style={{display: 'flex', flexDirection: 'row', paddingLeft: 14}} name="use-radio-group" defaultValue="first">
        <FormControlLabel value="first" label="Masculin" control={<Radio />} />
        <FormControlLabel value="second" label="Feminin" control={<Radio />} />
      </RadioGroup>


      {/* <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl> */}
    </div>

  )
};
export default RadioButton;