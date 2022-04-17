import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    lista: [{
        id: 1,
        name: "Viorica",
        surname: "Glodan",
        adress: "Castellon de la Plana",
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
            state.lista.push(action.payload)
        },
        edit: (state, action) => {
            state.lista = state.lista.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        }
    },
});
export const { add, edit } = persoaneSlice.actions;

export default persoaneSlice.reducer;
