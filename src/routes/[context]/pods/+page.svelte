<!-- <script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Checkbox from "@smui/checkbox";
    import type { NameSpace, Pod, PodJSON } from "../../../app";
    import Separator from "@smui/list/src/Separator.svelte";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import { Content } from "@smui/drawer";
    import PodsTable from "./pods-table.svelte";

    export let data: { pods: PodJSON[] };
    function subscribe() {
        const sse = new EventSource("/pods");
        sse.onmessage = () => {
            invalidate("pods");
        };
        return () => sse.close();
    }
    onMount(subscribe);
</script>

<PodsTable pods={data.pods} />

<style>
    a {
        text-decoration: none;
    }
</style> -->
