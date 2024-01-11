<script>
    export let form_data = {}

    const submit_handler = (event) => {
        event.preventDefault()       
        form_data = Object.fromEntries(new FormData(event.target))
        event.target.reset()
    }

    // travel through form using enter key
    // when reach submit button, submit and jump back to the first element
    const handle_keydown = (event) => {
        let form = event.target.closest('form')
        if (event.key == "Enter") {
            event.preventDefault()
            let target = event.target
            let form_elements = form.elements
            let index = Array.prototype.indexOf.call(form_elements, target)
            let next_index = index + 1
            if (next_index == form_elements.length) {
                form_data = Object.fromEntries(new FormData(form))
                form.reset()
                form_elements[0].focus()
            } else {
                form_elements[next_index].focus()
            }
        }
    }



</script>

<form action="" on:submit={submit_handler} on:keydown={handle_keydown}>
    <input type="text" placeholder="name" name="name">
    <input type="text" placeholder="age" name="age">

    <button type="submit">Add</button>
</form>