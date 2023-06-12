import { EventEmitter } from 'node:events';
import { CLIReturnType, initializeResource, initializeResourceString, tableToJSON, watchResource } from '../../script';
import type { ContextTbl, NameSpaceJSON, PodJSON, ServiceJSON } from '../../app';

console.log('data')

export let namespaces: NameSpaceJSON[] = [];
export let pods: PodJSON[] = [];
export let services: ServiceJSON[] = [];

export const events: Event[] = [];
export class Event extends EventEmitter {
    notifyNs() {
        this.emit('namespaces');
    }
    notifyPod() {
        this.emit('pods');
    }
    notifySvc() {
        this.emit('services');
    }

}


namespaces = initializeResource("namespaces")
pods = initializeResource("pods")
services = initializeResource("services")
export function send_namespace(ns: NameSpaceJSON[]) {
    console.log('sending namespaces')
    namespaces = ns;
    console.log(events.length)
    for (const event of events) {
        console.log('notifying')
        event.notifyNs();
    }
}
export function send_pod(pds: NameSpaceJSON[]) {
    pods = pds;
    for (const event of events) {
        event.notifyPod();
    }
}
export function send_svc(svs: ServiceJSON[]) {
    services = svs;
    for (const event of events) {
        event.notifySvc();
    }
}

watchResource("namespaces", send_namespace);
watchResource("pods", send_pod);
watchResource("services", send_svc);
// use the terminal to watch for kubernetes namespaces. Notify the client when a new namespace is created.
