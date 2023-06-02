import { PodEvent, pod_events } from "./data";

export const GET = () => {
    const podevent = new PodEvent();
    pod_events.push(podevent);
    const stream = new ReadableStream({
        start(controller) {
            podevent.on('msg', () => {
                controller.enqueue('event: message\ndata:\n\n');
            });
        },
        cancel() {
            const nsindex = pod_events.indexOf(podevent);
            if (~nsindex) pod_events.splice(nsindex, 1);
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        }
    });
};