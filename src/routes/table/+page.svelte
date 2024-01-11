<script>
    import Table from './table.svelte'
    export let data
    let skip = []
    let response

    let edited_data = {}
    let deleted_data = {}

</script>

<Table data={data.props} 
    skip={skip} 
    dev={true}
    bind:edited_data={edited_data} 
    bind:deleted_data={deleted_data} 
/>


<style>


</style>