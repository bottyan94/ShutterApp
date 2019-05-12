import {EventEmitter} from 'events'

class WorkerStore extends EventEmitter{

    _orders = [];
    _selectedOrder = null;
    _selectedShutter = null;



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

export default new WorkerStore();