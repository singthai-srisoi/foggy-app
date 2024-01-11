<script>
    import Form from "./form.svelte";
    import Table from "../table/table.svelte";

    let submited = {}
    let result = [
        // {id: 1, name: 'John', age: 20},
    ]

    let skip = []
    let edited_data = {}
    let deleted_data = {}

    $: {
        if (Object.keys(submited).length > 0) {
            result.push(submited)
            result = result
            submited = {}
        }
    }
</script>

<Form bind:form_data={submited}/>

<Table data={result} 
    skip={skip} 
    dev={true}
    bind:edited_data={edited_data} 
    bind:deleted_data={deleted_data} 
/>

<code>
    {JSON.stringify(result)}
</code>

<style>

    code {
        display: block;
        margin-top: 20px;
        padding: 10px;
        background-color: #eee;
    }

</style>