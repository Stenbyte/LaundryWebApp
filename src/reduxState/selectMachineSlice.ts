import { Machine } from './../constants';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<Machine[]> = []

const machineSelectSlice = createSlice({
    name: 'selectMachine',
    initialState,
    reducers: {
        setMachine: (state, action: PayloadAction<Machine>) => {
            const incomingMachine = action.payload;

            const alreadyExists = state.some((m) => m?.name === incomingMachine.name);
            if (!alreadyExists) {
                state.push(incomingMachine)
            }
        },
        autoSelectMachines: (state, action: PayloadAction<Machine[]>) => {
            action.payload.forEach((newMachine) => {
                const alreadyExists = state.some((m) => m?._id === newMachine._id);
                if (!alreadyExists) {
                    state.push(newMachine);
                }
            });
        }
    }
})


export const { setMachine, autoSelectMachines } = machineSelectSlice.actions;
export default machineSelectSlice.reducer;