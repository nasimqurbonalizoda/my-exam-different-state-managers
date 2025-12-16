import { atom } from "jotai";

export const dataAtom = atom([
    { id: 1, name: "nasimes",age:21, status: false },
    { id: 2, name: "misanes",age:24, status: false }
]);

export const addUserAtom = atom(null, (get, set, elem) => {
    const todos = get(dataAtom);
    set(dataAtom, [...todos, elem]);
}
);

export const deleteUserAtom = atom(null, (get, set, id) => {
    const todos = get(dataAtom);
    set(dataAtom, todos.filter((el) => el.id !== id));
}
);

export const editUserAtom = atom(null, (get, set, elem) => {
    const todos = get(dataAtom);
    set(dataAtom,
        todos.map((el) => (el.id === elem.id ? { ...el, ...elem } : el))
    );
}
);

export const chexbox = atom(null, (get, set, id) => {
    const todos = get(dataAtom);
    set(dataAtom,
        todos.map((el) => (el.id === id ? { ...el, status: !el.status } : el))
    );
}
);
