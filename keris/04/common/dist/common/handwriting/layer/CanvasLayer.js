import { getUUID } from "../util/util.js";
import { cloneDeep } from "../util/lodash-clonedeep.js";
export class CanvasLayer {
    id;
    events;
    _canvasManager;
    constructor(id) {
        this.id = id || getUUID();
        this.events = [];
    }
    async setCanvasManager(canvasManager) {
        this._canvasManager = canvasManager;
        await this.initFunctionsWhenCanvasManagerInitialized();
    }
    get canvasManager() {
        const canvasManager = this._canvasManager;
        if (canvasManager === undefined) {
            throw new Error("Init canvas manager first!");
        }
        return canvasManager;
    }
    remove() {
        this.clear();
        this.canvasManager.remove();
    }
    clear() {
        this.canvasManager.clear();
        this.events = [];
    }
    addEvent(event) {
        this.events.push(event);
    }
    cloneEvents() {
        return cloneDeep(this.events);
    }
    get eventSize() {
        return this.events.length;
    }
    initFunctionsWhenCanvasManagerInitialized() {
    }
}
