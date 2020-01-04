<script>
    import { auth, currentUser } from 'frontier-frontend'
    import Brand from '$c/Brand.svelte'
    import Nav from '$c/Nav.svelte'
    import { isActive, url, goto } from '@sveltech/routify'
    console.log($currentUser)

</script>
{#if $currentUser}
    <header class="c-header">
    <div class="o-container">
        <div class="c-nav-logo-holder">
            <Brand>
                <span>{$currentUser.email}</span>
            </Brand>
            <Nav />
        </div>
    </div>
    </header>
{:else}
    <header>Knightworks Admin</header>
{/if}
