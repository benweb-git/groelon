
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";


// End Method 

export const admin_register = createAsyncThunk(
    'auth/admin_register',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/admin/admin-register',info)
            localStorage.setItem('accessToken',data.token)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)
//end method

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/admin/admin-login',info)
            localStorage.setItem('accessToken',data.token)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)


//end method
export const logout = createAsyncThunk(
    'auth/logout',
    async({navigate,role},{rejectWithValue, fulfillWithValue}) => {
       
        try {
            const {data} = await api.get('/logout', {withCredentials: true}) 
            localStorage.removeItem('accessToken') 
            if (role === 'admin') {
                navigate('/')
            } else {
                navigate('/')
            }
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//get_Admin_Details
//deleteAdmin
export const delete_admin = createAsyncThunk(
    'auth/delete_admin',
    async(id, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/admin/delete-admin/${id}`)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)
export const get_all_admin = createAsyncThunk(
    'auth/get_all_admin',
    async(role, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/admin/get-all-admin/${role}`)
            return fulfillWithValue(data)
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)

//get_all_admin

//end method
const decodeToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token)
        return userInfo
    } else {
        return ''
    }
}


export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        loader : false,
        userInfo:decodeToken(localStorage.getItem("accessToken")),
        errorMessage : '',
        successMessage: '',
        allAdmin:[] 
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
        .addCase(admin_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_register.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
        })
        .addCase(admin_register.fulfilled, (state, { payload }) => {
            //const userInfo = decodeToken(payload.token)
            state.successMessage = payload.message;
            state.allAdmin=payload.getall;
            state.loader = false;
            
            
        })
        //customer login 
        //get_Admin_Details
        .addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_login.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
        })
        .addCase(admin_login.fulfilled, (state, { payload }) => {
            const userInfo = decodeToken(payload.token)
            state.successMessage = payload.message;
            state.loader = false;
            state.userInfo = userInfo
            if(userInfo.role==='superAdmin'){
                state.allAdmin=payload.getall;
            }
        })
      
        //end mothod
        .addCase(delete_admin.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(delete_admin.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(delete_admin.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.allAdmin = payload.getall
            state.successMessage = payload.message;
        })
        //get_all_admin
        .addCase(get_all_admin.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_all_admin.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(get_all_admin.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.allAdmin = payload.getall
            state.successMessage = payload.message;
        })

        
       
    }
})
export const {messageClear,user_reset} = authReducer.actions
export default authReducer.reducer
