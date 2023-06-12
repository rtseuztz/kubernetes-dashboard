<script lang="ts">
    import { page } from "$app/stores";
    import DataTable, { Head, Cell, Body } from "@smui/data-table";
    import { Graphic } from "@smui/list";
    import { Row } from "@smui/top-app-bar";
    import { pods } from "../../stores";
    import type { PodJSON } from "src/app";
    import { onMount } from "svelte";
    export let path = $page.url.pathname;
    const namespace = $page.params.namespace;
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
    export let pds: PodJSON[] = [];
    $: pds = $pods.filter((pod) => pod.metadata.namespace === namespace);
</script>

<DataTable style="max-width: 100%;">
    <Head>
        <Row>
            <Cell>Name</Cell>
            <Cell>Created On</Cell>
        </Row>
    </Head>
    <Body>
        {#each pds as pod}
            <Row on:mouseover={rowMouseOver} on:mouseout={rowMouseOut}>
                <Cell>{pod.metadata.name}</Cell>
                <Cell
                    >{new Date(
                        pod.metadata.creationTimestamp
                    ).toLocaleString()}</Cell
                >
                <Cell>
                    <a class="link-cell" href={`${path}/${pod.metadata.name}`}>
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
