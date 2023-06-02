<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Checkbox from "@smui/checkbox";
    import type { NameSpace, Pod, PodJSON } from "../../app";
    import Separator from "@smui/list/src/Separator.svelte";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import { Content } from "@smui/drawer";

    export let data: { pods: PodJSON[] };
    let selected: Pod[] = [];
    function subscribe() {
        const sse = new EventSource("/pods");
        sse.onmessage = () => {
            invalidate("pods");
        };
        return () => sse.close();
    }
    onMount(subscribe);
</script>

<DataTable style="max-width: 100%;">
    <Head>
        <Row>
            <Cell checkbox>
                <Checkbox />
            </Cell>
            <Cell />
            <Cell>Namespace</Cell>
            <Cell>Name</Cell>
            <Cell>Status</Cell>
            <Cell>Created On</Cell>
        </Row>
    </Head>
    <Body>
        {#each data.pods as option}
            <Row
                keyparams={option.metadata.name +
                    "," +
                    option.metadata.namespace}
            >
                <Cell checkbox>
                    <Checkbox
                        bind:group={selected}
                        value={option}
                        valueKey={option.metadata.name}
                    />
                </Cell>
                <Separator />
                <Cell>{option.metadata.namespace}</Cell>
                <Cell>
                    <a href={`/pods/${option.metadata.uid}`}
                        >{option.metadata.name}
                    </a></Cell
                >
                <Cell>{option.status.conditions[0].type}</Cell>
                <Cell
                    >{new Date(
                        option.metadata.creationTimestamp
                    ).toLocaleString()}</Cell
                >
            </Row>
        {/each}
    </Body>
</DataTable>

<pre class="status">Selected: {selected
        .map((option) => option.NAME)
        .join(", ")}</pre>

<style>
    a {
        text-decoration: none;
    }
</style>
