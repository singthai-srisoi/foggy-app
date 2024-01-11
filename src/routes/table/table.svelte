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
    // console.table(types)

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
                
                // wait for promise to be completed
                let res = await response

                if (res.ok || dev) {
                    // exit editing mode
                    exit_editing_mode(selected_tr)
                } else {
                    // restore data
                    restore_data(selected_tr, temp)
                    // exit editing mode
                    exit_editing_mode(selected_tr)
                }
            } else if (event.key == 'Escape') {
                // restore data
                restore_data(selected_tr, temp)
                // exit editing mode
                exit_editing_mode(selected_tr)
            } else if (event.key == 'Delete') {
                
                // alert before delete
                let confirm = window.confirm('Are you sure you want to delete this item?')
                // delete data
                deleted_data = temp

                // wait for promise to be completed
                let res = await response
                
                if (dev || (res && confirm)) {
                    // remove tr
                    selected_tr.remove()
                } else {
                    // restore data
                    restore_data(selected_tr, temp)
                    // exit editing mode
                    exit_editing_mode(selected_tr)
                }
            }
        })
    }

    // $: console.table(deleted_data)
    // $: console.log(types)
</script>

{#if data.length > 0}

<table>
    <thead>
        <tr>
            {#each proccessedKeys as key}
                {#if key == 'Id'}
                <th hidden>{key}</th>
                {:else}
                <th>{key}</th>
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




<style>

    table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
    }

    table thead tr th {
        padding: 10px;
        background-color: #333;
        color: #fff;
    }

    table tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    td {
        padding: 10px;
    }

</style>