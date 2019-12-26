/*******************************************************
* Clients control
******************************************************/


class Clients {

    constructor() {
        this.clientList = [];
        this.len = 0;
    }

    add(id){
        this.clientList.push(id);
        this.len++;
    }

    remove(id){
        this.clientList.splice(this.clientList.indexOf(id), 1 );
        this.len--;
    }

    getAll(){
        return this.clientList;
    }

    getSize(){
        return this.len;
    }
}

module.exports = Clients
