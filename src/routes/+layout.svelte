<script>
    import Title from '$lib/Title.svelte'
    import Navbar from './navbar.svelte';
    import '../styles/global.css'
</script>

<header>
    <Title />
    <Navbar />
</header>
<main>
    <!-- page content -->
    <slot />
</main>
<footer>
    <p>
        Copyrigth &copy; 2023 Foggy App
    </p>
</footer>


<style>
    main {
        padding: 30px;
    }
    footer {
        background-color: #333;
        color: #fff;
        padding: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        position: relative;
        bottom: 0;
        width: 100%;
    }
</style>