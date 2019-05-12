import {EventEmitter} from 'events'

class ManagerStore extends EventEmitter{

    _orders = [];
    _customers=[]
    _selectedOrder = null;
    _selectedCustomer=null


    emitChange(){
        this.emit('change')
    }

    addChangeListener(callback){
        this.on('change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('change',callback);
    }
}

export default new ManagerStore();