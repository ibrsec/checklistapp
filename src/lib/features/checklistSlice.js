
 
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  checklist: [],
  allDayCheckList:[],
  loading: false,
  error: false,
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    fethStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFailEnd: (state) => {
      state.loading = false;
      state.error = true;
    },
    successgetDatas:(state,{payload}) => {
        state.loading = false; 
        state.checklist = payload;
    },
    successgetAllDaysDatas:(state,{payload}) => {
        state.loading = false; 
        state.allDayCheckList = payload;
    },
    successNOdata : (state)=>{
        state.loading = false;
        state.checklist =[];
    }
  },
});

export const {fethStart, fetchFailEnd, successgetDatas, successgetAllDaysDatas, successNOdata, } = checklistSlice.actions;
export default checklistSlice.reducer;
