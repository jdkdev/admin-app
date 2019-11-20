<script>
    import { navigate } from "svelte-routing";
    import { postData } from "../utl/functions.js";
    let email = 'jordan+10@knight.works'
    let password = 'test'

    async function signIn() {
		try {
            const data = await postData('https://auth.knight.works/api/v1/login', {email, password})
            console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
            // set header
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            localStorage.setItem('currentUser', JSON.stringify(data.user))
            navigate("/dashboard", { replace: true });
		} catch (e) {
			console.error(e);
		}
    }
</script>
<section>
    <input type="email" name="email" placeholder="Email" value="{email}">
    <input type="password" name="password" placeholder="Password" value="{password}">
    <input  on:click='{()=> signIn()}' type="submit" value="Sign In">
</section>