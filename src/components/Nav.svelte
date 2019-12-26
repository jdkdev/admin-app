<script>
    import { currentUser, logout } from '../utl/app.js'
    import { beforeUpdate, onMount, setContext, getContext } from 'svelte'
    import { Router } from 'svelte-router-spa'
    // import { routes } from '../../routes'
    // import Sec from '../components/Sec.svelte'
	import NavLink from './NavLink.svelte'
	import Home from '../routes/Home.svelte'
	import Login from '../routes/Login.svelte'
	import Example from '../routes/Example.svelte'
    import Dashboard from '../routes/admin/Dashboard.svelte'

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = ""

</script>

<!--Template-->
<Router {url} >
    {#if $currentUser.id}
        <Sec>
            <nav class='m10 left'>
                {#if $currentUser.email}
                    <span>{$currentUser.email || ''}</span>
                    <a href='/' on:click={logout}>Logout</a>
                {/if}
            </nav>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='dashboard'>Dashboard</NavLink>
                <NavLink to='example'>Example</NavLink>
            </nav>
        </Sec>
    {:else}
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='login'>Login</NavLink>
        </nav>
    {/if}
	<Route path='/' component={Home} />
	<Route path='/login' component={Login} />
	<Route path='/dashboard' component={Dashboard} />
	<Route path='/example' component={Example} />
</Router>