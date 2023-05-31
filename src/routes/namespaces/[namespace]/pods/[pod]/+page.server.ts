import EventEmitter from "events";
import type { PodJSON, Pod } from "../../../../../app";
import { initializeResource, watchResource } from "../../../../../script";

export var _pod: PodJSON | undefined = undefined;
export const _pod_events: _PodEvent[] = [];

export class _PodEvent extends EventEmitter {
    notify() {
        this.emit('msg');
    }
}
export function load({ params, depends }) {

    const namespaceName = params.namespace;
    const podName = params.pod;

    _pod = initializeResource("pods", namespaceName, podName);
    function send(pd: PodJSON) {
        _pod = pd
        console.log(_pod.metadata.labels)
        for (const event of _pod_events) {
            event.notify();
        }
    }
    watchResource("pod", send, namespaceName, podName)

    depends("_pod")
    return {
        pod: _pod
    }
}

