<script>
    // recieve data from parent component
    export let data // the data to be displayed in list of objects
    export let skip = [] // the keys to be skipped in table
    export let response = new Promise((resolve, reject) => {
        resolve(true)
    }) // the promise to be resolved or rejected
    export let dev = false // to be used in development mode
    // dev mode will not wait for send request to server

    // to be bind and use in parent component
    export let edited_data = {}
    export let deleted_data = {}

    let types = {}
    data[0] && Object.keys(data[0]).forEach(item => {
        types[item] = typeof data[0][item]
    })

    let keys = Object.keys(data[0]).filter(item => !skip.includes(item))
    let proccessedKeys = keys.map(item => {
                            item = item.replace('_', ' ')
                            item = item.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
                            return item        
                        })

    
    let tr_bg_color = ''

    const exit_editing_mode = (tr) => {
        tr.classList.remove('editing')
        tr.style.backgroundColor = tr_bg_color
        tr_bg_color = tr.style.backgroundColor
        tr.querySelectorAll('td').forEach(item => {
            item.contentEditable = false
        })
    }

    const tr_to_dict = (tr) => {
        let new_data = {}
        tr.querySelectorAll('td').forEach(item => {
            new_data[item.dataset.key] = item.innerText
        })
        return new_data
    }

    const dict_cast_type = (dict) => {
        Object.keys(dict).forEach(item => {
            if (types[item] == 'number') {
                dict[item] = Number(dict[item])
            }
        })
        return dict
    }

    const restore_data = (tr, dict) => {
        tr.querySelectorAll('td').forEach((item) => {
            item.innerText = dict[item.dataset.key]
        })
    }


    async function handle_dbclick ( event ) {
        let target = event.target
        let selected_tr = target.closest('tr')
        let temp = dict_cast_type(tr_to_dict(selected_tr))
        
        // enter editing mode
        selected_tr.classList.add('editing')
        selected_tr.style.backgroundColor = '#feffa9'
        selected_tr.querySelectorAll('td').forEach(item => {
            item.contentEditable = true
        })
        target.focus()

        // listen for enter key
        selected_tr.addEventListener('keydown', async event => {
            if (event.key == 'Enter') {
                let new_data = tr_to_dict(selected_tr)
                new_data = dict_cast_type(new_data)
                edited_data = new_data
                
                let res = await response
                if (res.ok || dev) {
                    exit_editing_mode(selected_tr)
                } else {
                    restore_data(selected_tr, temp)
                    exit_editing_mode(selected_tr)
                }
            } else if (event.key == 'Escape') {
                restore_data(selected_tr, temp)
                exit_editing_mode(selected_tr)
            } else if (event.key == 'Delete') {
                let confirm = window.confirm('Are you sure you want to delete this item?')
                // delete data
                deleted_data = temp

                let res = await response
                if (dev || (res && confirm)) {
                    selected_tr.remove()
                } else {
                    restore_data(selected_tr, temp)
                    exit_editing_mode(selected_tr)
                }
            }
        })
    }

</script>

{#if data.length > 0}

<table>
    <thead>
        <tr>
            {#each proccessedKeys as key}
                {#if key == 'Id'}
                <th hidden><div>{key}</div></th>
                {:else}
                <th><div>{key}</div></th>
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data as item}
        <tr>
            {#each keys as key}
                {#if key == 'id'}
                <td data-key="{key}" hidden><div>{item[key]}</div></td>
                {:else}
                <td data-key="{key}" on:dblclick={handle_dbclick}>
                    <div>{item[key]}</div>
                </td>
                {/if}
            {/each}
        </tr>
        {/each}
    </tbody>
</table>

{:else}
    <h1>No Data</h1>
{/if}




<style>

    table {
        border-collapse: collapse;
        width: 100%;
        min-width: 300px;
        text-align: center;
        
    }

    table td {
        border: 1px solid #333;
    }
    table th {
        border: 1px solid #eeeede;
    }

    table thead tr th {
        padding: 10px;
        background-color: #333;
        color: #fff;
        resize: horizontal;
        overflow: auto;
        
    }

    table tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    table tbody tr:hover {
        background-color: #eeeede;
    }

    td {
        padding: 10px;
    }

</style>