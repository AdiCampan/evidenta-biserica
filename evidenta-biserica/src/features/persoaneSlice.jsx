import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    lista: [{
        id: 1,
        name: "Noelia",
        surname: "Campan",
        adress: "Onda",
    }, {
        id: 2,
        name: "Ioan",
        surname: "Miclea",
        adress: "Valencia",
    }],
};
export const persoaneSlice = createSlice({
    name: 'persoane',
    initialState,
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
        },
    },
});

export const { add } = persoaneSlice.actions;

export default persoaneSlice.reducer;
