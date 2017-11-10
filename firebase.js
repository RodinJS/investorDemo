import {device}  from 'Device.js';

const database = firebase.database();
let currentEvnt = 0;

let id = '';
let name = '';
let enabled = false;

export const userEnter = (_id, _name) => {
    id = _id;
    name = _name;

    let os = 'unknown';

    if(device.isMac) os = 'OSX';
    if(device.iOSVersion) os = device.iOSVersion;
    if(device.isAndroid) os = 'android';

    const data = {
        name,
        deviceInfo: {
            OS: os,
            browser: device.browser
        },
        emailSent: false,
        events: {}
    };

    if(!enabled) return;
    return database.ref(`users/${id}`).set(data).then(() => {
        console.log('user enter success')
    });
};

export const logEvent = (data) => {
    if(!enabled) return;
    const evtId = currentEvnt + 1;
    currentEvnt ++;
    database.ref(`users/${id}/events/${evtId}`).set(data).then(() => {
        console.log('event log success');
    });

    if(data.type === 'emailsend') {
        setEmailSent();
    }
};

export const setEmailSent = () => {
    const updates = {};
    updates['/emailSent'] = true;
    database.ref(`users/${id}`).update(updates).then(() => {
        console.log('event log success');
    });
};

export const enableFirebase = () => {enabled = true;};

export const getUserID = () => id;