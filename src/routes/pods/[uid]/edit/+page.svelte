<script lang="ts">
    import { parse, stringify } from "yaml";
    export let data;
    const yaml = stringify(data.pod);
    const json = parse(yaml);
</script>

<div>
    <pre>
{yaml}
    </pre>
</div>

<style>
    div {
        width: 100%;
    }
    pre {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 5px;
        margin: 20px;
        white-space: pre-wrap; /* Since CSS 2.1 */
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
    }
</style>
