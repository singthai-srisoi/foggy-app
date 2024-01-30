<script>
    import { onMount } from "svelte";

    export let field = {}

    let type = [
        {
            label: "text",
            value: "text"
        },
        {
            label: "number",
            value: "number"
        },
        {
            label: "select",
            value: "select"
        },
        {
            label: "textarea",
            value: "textarea"
        },
        {
            label: "hidden",
            value: "hidden"
        },
        {
            label: "submit",
            value: "submit"
        },
        {
            label: "date",
            value: "date"
        },
        {
            label: "file",
            value: "file"
        }
    ]
    
    // append selected type to field
    type.forEach(item => {
        if (item.value == field.type) {
            item.selected = true
        }
    })

    const handle_input = (event) => {
        field[event.target.name] = event.target.value
        // for checkbox
        if (event.target.type == "checkbox") {
            field[event.target.name] = event.target.checked
        }
    }

    const options_str = (options) => {
        if (!options) {
            return ''
        }
        return options.map((item) => {
            return `${item.label}:${item.value}:${item.selected}`
        }).join('\n')
    }

    const handle_option = (event) => {
        let str = event.target.value
        let options = str.split('\n')
        options = options.map((item) => {
            let arr = item.split(':')
            return {
                label: arr[0],
                value: arr[1],
                selected: arr[2] == "true" ? true : false
            }
        })
        field.options = options
    }

    $:{
        if (field.type == "number") {
            field.min = field.min || 0
            field.max = field.max || 100
            field.step = field.step || 1
        } else {
            // remove min, max, step
            delete field.min
            delete field.max
            delete field.step
        }

        if (field.type == "select") {
            field.options = field.options || []
        } else {
            // remove options
            delete field.options
        }

        if (field.type == "text") {
            field.validation = field.validation || "text"
        } else {
            // remove validation
            delete field.validation
        }
    }





</script>

<details>
    <summary>{ field.label }</summary>
    <!-- edit input here -->

    <table>
        <tr>
            <td>
                <label for="type">type</label>
            </td>
            <td>
                <select name="type" on:change={handle_input}>
                    {#each type as item}
                        <option value={item.value} selected={item.selected}>{item.label}</option>
                    {/each}
                </select>
            </td>
        </tr>

        <tr>
            <td>
                <label for="label">label</label>
            </td>
            <td>
                <input type="text" name="label" value={field.label} on:change={handle_input}/>
            </td>
        </tr>

        <tr>
            <td>
                <label for="placeholder">placeholder</label>
            </td>
            <td>
                <input type="text" name="placeholder" value={field.placeholder} on:change={handle_input}/>
            </td>            
        </tr>

        <tr>
            <td>
                <label for="name">name</label>
            </td>
            <td>
                <input type="text" name="name" value={field.name} on:change={handle_input}/>
            </td>            
        </tr>

        <tr>
            <td><label for="required">required</label></td>
            <td>
            {#if field.required}
                <input type="checkbox" name="required" checked
                    on:change={handle_input}
                />
            {:else}
                <input type="checkbox" name="required"
                    on:change={handle_input}
                />
            {/if}
            </td>
        </tr>

        {#if field.type == "number"}
            <tr>
                <td>
                    <label for="min">min</label>
                </td>
                <td>
                    <input type="number" name="min" value={field.min} on:change={handle_input}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="max">max</label>
                </td>
                <td>
                    <input type="number" name="max" value={field.max} on:change={handle_input}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="step">step</label>
                </td>
                <td>
                    <input type="number" name="step" value={field.step} on:change={handle_input}/>
                </td>
            </tr>
        {:else if field.type == "text"}
            <tr>
                <td>
                    <label for="validation">Validation</label>
                </td>
                <td>
                    <input type="text" name="validation" value={field.validation} on:change={handle_input}/>
                </td>
            </tr>
        {:else if field.type == "select"}
            <tr>
                <td>
                    <label for="options">options</label>
                </td>
                <td>
                    <textarea name="options" cols="30" rows="10" on:change={handle_option}>{ options_str(field.options) }</textarea>
                </td>
            </tr>
        {/if}



    </table>




</details>

<style>
    details {
        margin: 1rem 0;
    }

    summary {
        cursor: pointer;
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

    table {
        border-collapse: collapse;
    }

    table tr td {
        padding: 5px;
    }

    table tr td:first-child {
        text-align: right;
    }

    table tr td:last-child {
        text-align: left;
    }


</style>