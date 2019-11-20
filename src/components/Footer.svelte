<script>
    import { beforeUpdate, onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import Login from "../Login.svelte";

	beforeUpdate(() => {
        let currentUser = localStorage.getItem('currentUser')
        if (! currentUser) {
            navigate("/login", { replace: true });
        }
	});
</script>

<h1>Admin Side</h1>
<p>Welcome to the Admin side</p>

<Login/>