<script>
    import item from './form.json'
    import Input from './input.svelte';
    import EditInput from './editInput.svelte';

    let form = item

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

    const add_field = () => {
        const new_field = {
            type: 'text',
            name: '',
            label: '',
            placeholder: '',
            value: ''
        }
        form = [...form, new_field]
    }

    // print the json string
    let code = format_json(JSON.stringify(form))

    // toggle view and edit
    let view = true
    const toggle_view = () => {
        if (view) {
            view = false
        } else {
            view = true
        }
    }

    $: {
        // console.log(form)
        code = format_json(JSON.stringify(form))
    }

</script>

<h1>This is a dynamic form</h1>

{#if view}
<div class="nav">
    <button class="toggle" on:click={toggle_view}>Edit</button>
</div>
<div class="view-form">
    <form action="" on:submit={e => e.preventDefault()}>
        {#each form as field}
            <Input field={field} />
        {/each}
    </form>
</div>
{:else}
<div class="nav">
    <button class="toggle" on:click={toggle_view}>View</button>
</div>
<div class="edit-form">
    Edit form here
    {#each form as field}
        <EditInput bind:field={field} />
    {/each}
    <button on:click={add_field}>Add Field</button>
</div>
{/if}
<pre class="form-json">{ code }</pre>

<style>
    pre {
        display: block;
        margin-top: 20px;
        padding: 10px;
        background-color: #eee;
    }
</style>