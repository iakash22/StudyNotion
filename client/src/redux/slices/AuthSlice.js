import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signupData : null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null,
}

export const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setSignupData(state,value){
            state.signupData = value.payload;
        },
        setToken(state, value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
    }
});

export const {setToken,setSignupData,setLoading} = AuthSlice.actions;
export default AuthSlice.reducer;