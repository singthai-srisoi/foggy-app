<script>
    export let data;

    const user = data.props[0]
</script>

<div class="directory">
    <ul>
        <li><a href="/users">User</a></li>
        <li><a href="/users/{ user.id }">{ user.name }</a></li>
    </ul>
</div>
<div>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
            </tr>
        </tbody>
    </table>

</div>

<style>

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

    .directory {
        list-style-type: none;
    }

    .directory ul li a {
        text-decoration: none;
        color: #333;
    }

    .directory ul li a:hover {
        color: #ccc;
    }

    .directory ul li {
        padding-right: 10px;
    }

    /* add a '>' after except the last child */
    .directory ul li:not(:last-child)::after {
        content: '>';
        padding-left: 10px;
        color: #333;
    }

    .directory ul {
        display: flex;
        flex-direction: row;
        justify-content: left;
        list-style-type: none;
        margin: 0;
        padding: 10px;
    }



</style>