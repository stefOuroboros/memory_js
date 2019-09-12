
const eventCallbacksPairs = [];

class EventCallbacksPair {
    constructor(eventType, callback) {
        this.eventType = eventType;
        this.callbacks = [callback];
    }
}

export class EventBus {

    /**
     * 
     * recherche l'existence d'un event dans l'array eventCallBacksPairs
     * @param String eventType
     * @return eventCallbackPair
    */

    /**
     *
     * recherche l'existence d'un event dans l'array eventCallBacksPairs
     * @param String eventType
     * @return int index de l'eventCallbackPair trouvé
    */

    static findEventCallbacksPair(eventType) {
        return eventCallbacksPairs.find(
            eventObject => eventObject.eventType === eventType
        );
    }

    /**
     * Permet la diffusion d'un évènement / déclenche tous les callbacks
     * 
     * @param String eventType 
     * @param Mixed args
     * @return void 
     */

    static post(eventType, args) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);
        if (!eventCallbacksPair) {
            console.error("Not find any subscribers for event '" + eventType + "'");
            return;            
        }
        eventCallbacksPair.callbacks.forEach(callback => callback(args));
    }

    /**
     * 
     * Permet l'inscription à un event
     * @param String eventType 
     * @param Function callback 
     */

    static subscribe(eventType, callback) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);
        if (eventCallbacksPair) {
            eventCallbacksPair.callbacks.push(callback);
        } else {
            eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
        }
    }

    /**
     * Permet la désinscription à un event
     * 
     * @param String eventType
     * @return void 
     */

    static unsubscribeGlobal(eventType) {
        const eventCallbackPairIndex = this.findEventCallbacksPairIndex(event);

        if (eventCallbackPairIndex === -1) {
            console.error("");
            return;
        }

        eventCallbacksPairs.splice(eventCallbackPairIndex, 1);
    }
    static unsubscribe(eventType, callback) { }

}