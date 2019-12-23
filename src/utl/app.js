import { writable, get } from 'svelte/store';
import { navigate } from "svelte-routing"
import env from './env.js'

export let apiUrl = env.apiUrl
export let authUrl = env.authUrl
export let apiToken = writable('Bearer ' + localStorage.getItem('access') || '')
export let currentUser = writable(JSON.parse(localStorage.getItem('currentUser')) || {})

// export let login = function (email, password) {
//     return ajax('POST', env.authUrl + 'login', {email, password})
// }

export let logout = function() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('currentUser')
    currentUser.set({})
    return navigate("/", { replace: true })
}

let authorization = get(apiToken)

export const save = async function(url = '', data = {}) {
    // Default options are marked with *
    console.log({data})
    const defaultOpts = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }

    let fetchUrl = url.charAt(0) === '/' ? env.apiUrl + url : url
    const response = await fetch(fetchUrl, defaultOpts)

    return await response.json(); // parses JSON response into native JavaScript objects
}
export const destroy = async function(url = '', data = {}) {
    // Default options are marked with *
    let defaultOpts = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': authorization
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // params: method === 'GET' ? JSON.stringify(data) : '{}', // body data type must match "Content-Type" header
        // body: method === 'GET' ? '{}' : JSON.stringify(data) // body data type must match "Content-Type" header
    }

    let fetchUrl = url.charAt(0) === '/' ? env.apiUrl + url : url
    const response = await fetch(fetchUrl, defaultOpts)
    return await response.json() // parses JSON response into native JavaScript objects
}
export const restore = async function(url = '', data = {}) {
    // Default options are marked with *
    let defaultOpts = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': authorization
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // params: method === 'GET' ? JSON.stringify(data) : '{}', // body data type must match "Content-Type" header
        // body: method === 'GET' ? '{}' : JSON.stringify(data) // body data type must match "Content-Type" header
    }

    let fetchUrl = url.charAt(0) === '/' ? env.apiUrl + url + '/restore' : url
    const response = await fetch(fetchUrl, defaultOpts)
    return await response.json() // parses JSON response into native JavaScript objects
}
export const ax = {
    destroy: destroy,
    restore: restore,
    save: save,
}

export const ajax = async function(method = 'GET', url = '', data = {}) {
    // Default options are marked with *
    let defaultOpts = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': authorization
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // params: method === 'GET' ? JSON.stringify(data) : '{}', // body data type must match "Content-Type" header
        // body: method === 'GET' ? '{}' : JSON.stringify(data) // body data type must match "Content-Type" header
    }

    let fetchUrl = url.charAt(0) === '/' ? env.apiUrl + url : url
    const response = await fetch(fetchUrl, defaultOpts)
    return await response.json() // parses JSON response into native JavaScript objects
}


export let login = async function(url = '', data = {}) {
  // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return await response.json(); // parses JSON response into native JavaScript objects
}