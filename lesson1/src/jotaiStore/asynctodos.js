import { atom } from 'jotai'

let API = "http://localhost:3000/users";

export const dataAtom = atom([])

export const getuserAtom = atom(null, async (get, set) => {
    try {
        let res = await fetch(API)
        let data = await res.json()
        console.log(data)
        set(dataAtom, data)
    } catch (error) {
        console.error(error);
    }
})

export const adduseratom = atom(null, async (get, set, name) => {
    try {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(name)
        })
        set(getuserAtom)
    } catch (error) {
        console.error(error);
    }
})
export const edituseratom = atom(null, async (get, set, name) => {
    try {
        await fetch(`${API}/${name.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(name)
        })
        set(getuserAtom)
    } catch (error) {
        console.error(error);
    }
})

export const chexbox = atom(null, async (get, set, elem) => {
    try {
        await fetch(`${API}/${elem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...elem, status: !elem.status })
        })
        set(getuserAtom)
    } catch (error) {
        console.error(error);
    }
})

export const deleteuseratom = atom(null, async (get, set, id) => {
    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
        })
        set(getuserAtom)
    } catch (error) {
        console.error(error);
    }
})

