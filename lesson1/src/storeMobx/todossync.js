import { makeAutoObservable } from "mobx";

class Todos {
    data = [
        { id: 1, name: "nasimes", age: 21, status: false },
        { id: 2, name: "misanes", age: 24, status: false }
    ];
    constructor() {
        makeAutoObservable(this);
    }
    deleteuser(id) {
        this.data = this.data.filter((el) => el.id != id)
    }
    edituser(elem) {
        this.data = this.data.map((el) =>
            el.id === elem.id ? { ...el, ...elem } : el
        );
    }

    adduser(elem) {
        this.data.push({
            id:elem.id,
            name:elem.name,
            age:elem.age,
            status:false
        })

    }
    chexbox(id) {
        this.data = this.data.map((el) =>
            el.id === id ? { ...el, status: !el.status } : el
        );
    }

}

export const todosen = new Todos();