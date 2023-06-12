<!-- <script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Checkbox from "@smui/checkbox";
    import FormField from "@smui/form-field";

    export let data;
</script>

<header>
    <div id="header-content">
        <h1>{data.pod?.metadata.name}</h1>
        <div>
            <a href="/pods/{data.pod?.metadata.uid}/edit">edit</a>
            <a href="/pods/{data.pod?.metadata.uid}/delete">delete</a>
        </div>
    </div>
</header>
<div class="flexy">
    <div class="top-app-bar-container flexor">
        <TopAppBar variant="static" dense={true} color={"primary"}>
            <Row>
                <Section>
                    <IconButton class="material-icons">menu</IconButton>
                    <Title>Static</Title>
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
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
            <div class="labels">ds</div>
        </content>
    </div>
</div>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        width: 100%;
        justify-content: center;
        & #header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > * {
                padding: 0 50px;
            }
        }
    }
    .top-app-bar-container {
        max-width: 480px;
        width: 100%;
        height: 320px;
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
</style> -->
