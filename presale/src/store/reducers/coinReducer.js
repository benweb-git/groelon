import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const createCoinDetails = createAsyncThunk(
    'coin/createCoinDetails',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        //console.log(info)
        try { 
            const {data} = await api.post('/coin/create-coins',info,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 

export const update_coin = createAsyncThunk(
    'coin/update_coin',
    async({ id, formData },{rejectWithValue, fulfillWithValue}) => {
        //console.log(id)
        try { 
            const {data} = await api.put(`/coin/update-coin-details/${id}`,formData,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 

export const delete_coin = createAsyncThunk(
    'coin/delete_coin',
    async(id,{rejectWithValue, fulfillWithValue}) => {
       // console.log("id to be deleted in reducer",id)
        try { 
            const {data} = await api.delete(`/coin/delete-coin-detail/${id}`,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 


export const get_all_coins = createAsyncThunk(
    'coin/get_all_coins',
    async(_,{rejectWithValue, fulfillWithValue}) => {
         //console.log(`this was called?`)
        try { 
            const {data} = await api.get(`/coin/get-all-coins`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method

export const get_coin = createAsyncThunk(
    'coin/get_coin',
    async(id,{rejectWithValue, fulfillWithValue}) => {
        try { 
            const {data} = await api.get(`/coin/get-coin/${id}`,{withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)





export const coinReducer = createSlice({
    name:"coin",
    initialState:{
        loader:false,
        errorMessage : '',
        successMessage: '',
        coins:[],
        coin:''

    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
       
 
    },
    extraReducers: (builder) => {
       builder
            .addCase(createCoinDetails.pending, (state, { payload }) => {
                  state.loader = true;
              })
              .addCase(createCoinDetails.rejected, (state, { payload }) => {
                  state.loader = false;
                  state.errorMessage = payload.error;
              })
              .addCase(createCoinDetails.fulfilled, (state, { payload }) => {
                  state.loader = false;
                  state.coins = payload.coinDetails
                  state.successMessage = payload.message;
              })
              //get_all_coins
              .addCase(get_all_coins.fulfilled, (state, { payload }) => {
                state.coins =payload.coinDetails
            })
            .addCase(get_coin.fulfilled, (state, { payload }) => {
                state.coin =payload.coin
            })
            // //update session
            .addCase(update_coin.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(update_coin.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(update_coin.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
             // //delete_coin session
             .addCase(delete_coin.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(delete_coin.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(delete_coin.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
       
     

    }
})

export const {messageClear,setCurrency} = coinReducer.actions
export default coinReducer.reducer