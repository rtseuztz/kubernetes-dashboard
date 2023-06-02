import { EventEmitter } from 'node:events';
import { initializeResource, tableToJSON, watchResource } from '../script';
import type { NameSpaceJSON } from '../app';


export let namespaces: NameSpaceJSON[] = [];
export const namespace_events: NamespaceEvent[] = [];
export class NamespaceEvent extends EventEmitter {
    notify() {
        this.emit('namespaces');
    }
}

namespaces = initializeResource("namespaces")

export function send_namespace(ns: NameSpaceJSON[]) {
    namespaces = ns;
    for (const event of namespace_events) {
        event.notify();
    }
}

watchResource("namespaces", send_namespace)
// use the terminal to watch for kubernetes namespaces. Notify the client when a new namespace is created.
