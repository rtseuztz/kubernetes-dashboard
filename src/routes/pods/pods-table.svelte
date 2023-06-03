<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Checkbox from "@smui/checkbox";
    import type { PodJSON } from "../../app";
    import Separator from "@smui/list/src/Separator.svelte";
    import Graphic from "@smui/list/src/Graphic.svelte";
    import IconButton from "@smui/icon-button";
    import { mdiOpenInNew } from "@mdi/js";
    import Wrapper from "@smui/tooltip/src/Wrapper.svelte";
    export let pods: PodJSON[];
    export let selected: PodJSON[] = [];

    function rowMouseOver(e: CustomEvent<any>) {
        const row = e.currentTarget as HTMLElement;
        const link = row.querySelector("a.link-cell") as HTMLElement;
        link.style.visibility = "visible";
    }
    function rowMouseOut(e: CustomEvent<any>) {
        const row = e.currentTarget as HTMLElement;
        const link = row.querySelector("a.link-cell") as HTMLElement;
        link.style.visibility = "hidden";
    }
</script>

<DataTable style="max-width: 100%;">
    <Head>
        <Row>
            <Cell>Namespace</Cell>
            <Cell>Name</Cell>
            <Cell>Status</Cell>
            <Cell>Created On</Cell>
            <Cell />
        </Row>
    </Head>
    <Body>
        {#each pods as option}
            <Row
                on:mouseover={rowMouseOver}
                on:mouseout={rowMouseOut}
                class="podsWrapper"
            >
                <Cell>{option.metadata.namespace}</Cell>
                <Cell>{option.metadata.name}</Cell>
                <Cell>{option.status.conditions[0].type}</Cell>
                <Cell
                    >{new Date(
                        option.metadata.creationTimestamp
                    ).toLocaleString()}</Cell
                >
                <Cell>
                    <a class="link-cell" href={`/pods/${option.metadata.uid}`}>
                        <Graphic class="material-icons" aria-hidden="true"
                            >open_in_new</Graphic
                        >
                    </a>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>
<pre class="status">Selected: {selected
        .map((option) => option.metadata.name)
        .join(", ")}</pre>

<style>
    a {
        text-decoration: none;
    }
    a.link-cell {
        visibility: hidden;
    }
</style>
