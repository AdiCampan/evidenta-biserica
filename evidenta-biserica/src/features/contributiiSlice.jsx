import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  lista: [{
    id: 1,
    name: "Cornel",
    surname: "Puscas",
    amount: 200,
    date: 2022,
  }, {
    id: 2,
    name: "Viorel",
    surname: "Muntean",
    amount: 50,
    date:  2022,
  }, {
    id: 3,
    name: "Ionel",
    surname: "Cora",
    amount: 100,
    date: 2021,
  }],
};
export const contributiiSlice = createSlice({
  name: 'contributii',
  initialState,
  reducers: {
    add: (state, action) => {
      state.lista.push(action.payload)
    },
    // edit: (state, action) => {
    //   state.lista = state.lista.map(item => {
    //     if (item.id == action.payload.id) {
    //       return action.payload;
    //     }
    //     return item;
    //   });
    // }
  },
});
export const { add, edit } = contributiiSlice.actions;

export default contributiiSlice.reducer;