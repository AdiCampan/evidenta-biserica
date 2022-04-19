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
      state.lista.push(action.payload);
    },
    del: (state, action) => {
      state.lista = state.lista.filter(item => item.id != action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, del } = bisericiSlice.actions;

export default bisericiSlice.reducer;
