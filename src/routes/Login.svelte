<script>
    import {currentUser} from '../stores.js'
	import Field from "../components/Field.svelte";
    import { navigate } from "svelte-routing";
    import { postData } from "../utl/functions.js";

    let email = 'jordan+10@knight.works'
    let password = 'test'

    async function signIn() {
		try {
            const data = await postData('https://auth.knight.works/api/v1/login', {email, password})
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            localStorage.setItem('currentUser', JSON.stringify(data.user))
            currentUser.set(data.user)

            navigate("/dashboard", { replace: true });
		} catch (e) {
			console.error(e);
		}
    }
</script>
<section>
    <Field name="email" value={email} />
    <Field name="password" type="password" value={password} />
    <input  on:click='{()=> signIn()}' type="submit" value="Sign In">
</section>