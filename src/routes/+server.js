import { Event, events } from './data';
export const GET = () => {

    const event = new Event();
    events.push(event);
    const stream = new ReadableStream({
        start(controller) {
            event.on('namespaces', () => {
                controller.enqueue(`event: message\ndata: ${'namespaces'}\n\n`);
            });
            event.on('pods', () => {
                controller.enqueue(`event: message\ndata: ${'pods'}\n\n`);
            });
            event.on('services', () => {
                controller.enqueue(`event: message\ndata: ${'services'}\n\n`);
            });
            event.on('deployments', () => {
                controller.enqueue(`event: message\ndata: ${'deployments'}\n\n`);
            });


        },
        cancel() {
            const nsindex = events.indexOf(event);
            if (~nsindex) events.splice(nsindex, 1);
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