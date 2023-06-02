<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import type { NameSpace } from "../app";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Checkbox from "@smui/checkbox";
    import Separator from "@smui/list/src/Separator.svelte";

    export let data;
    let selected: NameSpace[] = [];
    function subscribe() {
        const sse = new EventSource("/");
        sse.onmessage = () => {
            invalidate("namespaces");
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
            <Cell>Name</Cell>
            <Cell>Age</Cell>
        </Row>
    </Head>
    <Body>
        {#each data.namespaces as option}
            <Row>
                <Cell checkbox>
                    <Checkbox
                        bind:group={selected}
                        value={option}
                        valueKey={option.metadata.name}
                    />
                </Cell>
                <Separator />
                <Cell>{option.metadata.name}</Cell>
                <Cell numeric
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
</style>
