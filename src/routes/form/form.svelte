<script>
    export let form_data = {}

    const get_next_visible_index = (index, form_elements) => {
        let next_index = index
        next_index++
        if (next_index == form_elements.length) {
            next_index = 0
        } 
        if (form_elements[next_index].type == "hidden" || form_elements[next_index].hidden) {
            next_index = get_next_visible_index(next_index, form_elements)
        }
        return next_index
    }

    const get_previous_visible_index = (index, form_elements) => {
        let prev_index = index
        prev_index--
        if (prev_index == -1) {
            prev_index = form_elements.length - 1
        } 
        if (form_elements[prev_index].type == "hidden" || form_elements[prev_index].hidden) {
            prev_index = get_previous_visible_index(prev_index, form_elements)
        }
        return prev_index
    }

    const submit_handler = (event) => {
        event.preventDefault() 
        const target = event.target   
        form_data = Object.fromEntries(new FormData(target))
        target.reset()
        const form = event.target.closest('form')
        form.elements[get_next_visible_index(0, form.elements)].focus()
    }

    // travel through form using enter key
    // when reach submit button, submit and jump back to the first element
    const handle_keydown = (event) => {
        // filter out the hidden input
        let form = event.target.closest('form')
        let target = event.target
        let form_elements = form.elements
        let index = Array.prototype.indexOf.call(form_elements, target)
        let next_index = get_next_visible_index(index, form.elements)
        let prev_index = get_previous_visible_index(index, form.elements)
        if (event.key == "Enter") {
            event.preventDefault()
            if ((index + 1) == form_elements.length) {
                form.requestSubmit()
            }
            form.elements[next_index].focus()
        } else if (event.key == "Escape") {
            form.reset()
            form_elements[0].focus()
        } else if (event.key == "ArrowUp") {
            // down key and right travel to next
            event.preventDefault()
            form_elements[prev_index].focus()
        } else if (event.key == "ArrowDown") {
            // up key and left travel to previous
            event.preventDefault()
            form_elements[next_index].focus()
        }
    }

</script>

<form action="" on:submit={submit_handler} on:keydown={handle_keydown} autocomplete="off">
    <input type="hidden">

    <input type="text" placeholder="name" name="name" required>
    <input type="text" placeholder="age" name="age">

    <button type="submit">Add</button>
</form>