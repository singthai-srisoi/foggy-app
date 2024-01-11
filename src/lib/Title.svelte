<script>
    export let title = "Foggy App"
</script>

<div class="title">
    <img src="/logo.jpg" alt="site logo">
    <h1>{ title }</h1>
</div>

<style>
    .title {
        padding: 0;
        display: flex;
        flex-direction: row;
    }
    .title h1 {
        margin-top: 25px;
    }
    img {
        width: 100px;
    }
</style>