<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import type { ContextTbl, PodJSON } from "../app";
    import Graphic from "@smui/list/src/Graphic.svelte";
    import CustDataTable from "../components/CustDataTable.svelte";
    export let data: { contexts: ContextTbl[] };

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
    export let titles = ["Cluster"];
    export let cellData = [["CLUSTER"]];
    export let pipes: any = [];
</script>

<!-- <CustDataTable dataObj={data.contexts} {titles} {cellData} {pipes} /> -->

<DataTable style="max-width: 100%;">
    <Head>
        <Row>
            <Cell>Cluster</Cell>
            <Cell />
        </Row>
    </Head>
    <Body>
        {#each data.contexts as option}
            <Row
                on:mouseover={rowMouseOver}
                on:mouseout={rowMouseOut}
                class="podsWrapper"
            >
                <Cell>{option.CLUSTER}</Cell>
                <Cell>
                    <a class="link-cell" href={`/${option.CLUSTER.trim()}`}>
                        <Graphic class="material-icons" aria-hidden="true"
                            >open_in_new</Graphic
                        >
                    </a>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>

<style>
    a {
        text-decoration: none;
    }
    a.link-cell {
        visibility: hidden;
    }
</style>
