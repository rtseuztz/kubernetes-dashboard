import { EventEmitter } from 'node:events';
import type { Pod } from '../../app';
import { initializeResource, watchResource } from '../../script';


export let pods: Pod[] = [];
export const pod_events: PodEvent[] = [];
export class PodEvent extends EventEmitter {
    notify() {
        this.emit('msg');
    }
}

pods = initializeResource("pods", true)

export function send(pds: Pod[]) {
    console.log("emitting")
    pods = pds;
    for (const event of pod_events) {
        event.notify();
    }
}
watchResource("pod", send, true)
// use the terminal to watch for kubernetes namespaces. Notify the client when a new namespace is created.
