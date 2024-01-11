<script>
    let title = "Foggy App"

    const updateTitle = () => {
        title = "new title for this app"
    }

</script>

<div class="index">
    <h1>Hello</h1>
    <p>hohohoohohoho</p>
    <hr>
    <h2>{ title }</h2>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius doloribus in. Minus molestias debitis, deserunt dolorum consequuntur libero autem id velit. Distinctio cumque temporibus cum, deleniti voluptates veniam fugiat?
    </p>
    <input type="text" bind:value={title}>
    <button on:click={updateTitle}>change title</button>

    <ul>
        <li> <a href="/guides">Guides</a> </li>
        <li> <a href="/about">About</a>
    </ul>
</div>

<style>
    
    h1 {
        color: red;
    }
    .index {
        text-align: center;
        padding: 30px;
    }

</style>
