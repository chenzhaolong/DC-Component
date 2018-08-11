export default  {
    events: {},

    subscribe(event, fn) {
        if (Object.keys(this.events).indexOf(event) === -1) {
            this.events[event] = [];
        }
        this.events[event].push(fn);
    },

    publish(event, args) {
        if (this.events[event] instanceof Array) {
            for (let i = 0; i < this.events[event].length; i++) {
                this.events[event][i].call(null, args);
            }
        }
    },

    remove(event) {
        if (this.events[event]) {
            this.events[event] = ''
        }
    }
}