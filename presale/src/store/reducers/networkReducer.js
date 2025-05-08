import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const create_network = createAsyncThunk(
    'network/create_network',
    async({ networkId, formData },{rejectWithValue, fulfillWithValue}) => {

        try { 
            const {data} = await api.post(`/network/create-network/${networkId}`,formData,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 



// End Method 

export const delete_network = createAsyncThunk(
    'network/delete_network',
    async({ id, networkName },{rejectWithValue, fulfillWithValue}) => {
        try { 
            const {data} = await api.delete(`/network/delete-network-detail/${networkName}/${id}`,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 
//get_all_networks

export const get_all_networks = createAsyncThunk(
    'network/get_all_networks',
    async(_,{rejectWithValue, fulfillWithValue}) => {

        try { 
            const {data} = await api.get(`/network/get-all-networks`) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// End Method

export const get_network = createAsyncThunk(
    'network/get_network',
    async(id,{rejectWithValue, fulfillWithValue}) => {

        try { 
            const {data} = await api.get(`/network/get-network/${id}`,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)





export const networkReducer = createSlice({
    name:"network",
    initialState:{
        loader:false,
        errorMessage : '',
        successMessage: '',
        networks:[],

    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
       
 
    },
    extraReducers: (builder) => {
       builder
            .addCase(create_network.pending, (state, { payload }) => {
                  state.loader = true;
              })
              .addCase(create_network.rejected, (state, { payload }) => {
                  state.loader = false;
                  state.errorMessage = payload.error;
              })
              .addCase(create_network.fulfilled, (state, { payload }) => {
                  state.loader = false;
                  state.successMessage = payload.message;
              })
              //get_all_coins
              .addCase(get_all_networks.fulfilled, (state, { payload }) => {
                state.networks =payload.networks
            })
             // //delete_coin session
             .addCase(delete_network.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(delete_network.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(delete_network.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
       
     

    }
})

export const {messageClear,setCurrency} = networkReducer.actions
export default networkReducer.reducer