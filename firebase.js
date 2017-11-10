const database = firebase.database();
let currentEvnt = 0;

let id = '';
let name = '';
let enabled = false;

export const userEnter = (_id, _name) => {
    id = _id;
    name = _name;

    if(!enabled) return;
    return database.ref(`users/${id}`).set({
        name: name,
        events: {}
    }).then(() => {
        console.log('user enter success')
    });
};

export const logEvent = (data) => {
    if(!enabled) return;
    const evtId = currentEvnt + 1;
    currentEvnt ++;
    database.ref(`users/${id}/events/${evtId}`).set(data).then(() => {
        console.log('event log success')
    })
};

export const enableFirebase = () => {enabled = true;};

export const getUserID = () => id;