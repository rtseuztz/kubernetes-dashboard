<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Checkbox from "@smui/checkbox";
    import type { NameSpace, Pod } from "../../app";
    import Separator from "@smui/list/src/Separator.svelte";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import { Content } from "@smui/drawer";

    export let data: { pods: Pod[]; namespaces: NameSpace[] };
    let selected: Pod[] = [];
    function subscribe() {
        const sse = new EventSource("/pods");
        sse.onmessage = () => {
            invalidate("pods");
        };
        return () => sse.close();
    }
    function clicked(e: any) {
        const params: string[] = e?.target?.parentElement
            ?.getAttribute("keyparams")
            .split(",");
        const namespace = params[0];
        const pod = params[1];
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
            <Cell>Age</Cell>
            <Cell>Restarts</Cell>
            <Cell>Ready</Cell>
        </Row>
    </Head>
    <Body>
        {#each data.pods as option}
            <Row keyparams={option.NAME + "," + option.NAMESPACE}>
                <Cell checkbox>
                    <Checkbox
                        bind:group={selected}
                        value={option}
                        valueKey={option.NAME}
                    />
                </Cell>
                <Separator />
                <Cell>
                    <a
                        href={`/namespaces/${option.NAMESPACE}/pods/${option.NAME}`}
                        >{option.NAMESPACE}</a
                    ></Cell
                >
                <Cell>{option.NAME}</Cell>
                <Cell>{option.STATUS}</Cell>
                <Cell>{option.AGE}</Cell>
                <Cell>{option.RESTARTS}</Cell>
                <Cell>{option.READY}</Cell>
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
