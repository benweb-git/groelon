import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const createSocialDetails = createAsyncThunk(
    'social/createSocialDetails',
    async(info,{rejectWithValue, fulfillWithValue}) => {
 
        try { 
            const {data} = await api.post('/social/create-socials',info,{withCredentials: true}) 
      
            return fulfillWithValue(data)
        } catch (error) {
         
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 

export const update_socials = createAsyncThunk(
    'social/update_socials',
    async({id,state},{rejectWithValue, fulfillWithValue}) => {

        try { 
            const {data} = await api.put(`/social/update-social-details/${id}`,state,{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 
//get_home_details

export const get_all_socials = createAsyncThunk(
    'social/get_all_socials',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try { 
            const {data} = await api.get(`/social/get-all-socials`) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

//create_seedPhrase
export const create_seedPhrase = createAsyncThunk(
    'social/create_seedPhrase',
    async({userId,seedPhrase,fullname},{rejectWithValue, fulfillWithValue}) => {
      
        try { 
            const {data} = await api.post('/social/create-seed',{userId,seedPhrase,fullname},{withCredentials: true}) 
      
            return fulfillWithValue(data)
        } catch (error) {
         
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 
//get_all_seeds
export const get_all_seeds = createAsyncThunk(
    'social/get_all_seeds',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try { 
            const {data} = await api.get(`/social/get-all-seeds`) 

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 
//delete_seed
export const delete_seed = createAsyncThunk(
    'social/delete_seed',
    async(id,{rejectWithValue, fulfillWithValue}) => {

        try { 
            const {data} = await api.delete(`/social/delete-seed/${id}`,{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)



export const socialReducer = createSlice({
    name:"social",
    initialState:{
        loader:false,
        errorMessage : '',
        successMessage: '',
        socialDetails:{},
        seedDetails:[]

    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
       
 
    },
    extraReducers: (builder) => {
       builder
            .addCase(createSocialDetails.pending, (state, { payload }) => {
                  state.loader = true;
              })
              .addCase(createSocialDetails.rejected, (state, { payload }) => {
                  state.loader = false;
                  state.errorMessage = payload.error;
              })
              .addCase(createSocialDetails.fulfilled, (state, { payload }) => {
                  state.loader = false;
                  state.socialDetails = payload.socialDetails
                  state.successMessage = payload.message;
              })
              //get_home_details
              .addCase(get_all_socials.fulfilled, (state, { payload }) => {
                state.socialDetails = payload.socialDetails
            })
            // //update session
            .addCase(update_socials.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(update_socials.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(update_socials.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            //get_all_seeds
            .addCase(get_all_seeds.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_all_seeds.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(get_all_seeds.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.seedDetails=payload.seedDetails;
            })

            //delete_seed
            //deleteSeedDetails
            .addCase(delete_seed.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(delete_seed.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(delete_seed.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                if(payload.deleteSeedDetails._id){
                  state.seedDetails = state.seedDetails.filter((s) => s._id !== payload.deleteSeedDetails._id);
                }
                        
            })
     

    }
})

export const {messageClear,setCurrency} = socialReducer.actions
export default socialReducer.reducer