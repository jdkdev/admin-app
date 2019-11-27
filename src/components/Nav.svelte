<script>
    import { beforeUpdate, onMount, setContext, getContext } from 'svelte';
    import {currentUser} from '../stores.js'
    import Sec from '../components/Sec.svelte'
	import { Router, Route } from "svelte-routing";
	import NavLink from "./NavLink.svelte";
	import Home from "../routes/Home.svelte";
	import Login from "../routes/Login.svelte";
	import Example from "../routes/Example.svelte";
	import Dashboard from "../routes/admin/Dashboard.svelte";
    // Used for SSR. A falsy value is ignored by the Router.
    export let url = "";
</script>

<!--Template-->
<Router {url}>
    {#if $currentUser.id}
        <Sec>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="dashboard">Dashboard</NavLink>
                <NavLink to="example">Example</NavLink>
            </nav>
            <div style="font-size:10px;">User: {$currentUser.email}</div>
        </Sec>
    {:else}
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="login">Login</NavLink>
        </nav>
    {/if}
	<Route path="/" component="{Home}" />
	<Route path="/login" component="{Login}" />
	<Route path="/dashboard" component="{Dashboard}" />
	<Route path="/example" component="{Example}" />
</Router>