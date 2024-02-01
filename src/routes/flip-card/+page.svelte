<script>
    import Card from "./card.svelte"
    import items from "./cards.json"

    let cards = items;

    const add_card = (event) => {
        event.preventDefault()
        const form = event.target
        const new_card = {
            front: {
                title: form["front-title"].value,
                content: form["front-content"].value,
            },
            back: {
                title: form["back-title"].value,
                content: form["back-content"].value,
            },
        };
        form.reset()
        cards = [...cards, new_card]
    };
</script>

<div class="horizon">
    {#each cards as card}
        <Card data={card}/>
    {/each}
</div>

<div class="add-card">
    <h1>Add new card</h1>
    <form action="" on:submit={add_card}>
        <table>
            <tr>
                <th>Front Title</th>
                <td><input type="text" name="front-title" /></td>
            </tr>
            <tr>
                <th>Front Content</th>
                <td><textarea name="front-content" id="" cols="30" rows="10"></textarea></td>
            </tr>
            <tr>
                <th>Back Title</th>
                <td><input type="text" name="back-title" /></td>
            </tr>
            <tr>
                <th>Back Content</th>
                <td><textarea name="back-content" id="" cols="30" rows="10"></textarea></td>
            </tr>
            <tr>
                <th>Add Card</th>
                <td><button type="submit">Add</button></td>
            </tr>
        </table>
    </form>
</div>


<style>
    .horizon {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }

</style>