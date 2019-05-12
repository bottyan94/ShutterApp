import {EventEmitter} from 'events'

class CustomerStore extends EventEmitter {

    _customers = [];
    _shutters = [];
    _selectedStore = null;
    _selectedCustomer = null;


    emitChange() {
        this.emit('change')
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

export default new CustomerStore();