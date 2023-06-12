<script lang="ts">
    import { onMount } from "svelte";
    import { namespaces, pods, services } from "../stores.js";
    import { invalidate } from "$app/navigation";

    function subscribe() {
        const sse = new EventSource("/");
        sse.onmessage = (ev: MessageEvent<string>) => {
            invalidate(ev.data);
        };
        return () => sse.close();
    }

    onMount(subscribe);

    export let data;
    $: namespaces.set(data.namespaces);
    $: pods.set(data.pods);
    $: services.set(data.services);
</script>

<div>
    <slot />
</div>
