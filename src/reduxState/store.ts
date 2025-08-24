import { configureStore } from '@reduxjs/toolkit'
import selectMachineReducer from './selectMachineSlice';
import { useDispatch, useSelector } from 'react-redux';


export const store = configureStore({
    reducer: {
        selectMachine: selectMachineReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()