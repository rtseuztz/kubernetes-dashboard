
export async function load({ parent, params }) {
    const { pod } = await parent()
    return {}
}
