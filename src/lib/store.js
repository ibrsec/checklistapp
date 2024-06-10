
import { configureStore } from "@reduxjs/toolkit";
import checklistSlice from "./features/checklistSlice";



export const store = configureStore({
    reducer:{
        checklist:checklistSlice,
    }
})
