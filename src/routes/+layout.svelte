<script lang="ts">
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
    let open = true;
    let active = "Home";
    let path: string = $page.url.pathname;
    function setActive(value: string) {
        active = value;
        //open = false;
    }
    let pathArr: string[] = path.split("/");
    $: {
        path = $page.url.pathname;
        pathArr = path.split("/").filter((p) => p !== "");
        let tempActive = path.split("/")[1] || "Home";
        tempActive =
            tempActive.charAt(0).toUpperCase() + tempActive.substring(1);
        active = tempActive;
    }
</script>

<div class="drawer-container">
    <!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
    <Drawer variant="dismissible" bind:open>
        <Header>
            <Title>Kubernetes Dashboard</Title>
            <Subtitle>Manage K8s</Subtitle>
        </Header>
        <Content>
            <List>
                <Item
                    href="/"
                    on:click={() => setActive("Home")}
                    activated={active === "Home"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >home</Graphic
                    >
                    <Text>Home</Text>
                </Item>
                <Item
                    href="/pods"
                    on:click={() => setActive("Pods")}
                    activated={active === "Pods"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >apps</Graphic
                    >
                    <Text>Pods</Text>
                </Item>
            </List>
        </Content>
    </Drawer>

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
                                    <pre>{" > "}</pre>

                                    <Title class="header-title"
                                        ><a href={p}>{p}</a></Title
                                    >
                                {/each}
                            {/if}
                        </Section>
                        <Section align="end" toolbar>
                            <IconButton
                                class="material-icons"
                                aria-label="Download">file_download</IconButton
                            >
                            <IconButton
                                class="material-icons"
                                aria-label="Print this page">print</IconButton
                            >
                            <IconButton
                                class="material-icons"
                                aria-label="Bookmark this page"
                                >bookmark</IconButton
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
</div>

<style>
    content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    /* These classes are only needed because the
    drawer is in a container on the page. */
    .drawer-container {
        position: relative;
        display: flex;
        height: 350px;
        height: 98vh;
        border: 1px solid
            var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        overflow: hidden;
        z-index: 0;
    }

    * :global(.app-content) {
        flex: auto;
        overflow: auto;
        position: relative;
        flex-grow: 1;
    }

    .main-content {
        overflow: auto;
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
    }
    .top-app-bar-container {
        width: 100%;
        border: 1px solid
            var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        margin: 0 18px 18px 0;
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
