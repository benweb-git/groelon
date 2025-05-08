import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 


// End Method 

// End Method 

//get_all_participants

//update_participant

//create transaction
export const trasaction_Confirm = createAsyncThunk(
    'participant/trasaction_Confirm',
    async(stateInfo,{rejectWithValue, fulfillWithValue}) => {
        try { 
            const {data} = await api.post('/participant/trasaction-Confirm',stateInfo,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

//get_all_user_transactions
export const get_all_user_transactions = createAsyncThunk(
    'participant/get_all_user_transactions',
    async(userId, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/participant/get-user-transactions/${userId}`,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)
///delete transaction

export const delete_transaction = createAsyncThunk(
    'participant/delete_transaction',
    async(id, { rejectWithValue,fulfillWithValue }) => {
  
        try {
            const {data} = await api.delete(`/participant/delete-transactions/${id}`) 

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

//update transaction
export const update_transaction = createAsyncThunk(
    'participant/update_transaction',
    async({id,confirmationStatus}, { rejectWithValue,fulfillWithValue }) => {

        try {
            const {data} = await api.put(`/participant/update-transaction/${id}/${confirmationStatus}`,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//get all transactions
export const get_all_transactions = createAsyncThunk(
    'participant/get_all_transactions',
    async(_, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/participant/get-transactions`,{withCredentials: true}) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)
 


export const participantReducer = createSlice({
    name: 'participant',
    initialState:{
        errorMessage : '',
        successMessage: '', 
        trasaction:'',
        transactions:[],
        allTransactions:[],
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
            //
            .addCase(trasaction_Confirm.pending, (state, { payload }) => {
                            state.loader = true;
                        })
            .addCase(trasaction_Confirm.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })

            .addCase(trasaction_Confirm.fulfilled, (state, { payload }) => { 
                state.loader = false;
                state.successMessage = payload.success
            })
            //
            //end method
            .addCase(get_all_transactions.pending, (state, { payload }) => {
                state.loader = true;
                        })
            .addCase(get_all_transactions.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })

            .addCase(get_all_transactions.fulfilled, (state, { payload }) => { 
                state.loader = false;
                state.successMessage = payload.success
                state.allTransactions=payload.allTransactions
            })
             //end method
            .addCase(delete_transaction.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })

            .addCase(delete_transaction.fulfilled, (state, { payload }) => { 
                state.loader = false;
                state.successMessage = payload.success
            })
            //update transaction
            .addCase(update_transaction.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })

            .addCase(update_transaction.fulfilled, (state, { payload }) => { 
                state.loader = false;
                state.successMessage = payload.success
            })
            //get_all_user_transactions
            .addCase(get_all_user_transactions.fulfilled, (state, { payload }) => { 
                state.loader = false;
                state.successMessage = payload.success
                state.transactions=payload.transactions
            })


        
    }
})
export const {messageClear} = participantReducer.actions
export default participantReducer.reducer