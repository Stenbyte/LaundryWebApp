import { Machine, MachineNameEnum, MachineStatusEnum } from './../constants';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Machine = {
    _id: '',
    name: MachineNameEnum.washing,
    status: MachineStatusEnum.available,
    buildingId: ''
}

const machineSelectSlice = createSlice({
    name: 'selectMachine',
    initialState,
    reducers: {
        setMachine: (state, action: PayloadAction<{ _id: string }>) => {
            state._id = action.payload._id;
        }
    }
})

export const { setMachine } = machineSelectSlice.actions;
export default machineSelectSlice.reducer;