<script>
    import { beforeUpdate, onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import { ajax } from "../../utl/functions.js";
    import Login from "../Login.svelte";

    let users = []
	beforeUpdate(() => {
        let currentUser = localStorage.getItem('currentUser')
        if (! currentUser) {
            navigate("/login", { replace: true });
        }
    });
    onMount(() => {
        let url = 'http://localhost:3132/api/v1/users'
        // let users = (async() => await ajax('GET', url))()
        ajax('GET', url).then(response => users = response)
    })
</script>

<h1>Admin Side</h1>
<p>Welcome to the Admin side</p>

{#each users as user}
    <li>{user.email}</li>
{/each}