const database = firebase.database();
let currentEvnt = 0;

let id = '';
let name = '';

export const userEnter = (_id, _name) => {
    id = _id;
    name = _name;
    return database.ref(`users/${id}`).set({
        name: name,
        events: {}
    }).then(() => {
        console.log('user enter success')
    });
};

export const logEvent = (data) => {
    const evtId = currentEvnt + 1;
    currentEvnt ++;
    database.ref(`users/${id}/events/${evtId}`).set(data).then(() => {
        console.log('event log success')
    })
};

export const getUserID = () => id;