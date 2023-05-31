import { _PodEvent, _pod, _pod_events } from "./+page.server";
export const GET = () => {
    const podevent = new _PodEvent();
    _pod_events.push(podevent);
    const stream = new ReadableStream({
        start(controller) {
            podevent.on('msg', () => {
                console.log('msg')
                controller.enqueue(`event: message\ndata: ${JSON.stringify(_pod)} \n\n`);
            });
        },
        cancel() {
            const nsindex = _pod_events.indexOf(podevent);
            if (~nsindex) _pod_events.splice(nsindex, 1);
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