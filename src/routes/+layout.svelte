<script lang="ts">
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";
    import Drawer, {
        AppContent,
        Content,
        Header,
        Subtitle,
        Title,
    } from "@smui/drawer";
    import IconButton from "@smui/icon-button";
    import List, { Graphic, Item, Text } from "@smui/list";
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { namespaces, pods, services } from "./stores.js";
    let open = false;
    let active = "Home";
    let path: string = $page.url.pathname;
    function setActive(value: string) {
        active = value;
        //open = false;
    }
    let pathArr: string[] = path.split("/");
    let routeArr: string[] = [];
    $: {
        path = $page.url.pathname;
        pathArr = path.split("/").filter((p) => p !== "");
        //route arr is all the previous + the current
        routeArr = pathArr.slice(0, pathArr.indexOf(active) + 1);
    }

    function subscribe() {
        const sse = new EventSource("/");
        sse.onmessage = (ev: MessageEvent<string>) => {
            invalidate(ev.data);
        };
        return () => sse.close();
    }

    onMount(subscribe);

    export let data;
    $: namespaces.set(data.namespaces);
    $: pods.set(data.pods);
    $: services.set(data.services);
</script>

<!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
<AppContent class="app-content">
    <div class="flexy">
        <div class="top-app-bar-container flexor">
            <TopAppBar variant="static" dense={true} color={"secondary"}>
                <Row>
                    <Section>
                        <IconButton
                            on:click={() => (open = !open)}
                            class="material-icons">menu</IconButton
                        >
                        <Title class="header-title"
                            ><a href="/">Kubernetes</a></Title
                        >
                        {#if pathArr.length > 0}
                            {#each pathArr as p}
                                <Title class="header-title"
                                    ><pre>{" > "}</pre></Title
                                >
                                <div>
                                    <Title class="header-title"
                                        ><a
                                            href={"/" +
                                                pathArr
                                                    .slice(
                                                        0,
                                                        pathArr.indexOf(p) + 1
                                                    )
                                                    .join("/")}>{p}</a
                                        ></Title
                                    >
                                </div>
                            {/each}
                        {/if}
                    </Section>
                    <Section align="end" toolbar>
                        <IconButton class="material-icons" aria-label="Download"
                            >file_download</IconButton
                        >
                        <IconButton
                            class="material-icons"
                            aria-label="Print this page">print</IconButton
                        >
                        <IconButton
                            class="material-icons"
                            aria-label="Bookmark this page">bookmark</IconButton
                        >
                    </Section>
                </Row>
            </TopAppBar>
            <content class="flexor-content">
                <slot />
            </content>
        </div>
    </div>
    <!-- <main class="main-content">
            <Button on:click={() => (open = !open)}>
                <Label on:click={() => (open = !open)}>Menu</Label>
            </Button>
            <br />
            <pre class="status">Active: {active}</pre>
            <content>
                <slot />
            </content>
        </main> -->
</AppContent>

<style>
    content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .top-app-bar-container {
        width: 100%;
        height: 98vh;
        border: 1px solid
            var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        background-color: var(--mdc-theme-background, #fff);

        overflow: auto;
        display: inline-block;
    }

    @media (max-width: 480px) {
        .top-app-bar-container {
            margin-right: 0;
        }
    }

    .flexy {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
    }

    .flexor {
        display: inline-flex;
        flex-direction: column;
    }

    .flexor-content {
        flex-basis: 0;
        height: 0;
        flex-grow: 1;
        overflow: auto;
        padding-top: 2vh;
        justify-content: flex-start;
    }
    /* needed to overwrite drawer title */
    * :global(.header-title) {
        margin-bottom: 0px;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
