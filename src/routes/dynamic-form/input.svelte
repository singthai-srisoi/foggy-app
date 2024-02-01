<script>
    export let field = {}

    if (field.validation == "" || field.validation == undefined || field.validation == null || field.validation == "none") {
        field.validation = ".*"
    }

</script>
<div>
{#if field.type == "text" }
    
    <label for={field.name}>{field.label}</label>
    <input type={field.type} name={field.name} placeholder={field.placeholder} pattern={field.validation} required={field.required} />

{:else if field.type == "number"}

    <label for={field.name}>{field.label}</label>
    <input type={field.type} name={field.name} placeholder={field.placeholder} 
        min={field.min} max={field.max} step={field.step} required={field.required} />
    
{:else if field.type == "select"}

    <label for={field.name}>{field.label}</label>
    <select name={field.name} required={field.required}>
        {#each field.options as option}
            {#if option.selected}
                <option value={option.value} selected>{option.label}</option>
            {:else}
                <option value={option.value}>{option.label}</option>
            {/if}
        {/each}
    </select>

{:else if field.type == "radio"}

    {#each field.options as option}
        <input type={field.type} name={field.name} value={option.value} />
        <label for={field.name}>{option.label}</label>
    {/each}

{:else if field.type == "checkbox"}

    {#each field.options as option}
        <input type={field.type} name={field.name} value={option.value} />
        <label for={field.name}>{option.label}</label>
    {/each}

{:else if field.type == "textarea"}

    <label for={field.name}>{field.label}</label>
    <textarea name={field.name} placeholder={field.placeholder} required={field.required}></textarea>

{:else if field.type == "hidden"}

    <input type={field.type} name={field.name} value={field.value} />

{:else if field.type == "submit"}

    <button type={field.type}>{field.label}</button>

{:else if field.type == "date"}

    <label for={field.name}>{field.label}</label>
    <input type={field.type} name={field.name} required={field.required} />

{:else if field.type == "file"}

    <label for={field.name}>{field.label}</label>
    <input type={field.type} name={field.name} required={field.required} />

{/if}
</div>


<style>
    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    label {
        margin-bottom: 5px;
    }

    input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    select {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    textarea {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

</style>