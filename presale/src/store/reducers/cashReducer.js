import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//createCashDetails
export const createCashDetails = createAsyncThunk(
    'cash/createCashDetails',
    async(info,{rejectWithValue, fulfillWithValue}) => {
 
        try { 
            const {data} = await api.post('/cash/create-cash',info,{withCredentials: true}) 
      
            return fulfillWithValue(data)
        } catch (error) {
         
            return rejectWithValue(error.response.data)
        }
    }
)
//end method 
export const update_cash = createAsyncThunk(
    'cash/update_cash',
    async({ id, formData },{rejectWithValue, fulfillWithValue}) => {
        //console.log(id)
        try { 
            const {data} = await api.put(`/cash/update-cash-details/${id}`,formData,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 
export const delete_cash = createAsyncThunk(
    'cash/delete_cash',
    async(id,{rejectWithValue, fulfillWithValue}) => {
       
        try { 
            const {data} = await api.delete(`/cash/delete-cash-detail/${id}`,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
//end method
export const get_all_cash = createAsyncThunk(
    'cash/get_all_cash',
    async(_,{rejectWithValue, fulfillWithValue}) => {
         //console.log(`this was called?`)
        try { 
            const {data} = await api.get(`/cash/get-all-cash`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
//end method 
export const get_cash = createAsyncThunk(
    'cash/get_cash',
    async(id,{rejectWithValue, fulfillWithValue}) => {
        
        try { 
            const {data} = await api.get(`/cash/get-cash/${id}`,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)




export const cashReducer = createSlice({
    name:"cash",
    initialState:{
        loader:false,
        errorMessage : '',
        successMessage: '',
        cashes:[],
        cash:''

    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
       
 
    },
    extraReducers: (builder) => {
       builder
            .addCase(createCashDetails.pending, (state, { payload }) => {
                  state.loader = true;
              })
              .addCase(createCashDetails.rejected, (state, { payload }) => {
                  state.loader = false;
                  state.errorMessage = payload.error;
              })
              .addCase(createCashDetails.fulfilled, (state, { payload }) => {
                  state.loader = false;
                  state.cashes = payload.cashDetails
                  state.successMessage = payload.message;
              })
              //get_all_coins
              .addCase(get_all_cash.fulfilled, (state, { payload }) => {
                state.cashes =payload.cashDetails
            })
            .addCase(get_cash.fulfilled, (state, { payload }) => {
                state.cash =payload.cash
            })
            // //update session
            .addCase(update_cash.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(update_cash.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(update_cash.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
             // //delete_coin session
             .addCase(delete_cash.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(delete_cash.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(delete_cash.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
       
     

    }
})

export const {messageClear,setCurrency} = cashReducer.actions
export default cashReducer.reducer