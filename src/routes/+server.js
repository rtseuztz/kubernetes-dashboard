import { NamespaceEvent, namespace_events } from './data';
export const GET = () => {

    const nsevent = new NamespaceEvent();
    namespace_events.push(nsevent);
    const stream = new ReadableStream({
        start(controller) {
            nsevent.on('namespaces', () => {
                controller.enqueue('event: message\ndata:\n\n');
            });
        },
        cancel() {
            const nsindex = namespace_events.indexOf(nsevent);
            if (~nsindex) namespace_events.splice(nsindex, 1);
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