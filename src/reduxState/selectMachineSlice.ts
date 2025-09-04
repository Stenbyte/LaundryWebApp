import { Machine, MachineNameEnum } from './../constants';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<Machine[]> = []

const machineSelectSlice = createSlice({
    name: 'selectMachine',
    initialState,
    reducers: {
        setMachine: (state, action: PayloadAction<Machine>) => {
            const exists = state.some((m) => m?.name === MachineNameEnum.washing);
            console.log(exists, 'exists')
            if (!exists) {
                state.push(action.payload);
            }
        }
    }
})

export const { setMachine } = machineSelectSlice.actions;
export default machineSelectSlice.reducer;