import { configureStore} from "@reduxjs/toolkit"
import authAction from "./reducer/authReducer"


export const store = configureStore({
    reducer:{
        user: authAction,  
    },
})

export default store
