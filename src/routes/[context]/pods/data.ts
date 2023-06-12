import { EventEmitter } from 'node:events';
import type { Pod, PodJSON } from '../../../app';
import { initializeResource, watchResource } from '../../../script';


export let pods: PodJSON[] = [];
export const pod_events: PodEvent[] = [];
export class PodEvent extends EventEmitter {
    notify() {
        this.emit('msg');
    }
}

pods = initializeResource("pods")

export function send(pds: PodJSON[]) {
    pods = pds;
    for (const event of pod_events) {
        event.notify();
    }
}
watchResource("pod", send)
// use the terminal to watch for kubernetes namespaces. Notify the client when a new namespace is created.
