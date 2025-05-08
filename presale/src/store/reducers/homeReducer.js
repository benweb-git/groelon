import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const createHomeDetails = createAsyncThunk(
    'home/createHomeDetails',
    async(formData,{rejectWithValue, fulfillWithValue}) => {
       
        try { 
            const {data} = await api.post('/home/create-dome-details',formData,{withCredentials: true}) 
     
            return fulfillWithValue(data)
        } catch (error) {
         
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 

export const updateHomeDetails = createAsyncThunk(
    'home/updateHomeDetails',
    async({ id, formData },{rejectWithValue, fulfillWithValue}) => {
        
        try { 
            const {data} = await api.put(`/home/update-home-details/${id}`,formData,{withCredentials: true}) 
 
            return fulfillWithValue(data)
        } catch (error) {
       
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 
//get_home_details

export const get_home_details = createAsyncThunk(
    'home/get_home_details',
    async(_,{rejectWithValue, fulfillWithValue}) => {
   
        try { 
            const {data} = await api.get(`/home/get-all-details`) 

            return fulfillWithValue(data)
        } catch (error) {
        
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 

export const get_general_home_details = createAsyncThunk(
    'home/get_general_home_details',

    async(_,{rejectWithValue, fulfillWithValue}) => {
        //console.log("i came here")
        try { 
            const {data} = await api.get(`/home/get-all-web-details`) 
         
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)





export const homeReducer = createSlice({
    name:"home",
    initialState:{
        loader:false,
        errorMessage : '',
        successMessage: '',
        homeDetails:{},
        generalhomeDetails:{}

    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
       
 
    },
    extraReducers: (builder) => {
       builder
            .addCase(createHomeDetails.pending, (state, { payload }) => {
                  state.loader = true;
              })
              .addCase(createHomeDetails.rejected, (state, { payload }) => {
                  state.loader = false;
                  state.errorMessage = payload.error;
              })
              .addCase(createHomeDetails.fulfilled, (state, { payload }) => {
                  state.loader = false;
                  state.homeDetails = payload.homeDetails
                  state.successMessage = payload.message;
              })
              //get_home_details
              .addCase(get_home_details.fulfilled, (state, { payload }) => {
                state.homeDetails = payload.homeDetails
            })
            //update session
            .addCase(updateHomeDetails.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(updateHomeDetails.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(updateHomeDetails.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.homeDetails = payload.data
                state.successMessage = payload.message;
            })
            //get_general_home_details
            .addCase(get_general_home_details.fulfilled, (state, { payload }) => {
                state.generalhomeDetails = payload.homeDetails
            })
       
     

    }
})

export const {messageClear,setCurrency} = homeReducer.actions
export default homeReducer.reducer