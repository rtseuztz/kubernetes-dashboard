import { EventEmitter } from 'node:events';
import { initializeResource, watchResource } from '../script';
import type { NameSpace } from '../app';


export let namespaces: NameSpace[] = [];
export const namespace_events: NamespaceEvent[] = [];
export class NamespaceEvent extends EventEmitter {
    notify() {
        this.emit('namespaces');
    }
}

namespaces = initializeResource("namespaces")

export function send_namespace(ns: NameSpace[]) {
    console.log("emitting")
    namespaces = ns;
    for (const event of namespace_events) {
        event.notify();
    }
}
watchResource("namespaces", send_namespace)
// use the terminal to watch for kubernetes namespaces. Notify the client when a new namespace is created.
