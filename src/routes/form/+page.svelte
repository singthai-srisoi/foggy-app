<script>
    import Form from "./form.svelte";
    import Table from "../table/table.svelte";

    let submited = {}
    let result = [
        // {id: 1, name: 'John', age: 20},
    ]
    let result_length = result.length


    let skip = []
    let edited_data = {}
    let deleted_data = {}
    let id = 0
    let code = ''

    const format_json = (json) => {
        // add \t and \n to json string
        let result = ''
        let indent = 0
        let last_char = ''
        for (let i = 0; i < json.length; i++) {
            let char = json[i]
            if (char == '{' || char == '[') {
                indent++
                result += char + '\n' + '\t'.repeat(indent)
            } else if (char == '}' || char == ']') {
                indent--
                result += '\n' + '\t'.repeat(indent) + char
            } else if (char == ',') {
                result += char + '\n' + '\t'.repeat(indent)
            } else {
                result += char
            }
            last_char = char
        }
        return result
    }

    $: {
        if (Object.keys(submited).length > 0) {
            submited.id = Number(id)
            result.push(submited)
            result = result
            result_length = result.length
            id = Number(id) + 1
            submited = {}
        }
    }
    $: {
        // handle edited data
        if (Object.keys(edited_data).length > 0) {
            let index = result.findIndex(item => item.id == edited_data.id)
            result[index] = edited_data
            result = result
            result_length = result.length
            edited_data = {}
        }
    }
    $: {
        // handle deleted data
        if (Object.keys(deleted_data).length > 0) {
            let index = result.findIndex(item => item.id == deleted_data.id)
            result.splice(index, 1)
            result = result
            result_length = result.length
            deleted_data = {}
        }
    }
    $: {
        code = format_json(JSON.stringify(result))
    }
</script>

<Form bind:form_data={submited} />

<!-- reload table when result change -->
{#key result_length}
<Table data={result} 
    skip={skip} 
    dev={true}
    bind:edited_data={edited_data} 
    bind:deleted_data={deleted_data} 
/>
{/key}
<!-- <Table data={result} 
    skip={skip} 
    dev={true}
    bind:edited_data={edited_data} 
    bind:deleted_data={deleted_data} 
/> -->

<pre>{code}</pre>

<style>

    pre {
        display: block;
        margin-top: 20px;
        padding: 10px;
        background-color: #eee;
    }

</style>