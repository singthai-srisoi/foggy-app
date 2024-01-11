<script>
    export let data;
</script>


<div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {#each data.props as user}
            
                <tr>
                    <td><a href="users/{ user.id }">{user.name}</a></td>
                    <td>{user.email}</td>
                </tr>

            {/each}
        </tbody>
    </table>
</div>

<style>
    /* remove styling of a */
    a {
        text-decoration: none;
        color: #333;
    }

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

    

</style>