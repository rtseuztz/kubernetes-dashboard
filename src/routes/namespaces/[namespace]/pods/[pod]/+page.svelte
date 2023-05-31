<script lang="ts">
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    const path = $page.url.pathname;
    const namespace = path.split("/")[2];
    const podStr = path.split("/")[4];
    console.log(namespace, podStr);
    export let data;
    let pod = data.pod;
    function subscribe() {
        const sse = new EventSource(`/namespaces/${namespace}/pods/${podStr}`);
        sse.onmessage = (e) => {
            console.log(e);
            pod = JSON.parse(e.data);
            // invalidate(`namespaces/[namespace]/pods/[pod]`);
        };
        return () => sse.close();
    }
    $: console.log(pod?.metadata.labels || "no labels");
    onMount(subscribe);
    console.log(pod?.metadata.labels);
</script>

<h1>{pod?.metadata.name}</h1>
{#if pod?.metadata.labels}
    {#each Object.keys(pod?.metadata.labels) as lbl}
        <div>{lbl}</div>
    {/each}
{/if}
