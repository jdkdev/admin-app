import {apiToken} from './app.js'
import { get } from 'svelte/store'

let token = get(apiToken)

export const ajax = async function(method = 'GET', url = '', opts = {headers: {authorization: token}}) {
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
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    }
    opts = {...defaultOpts, ...opts}

    const response = await fetch(url, opts)
    return await response.json() // parses JSON response into native JavaScript objects
}

export const postData = async function(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
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
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}