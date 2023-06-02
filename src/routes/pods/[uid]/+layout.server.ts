import type { PodJSON } from "../../../app"


export async function load({ parent, params }) {
    const { pods } = await parent()
    const uid = params.uid
    const pod = pods.find((p: PodJSON) => p.metadata.uid === uid)
    return { pod }
}