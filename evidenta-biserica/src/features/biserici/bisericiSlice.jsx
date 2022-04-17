import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  lista: [{
    id: 1,
    name: "Betel",
    adress: "Cluj",
  }, {
    id: 2,
    name: "EbenEzer",
    adress: "Castellon",
  }
  ],
};

export const bisericiSlice = createSlice({
  name: 'biserici',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { add } = bisericiSlice.actions;

export default bisericiSlice.reducer;
