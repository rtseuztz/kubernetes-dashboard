<script lang="ts">
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
</style>
