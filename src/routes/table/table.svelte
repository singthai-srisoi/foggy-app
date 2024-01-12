<script>

    // recieve data from parent component
    export let data = []
    export let skip = []
    export let response = new Promise((resolve, reject) => {
        resolve(true)
    })
    export let dev = false 
    export let search = true

    // to be bind and use in parent component
    export let edited_data = {}
    export let deleted_data = {}

    let types = {}
    let keys = []
    let proccessedKeys = []
    let tr_bg_color = ''
    let search_value = ''
    const temp_data = data

    const filter_key = (list, key) => {
        let new_list = []
        list.forEach(obj => {
            const value = Object.values(obj).join(' ')
            if (value.includes(key)) {
                new_list.push(obj)
            }
        })

        return {new_list, key}
    }

    const processing = (data, keys, proccessedKeys) => {
        if (Array.isArray(data)){
            if (data.length > 0) {
                data[0] && Object.keys(data[0]).forEach(item => {
                    types[item] = typeof data[0][item]
                })

                keys = Object.keys(data[0]).filter(item => !skip.includes(item))
                proccessedKeys = keys.map(item => {
                    item = item.replace('_', ' ')
                    item = item.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
                    return item        
                }) 
                                    
                return {data, keys, proccessedKeys}
            }
        } else {
            data = []
        }
    }
    
    const exit_editing_mode = (tr, success=true) => {
        tr.classList.remove('editing')

        let keyframes = [
            {backgroundColor: success ? '#c0ffb0' : '#ffb0b0'},
            {backgroundColor: tr_bg_color}
        ]
        let timing = {
            duration: 1000,
            iterations: 1
        }
        tr.animate(keyframes, timing)
        
        tr.style.backgroundColor = tr_bg_color
        tr_bg_color = tr.style.backgroundColor
        tr.querySelectorAll('td').forEach(item => {
            item.contentEditable = false
        })

        // refresh data
        data = temp_data
    }

    const tr_to_dict = (tr) => {
        let new_data = {}
        tr.querySelectorAll('td').forEach(item => {
            new_data[item.dataset.key] = item.innerText.trim()
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
        selected_tr.addEventListener('keydown', event => {
            if (event.key == 'Enter') {
                let new_data = tr_to_dict(selected_tr)
                new_data = dict_cast_type(new_data)
                edited_data = new_data
                
                let res = response
                if (res.ok || dev) {
                    selected_tr.querySelectorAll('td').forEach(item => {
                        item.innerText = new_data[item.dataset.key]
                    })
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

                let res = response
                if (dev || (res.ok && confirm)) {
                    selected_tr.remove()
                } else {
                    restore_data(selected_tr, temp)
                    exit_editing_mode(selected_tr)
                }
            }
        })
    }



    const handle_clear_search = () => {
        search_value = ''
    }

    // make sure table relaoading when data changed
    $: {
        let res = processing(data, keys, proccessedKeys)
        if (res) {
            data = res.data
            keys = res.keys
            proccessedKeys = res.proccessedKeys
        }
    }
    $: {
        if (search_value != '') {
            let res = filter_key(data, search_value)
            data = res.new_list
            search_value = res.key
        } else {
            data = temp_data
        }
    }
</script>


{#if search}
<input type="text" name="search" bind:value={search_value} placeholder="search">
<button on:click={handle_clear_search}>Clear</button>
{/if}
{#key data.length}
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
                <td data-key="{key}" hidden>{item[key]}</td>
                {:else}
                <td data-key="{key}" on:dblclick={handle_dbclick}>
                    {item[key]}
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
{/key}
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

    input[name="search"] {
        margin-bottom: 10px;
        margin-top: 10px;
    }

</style>