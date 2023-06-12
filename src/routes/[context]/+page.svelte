<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import type { NameSpaceJSON } from "../../app";
    import Graphic from "@smui/list/src/Graphic.svelte";
    import { getContext, onMount } from "svelte";
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";
    import { namespaces, pods, services } from "../stores";
    import { get } from "svelte/store";
    import moment from "moment";
    import CustDataTable from "../../components/CustDataTable.svelte";

    let processDate = (d: Date) => {
        return moment(d).fromNow();
    };
    console.log(processDate(new Date()));
    export let path = $page.url.pathname;
    export let titles = ["Name", "Created On", "Status"];
    export let cellData = [
        ["metadata", "name"],
        ["metadata", "creationTimestamp"],
        ["status", "phase"],
    ];
    export let pipes: any = [null, processDate, null];
</script>

<CustDataTable dataObj={$namespaces} {titles} {cellData} {pipes} />
