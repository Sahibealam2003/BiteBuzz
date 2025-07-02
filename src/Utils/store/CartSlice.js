import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'Cart',
    initialState:[],
    reducers:{
        addItems:(state,action)=>{
            let currItemId = action.payload.id
            let foundItem =state.find((item)=>{
                return item.info.id == currItemId
            })
            
            if(!foundItem){
                
                state.push({info: action.payload,quantity:1})
            }else{
                // foundItem.quantity += 1
                for(let item of state){
                    if(item.info.id == currItemId)
                    {
                        item.quantity= item.quantity+1
                    }
                }
            }
        }
    }
})

export default cartSlice.reducer
export const {addItems} = cartSlice.actions