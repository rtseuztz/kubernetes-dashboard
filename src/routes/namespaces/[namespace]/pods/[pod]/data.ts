// import { EventEmitter } from 'node:events';
// import type { Pod, PodJSON } from '../../../../../app';
// import { initializeResource, watchResource } from '../../../../../script';
// import { pods } from '../../../../pods/data';

// export let pod: PodJSON = initializeResource("pods", true);
// export const pod_events: PodEvent[] = [];
// export class PodEvent extends EventEmitter {
//     notify() {
//         this.emit('msg');
//     }
// }

// pods = initializeResource("pods",)

// export function send(pds: Pod[]) {
//     pods = pds;
//     for (const event of pod_events) {
//         event.notify();
//     }
// }
// watchResource("pod", send, true)
// // use the terminal to watch for kubernetes namespaces. Notify the client when a new namespace is created.
// //kubectl get pod nginx -o json -n=default