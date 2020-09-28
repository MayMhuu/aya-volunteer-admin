const initialState = {
    "id": 1,
    "name": "May",
    "phone": "09264297868",
    "email": "maymyatmon290@gmail.com",
    "identification": "123456",
    "gender": 1,
    "address": "Yangon",
    "point": 0,
    "username": "root",
    "role": 1,
    "group": null,
    "source": 1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_INFO':
            return action.data;
        default:
            return state;
    }
}