<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import { Graphic } from "@smui/list";

    /**
     * the data is passed from the parent component
     */
    export let dataObj: any[];
    export let titles: string[];
    /**
     * the obj params are the colum data
     * so obj.metadata.name would be ['metadata', 'name']
     */
    export let cellData: string[][];
    export let pipes: custFunc[];
    // the data obj is an object. it uses cellData to extract the data attributes
    let data: any[][];
    data = dataObj.map((obj) => {
        let arr: any[] = [];
        cellData.forEach((cell) => {
            let temp = obj;
            cell.forEach((c) => {
                temp = temp[c];
            });
            arr.push(temp);
        });
        return arr;
    });

    //append the name to each row
    data.forEach((row, index) => {
        row.push(dataObj[index].metadata.name);
    });

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
    function reduceObj(obj: any, arr: string[]) {
        let temp = obj;
        arr.forEach((c) => {
            temp = temp[c];
        });
        return temp;
    }

    type custFunc = (input: any) => string;
</script>

<DataTable style="max-width: 100%;">
    <Head>
        <Row>
            {#each titles as title}
                <Cell>{title}</Cell>
            {/each}
            <Cell />
        </Row>
    </Head>
    <Body>
        {#each dataObj as data}
            <Row on:mouseover={rowMouseOver} on:mouseout={rowMouseOut}>
                {#each cellData as cell, cellIndex}
                    <Cell>
                        {#if pipes[cellIndex]}
                            {pipes[cellIndex](reduceObj(data, cell))}
                        {:else}
                            {reduceObj(data, cell)}
                        {/if}
                    </Cell>
                {/each}
                <Cell>
                    <a class="link-cell" href={`/pods/${data.metadata.name}`}>
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
