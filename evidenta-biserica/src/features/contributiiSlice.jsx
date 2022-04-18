import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  lista: [{
    id: 1,
    receiptNumber: "100",
    name: "Cornel",
    surname: "Puscas",
    amount: "200 €",
    date: "12-01-2019",
    type: "Donatie",
  }, {
    id: 2,
    receiptNumber: "101",
    name: "Viorel",
    surname: "Muntean",
    amount: " 50 €",
    date:  "01-02-2022",
    type: "Zeciulala",
  }, {
    id: 3,
    receiptNumber: "102",
    name: "Ionel",
    surname: "Cora",
    amount: "100 $",
    date: "24-08-2021",
    type: "Donatie",
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