import { configureStore } from '@reduxjs/toolkit'
import selectMachinesReducer from './selectMachineSlice';
import { useDispatch, useSelector } from 'react-redux';


export const store = configureStore({
    reducer: {
        selectMachines: selectMachinesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()