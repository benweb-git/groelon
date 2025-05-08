
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";


// End Method 

export const client_register = createAsyncThunk(
    'userAuth/client_register',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/client/client-register',info)
            localStorage.setItem('userToken',data.token)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)
//end method

export const client_login = createAsyncThunk(
    'userAuth/client_login',
    async(info, { rejectWithValue,fulfillWithValue }) => {
       
        try {
            const {data} = await api.post('/client/client-login',info)
            localStorage.setItem('userToken',data.token)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)


//end method
export const logout = createAsyncThunk(
    'userAuth/logout',
    async({navigate,role},{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get('/client/logout', {withCredentials: true}) 
            localStorage.removeItem('userToken') 
            if (role === 'client') {
                navigate('/')
            } else {
                navigate('/login')
            }
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//get_client_Details
//deleteclient
export const delete_client = createAsyncThunk(
    'userAuth/delete_client',
    async(id, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/client/delete-client/${id}`)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)
//end method
export const update_client_info = createAsyncThunk(
    'userAuth/update_client_info',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.put(`/client/update-client`,info,{withCredentials: true}) 
            //console.log(data)
            return fulfillWithValue(data)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//end method
export const get_client = createAsyncThunk(
    'userAuth/get_client',
    async(userId,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/client/get-client/${userId}`, {withCredentials: true}) 
            //console.log(data)
            return fulfillWithValue(data)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//end method
export const get_all_clients = createAsyncThunk(
    'userAuth/get_all_clients',
    async(role,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/client/get-all-client/${role}`, {withCredentials: true}) 
            //console.log(data)
            return fulfillWithValue(data)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

//get_all_client

//end method
const decodeToken = (token) => {
    if (token) {
        const clientInfo = jwtDecode(token)
        return clientInfo
    } else {
        return ''
    }
}


export const userAuthReducer = createSlice({
    name: 'userAuth',
    initialState:{
        loader : false,
        clientInfo:decodeToken(localStorage.getItem("userToken")),
        errorMessage : '',
        successMessage: '',
        allClient:[] ,
        userInfo:''
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
 
    },
    extraReducers: (builder) => {
        builder
        //customer register
        .addCase(client_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(client_register.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
        })
        .addCase(client_register.fulfilled, (state, { payload }) => {
            const clientInfo = decodeToken(payload.token)
            state.successMessage = payload.message;
            state.loader = false;
            state.clientInfo = clientInfo
        })
        //customer login 
        //get_client_Details
        .addCase(client_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(client_login.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
        })
        .addCase(client_login.fulfilled, (state, { payload }) => {
            const clientInfo = decodeToken(payload.token)
            state.successMessage = payload.message;
            state.loader = false;
            state.clientInfo = clientInfo
            if(clientInfo==='superclient'){
                state.allClient=payload.getall;
            }
        })
        //get_client_Details
        // .addCase(get_client_Details.rejected, (state, { payload }) => {
        //     state.errorMessage = payload.error;
        // })
        // .addCase(get_client_Details.fulfilled, (state, { payload }) => {
        //     state.clientInfo = payload.clientInfo
        // })
        //end mothod
        .addCase(delete_client.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(delete_client.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(delete_client.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.allClient = state.allClient.filter((s)=>s._id !== payload.deletedUser._id) 
            state.successMessage = payload.message;
        })
        //get_all_client
        .addCase(get_all_clients.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_all_clients.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(get_all_clients.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.allClient = payload.getall
            state.successMessage = payload.message;
        })
        //get_client
        .addCase(get_client.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
        })
        //update_client_info
        .addCase(update_client_info.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(update_client_info.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(update_client_info.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
        })

        
       
    }
})
export const {messageClear,user_reset} = userAuthReducer.actions
export default userAuthReducer.reducer
