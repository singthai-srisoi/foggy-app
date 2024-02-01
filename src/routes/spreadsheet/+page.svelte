<script>
    let sheet = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10]
    ]
    let row_index = 0
    let col_index = 0

    const selected_style = {
        border: '2px solid green'
    }
    const unselected_style = {
        border: '2px solid transparent'
    }


    const handle_selected_cell = (event) => {
        let div = event.target
        let td = div.parentElement
        let tr = td.parentElement
        let table = tr.parentElement

        row_index = tr.rowIndex
        col_index = td.cellIndex

        let row = sheet[row_index]
        let cell = row[col_index]

        table.querySelectorAll('td').forEach(item => {
            console.table({
                row_index, col_index,
                item_row_index: item.parentElement.rowIndex,
                item_cell_index: item.cellIndex
            })
            let div = item.querySelector('div')
            if (item.parentElement.rowIndex == row_index && item.cellIndex == col_index ){
                div.contentEditable = true
                div.focus()
                // remove content editable border
                Object.assign(div.style, selected_style)
                return
            }
            div.contentEditable = false
            Object.assign(div.style, unselected_style)
        })
    }

    const handle_keydown = (event) => {
        // travel table using arrow keys
        let key = event.key
        let table = event.target
        let tr = table.rows[row_index]
        let td = tr.cells[col_index]
        let div = td.querySelector('div')

        if (key == 'ArrowUp') {
            row_index = Math.max(0, row_index - 1)
        } else if (key == 'ArrowDown') {
            row_index = Math.min(table.rows.length - 1, row_index + 1)
        } else if (key == 'ArrowLeft') {
            col_index = Math.max(0, col_index - 1)
        } else if (key == 'ArrowRight') {
            col_index = Math.min(tr.cells.length - 1, col_index + 1)
        } else if (key == 'Enter') {
            // enter editing mode
            div.contentEditable = true
            div.focus()
            // remove content editable border
            Object.assign(div.style, selected_style)
            return
        } else {
            return
        }

        // remove content editable border
        Object.assign(div.style, unselected_style)

        // travel to new cell
        let new_tr = table.rows[row_index]
        let new_td = new_tr.cells[col_index]
        let new_div = new_td.querySelector('div')
        new_div.contentEditable = true
        new_div.focus()
        // add content editable border
        Object.assign(new_div.style, selected_style)

        // prevent default
        event.preventDefault()

    }
</script>

<table on:keydown={handle_keydown}>
    <!-- A B C -->

    {#each sheet as row}
        <tr>
            {#each row as cell}
                <td>
                    <div on:click={handle_selected_cell} contenteditable="false">{cell}</div>
                </td>
            {/each}
        </tr>
    {/each}
</table>




<style>
    table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
    }

    td {
        padding: 0;
        border: 1px solid #ccc;
        overflow: hidden;
    }

    td div {
        max-width: 200px;
        padding: 5px;
        overflow: hidden;
        border: 2px solid transparent;
    }

    [contenteditable] {
        outline: 0px solid transparent;
    }
</style>