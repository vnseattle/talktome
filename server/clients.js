/*******************************************************
* Clients control
******************************************************/


class Clients {

    constructor() {
        this.clientList = [];
        this.clientWaitList = [];
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

    get(id){
        return this.clientList.find(client => client.id === id);
    }

    addWaitList(id){
        this.clientWaitList.push(id);
    }
    
    setPartner(id,partner){
        this.get(id).partner = partner;
    }

    stopFinding(id){
        this.clientWaitList.splice(this.clientWaitList.indexOf(id), 1 );
        let partner = this.get(id).partner;
        this.setPartner(partner,null);  
        this.setPartner(id,null);
    }

    findPartner(id){
        if(this.clientWaitList.length === 0){
            this.clientWaitList.push(id);
        }else{
            // remove 
            let partner = this.clientWaitList.pop();
            // set partner 
            this.setPartner(id,partner);
            this.setPartner(partner,id);
            // match 
            console.log(partner," : ",id);
        }
    }

    getAll(){
        return this.clientList;
    }

    getSize(){
        return this.len;
    }
}

module.exports = Clients
