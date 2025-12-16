import { create } from "zustand"

export const useZustanded = create((set, get) => ({
    data: [
        { id: 1, name: "nasimes", age: 21, status: false },
        { id: 2, name: "misanes", age: 24, status: false }
    ],
    deletetodo: (id) => {
        set((state) => ({
            data: state.data.filter((el) => el.id !== id)
        }))
    },

    adduser: (newuser) => {
        set((state) => ({
            data: [
                ...state.data,
                {
                    id: newuser.id,
                    name: newuser.name,
                    age: newuser.age,
                    status: false
                }
            ]
        }));
    },
    edituser: (name) => {
        set((state) => ({
            data: state.data.map((el) => 
                el.id = name.id ? { ...el, ...name } : el
            )
        }))

    },
    chexbox: (elem) => {
        set((state)=>({
            data:state.data.map((el)=>
                el.id=elem.id?{...el,status:!el.status}:el
            )
        }))

    },
}));




