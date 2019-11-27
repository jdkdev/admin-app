import { writable } from 'svelte/store';

let user = JSON.parse(localStorage.getItem('currentUser')) || {}

export const currentUser = writable(user,
    () => console.log('user', 'no more subscribers')
);

let accessToken = 'Bearer ' + localStorage.getItem('access') || ''
export const token = writable(accessToken,
    () => console.log(accessToken, 'no more subscribers')
);