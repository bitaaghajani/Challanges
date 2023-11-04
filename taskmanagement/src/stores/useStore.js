import create from "zustand";
import  {persist} from "zustand/middleware";

const useStore = create(
    persist(
          (set)=>({
            inputValue: '',
            setInputValue: (input) =>set({ inputValue:input}),
            items: [],
            setItems: (items) => {
                set({ items: items })
            },
            editItems:0,
            setEditItems:item=>{
                set({editItems:item})
            },
            date:'',
            setDate:date=>{
                set({date:date})
            },
            filterItems:[],
            setFilterItems:item=>{
                set({filterItems:item})
            },
            searchActive:false,
            setSearchActive:search=>{
                set({searchActive:search})
            },
        }), 
            {
                name:'todo-storage',
            },  
    ) 
);
export default useStore;

// a quetion here I want to show date inside the arr of item??





