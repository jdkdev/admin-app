<script>
    import { auth } from 'frontier-frontend'
    import { Field } from 'frontier-components'
    import { goto } from '@sveltech/routify';

    let email = ''
    let password = ''
    function checkForm(event) {
        event.target.form.reportValidity()
    }

    function login(event) {
        event.preventDefault()
        //TODO if (event.target.valid) //add to frontier-frontend
        if (event.target.form.reportValidity())
        $auth.login({email, password}, '/', $goto)
    }
</script>

<div class="o-container-vertical">
    <div class="o-container o-flex o-flex--center">
        <div class="">
        <form>
            <Field name="email" bind:value={email} required="true" />
            <Field name="password" type="password" bind:value={password} required="true"/>
            <button on:mouseenter={event => event.target.form.reportValidity()} on:click={trigger => login(trigger)}> Sign In</button>
        </form>
        </div>
    </div>
</div>
