<script>
    export let form_data = {}

    const submit_handler = (event) => {
        event.preventDefault()       
        form_data = Object.fromEntries(new FormData(event.target))
        event.target.reset()
    }

    // travel through form using enter key
    // when reach submit button, submit and jump back to the first element
    let current_index = 0
    const handle_keydown = (event) => {
        let form = event.target.closest('form')
        let target = event.target
        let form_elements = form.elements
        let index = Array.prototype.indexOf.call(form_elements, target)
        let next_index = index + 1
        if (event.key == "Enter") {
            event.preventDefault()
            if (next_index == form_elements.length) {
                form_data = Object.fromEntries(new FormData(form))
                form.reset()
                form_elements[0].focus()
                current_index = 0
            } else {
                form_elements[next_index].focus()
                current_index = next_index
            }
        } else if (event.key == "Escape") {
            form.reset()
            form_elements[0].focus()
            current_index = 0
        } else if (event.key == "ArrowUp") {
            // down key and right travel to next
            event.preventDefault()
            if (index == 0) {
                form_elements[form_elements.length - 1].focus()
                current_index = form_elements.length - 1
            } else {
                form_elements[index - 1].focus()
                current_index = index - 1
            }
        } else if (event.key == "ArrowDown") {
            // up key and left travel to previous
            event.preventDefault()
            if (index == form_elements.length - 1) {
                form_elements[0].focus()
                current_index = 0
            } else {
                form_elements[index + 1].focus()
                current_index = index + 1
            }
        }
    }



</script>

<form action="" on:submit={submit_handler} on:keydown={handle_keydown}>
    <input type="text" placeholder="name" name="name">
    <input type="text" placeholder="age" name="age">

    <button type="submit">Add</button>
</form>