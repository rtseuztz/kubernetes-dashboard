<script lang="ts">
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title,
        Subtitle,
        Scrim,
    } from "@smui/drawer";
    import Button, { Icon, Label } from "@smui/button";
    import List, {
        Item,
        Text,
        Graphic,
        Separator,
        Subheader,
    } from "@smui/list";
    import { page } from "$app/stores";

    let open = true;
    let active = "Home";
    let path: string = $page.url.pathname;
    function setActive(value: string) {
        active = value;
        //open = false;
    }
    $: {
        path = $page.url.pathname;
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
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Sent Mail")}
                    activated={active === "Sent Mail"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >send</Graphic
                    >
                    <Text>Sent Mail</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Drafts")}
                    activated={active === "Drafts"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >drafts</Graphic
                    >
                    <Text>Drafts</Text>
                </Item>

                <Separator />
                <Subheader tag="h6">Labels</Subheader>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Family")}
                    activated={active === "Family"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >bookmark</Graphic
                    >
                    <Text>Family</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Friends")}
                    activated={active === "Friends"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >bookmark</Graphic
                    >
                    <Text>Friends</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Work")}
                    activated={active === "Work"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >bookmark</Graphic
                    >
                    <Text>Work</Text>
                </Item>
            </List>
        </Content>
    </Drawer>

    <!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
    <AppContent class="app-content">
        <main class="main-content">
            <Button on:click={() => (open = !open)}>
                <Label on:click={() => (open = !open)}>Menu</Label>
            </Button>
            <br />
            <pre class="status">Active: {active}</pre>
            <slot />
        </main>
    </AppContent>
</div>

<style>
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
</style>
