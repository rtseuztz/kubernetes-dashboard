<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import type { NameSpace } from "../app";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Checkbox from "@smui/checkbox";
    import Separator from "@smui/list/src/Separator.svelte";

    export let data: { namespaces: NameSpace[] };
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
            <Cell>Status</Cell>
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
                        valueKey={option.NAME}
                    />
                </Cell>
                <Separator />
                <Cell>{option.NAME}</Cell>
                <Cell>{option.STATUS}</Cell>
                <Cell numeric>{option.AGE}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>

<pre class="status">Selected: {selected
        .map((option) => option.NAME)
        .join(", ")}</pre>

<style>
</style>
