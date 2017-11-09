const database = firebase.database();

let userId = '';
let username = '';

export const userEnter = (_userId, _username) => {
    userId = _userId;
    username = _username;
    database.ref('users/' + userId).set({
        name: name,
    }).then(console.log('data set success'));
};
