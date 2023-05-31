
export function load({ params }) {
    return {
        body: {
            namespace: params.namespace,
            pod: params.pod
        }
    }
}