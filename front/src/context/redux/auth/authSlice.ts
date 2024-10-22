import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance";


interface LoggedUser {
    guid: string,
    email: string,
    firstName: string,
    lastName: string,

}

interface AuthState {
    user: LoggedUser | null,
    token: string | null,
    loading: boolean,
    error: string | null,
    message: string | null
}


const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    message: null,
}

interface LoginPayload {
    user: LoggedUser;
    token: string;
    message: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: {email: string; password: string}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post('/login', credentials);
            const {data, message, status} = response.data;

            if (status !== '000') throw new Error(message);

            const {loggedUser, token} = data;

            localStorage.setItem('token', token);

            return {user: loggedUser, token: message};

        } catch(error: any) {
            return rejectWithValue(error.message || 'Login Failed')
        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (userDetails: {email: string; password: string}, {rejectWithValue}) => {

        try{

            const response = await axiosInstance.post('/signup', userDetails);
            const {status, message} = response.data;

            if(status !== '000') throw new Error(message);

            return {message}

        } catch (error: any) {
            return rejectWithValue(error.message || 'Signup Failed');
        }

    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.message = null;
            localStorage.removeItem('token');
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = action.payload.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            
            .addCase(login.rejected, (state, action: PayloadAction<any>) =>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;














