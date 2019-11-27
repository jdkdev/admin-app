<script>
	import { Router, Route } from "svelte-routing";
	import Nav from "./components/Nav.svelte";
    import {currentUser} from './stores.js'
</script>

<!--Template-->
<main>
{$currentUser.email}
    <div class="container">
        <Nav/>
    </div>
</main>
<style type="scss">
main {
    min-width: 350px;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-flow: column;
}
.container {
    max-width: 800px;
    margin: auto;
}

:global(button, input[type=submit]) {
    display: inline-block;
    text-align: center;
    letter-spacing: inherit;
    margin: 0;
    padding: 10px;
    vertical-align: middle;
    background: #0074d9;
    color: #fff;
    border: 0;
    border-radius: 4px;
    width: auto;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:active {
        background-color: #ddd;
    }
    &:focus {
        border-color: #666;
    }
}
</style>