<script>
    import {currentUser, token} from '../../stores.js'
    import { beforeUpdate, onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import { ajax } from "../../utl/functions.js";
    import Login from "../Login.svelte";

    let users = []
	beforeUpdate(() => {
    });
    onMount(() => {
        if (! $currentUser.email) {
            return navigate("/login", { replace: true });
        }
        ajax('GET', 'users').then(response => {
            if (['denied','unauthorized'].includes(response.error)) {
                console.log(response.error)
                return navigate("/login", { replace: true });
            } else {
                users = response
            }
        })
    })

</script>

<h1>Admin Side</h1>
{#each users as user}
    <li>{user.email}</li>
{/each}