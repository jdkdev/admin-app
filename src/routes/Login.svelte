<script>
    import { apiToken, currentUser, login} from '../utl/app.js'
	import Field from '../components/Field.svelte';
    import { navigate } from 'svelte-routing';

    let email = 'jordan+10@knight.works'
    let password = 'test'

    async function signIn() {
		try {
            const data = await login('https://auth.knight.works/api/v1/login', {email, password})
            // const data = await login('http://localhost:3132/api/v1/login', {email, password})
            $apiToken = 'Bearer ' + data.accessToken

            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            localStorage.setItem('currentUser', JSON.stringify(data.user))
            $currentUser = data.user

            navigate('/dashboard', { replace: true });
		} catch (e) {
			console.error(e);
		}
    }
</script>
<vstack>
    <Field name="email" bind:value={email} />
    <Field name="password" type="password" bind:value={password} />
    <input  on:click={()=> signIn()} type="submit" value="Sign In">
</vstack>