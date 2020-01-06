<script>
    import { auth } from 'frontier-frontend'
    import { Field } from 'frontier-components'
    import { goto } from '@sveltech/routify';

    let email = ''
    let password = ''
</script>

<div class="o-container-vertical">
    <div class="o-container o-flex o-flex--center">
        <div class="">
            <Field name="email" bind:value={email} />
            <Field name="password" type="password" bind:value={password} />
            <input  on:click={trigger => $auth.login({email, password}, '/', $goto)} type="submit" value="Sign In">
        </div>
    </div>
</div>
