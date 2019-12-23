import { writable } from 'svelte/store';

let userData = JSON.parse(localStorage.getItem('currentUser')) || {}

export const user = writable(userData,
    () => console.log('userData', 'vlad rocks')
)

let accessToken = 'Bearer ' + localStorage.getItem('access') || ''

export const token = writable(accessToken,
    () => console.log(accessToken, 'vlad rocks')
)