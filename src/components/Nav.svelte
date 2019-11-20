<script>
	import { Router, Route } from "svelte-routing";
	import NavLink from "./NavLink.svelte";
	import Home from "../routes/Home.svelte";
	import Login from "../routes/Login.svelte";
	import Dashboard from "../routes/admin/Dashboard.svelte";
  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<!--Template-->
<Router url="{url}">
  <nav>
	<NavLink to="/">Home</NavLink>
	<NavLink to="login">Login</NavLink>
	<NavLink to="dashboard">Dashboard</NavLink>
  </nav>
	<Route path="/" component="{Home}" />
	<Route path="/login" component="{Login}" />
	<Route path="/dashboard" component="{Dashboard}" />
</Router>