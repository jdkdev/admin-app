<script>
    import { currentUser, ajax, ax } from '../../utl/app.js'
    import { onMount } from 'svelte'
    import { navigate } from "svelte-routing"
    import { format, fromUnixTime } from 'date-fns'
	import Field from '../../components/Field.svelte';

    let user = { email: 'jordan+10@knight.works', password: '', site: ''}
    let users = []
    let newUserView = false

    // move validation to some higher function so that mount becomes
    // onMount(() => getUsers())
    onMount(() => $currentUser.email ? getUsers() : navigate('/login'))

    let getUsers = async function(event, withDeleted = '') {
        let res = await ajax('GET', '/users' + withDeleted)
        if (['denied','unauthorized'].includes(res.error))
        return navigate("/login")

        users = res.filter(user => user.date_added !== null)
    }

    let deactivate = async function(id) {
        let res = await ax.destroy('/users/' + id)
        users = res.ok ? users.filter(u => u.id !== id) : users
    }

    let reactivate = async function(id) {
        let res = await ax.restore('/users/' + id)
        users = users.map(u => (u.id === id) ? res : u)
    }

    let save = async function() {
        let res = await ax.save('/users', user)
        users = res.error ? users : users.concat([res])
    }
</script>

<h1>Users</h1>
<button on:click={trigger => getUsers(trigger, '/all')}>Show Deleted</button>
<button on:click={getUsers}>Show Active</button>

<button on:click={trigger => newUserView = !newUserView}>New</button>
{#if newUserView}
    <div>
        <Field name="email" bind:value={user.email} />
        <Field name="password" type="password" bind:value={user.password} />
        <Field name="site" bind:value={user.site} />
        <button on:click={save}>Save</button>
    </div>
{/if}

<table>
    <tbody>
        {#each users as user (user.id)}
            <tr>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.site}</td>
                <td>{format(new Date(user.date_added), 'MM/dd/yyyy')}</td>
                <td>{user.is_deleted}</td>
                <td>
                    {#if user.is_deleted}
                        <button on:click={event => reactivate(user.id)}>Reactivate</button>
                    {:else}
                        <button on:click={trigger => deactivate(user.id)}>Deactivate</button>
                    {/if}
                </td>
            </tr>
        {:else}
            <div>No users found</div>
        {/each}
    </tbody>
</table>