module.exports = {
    loginValidation: {
        username: "string|min:1|max:255",
        password: "string|min:8|max:255",
    },
    signupValidation: {
        name: "string|min:1|max:255",
        email: "string|min:3|max:255",
        username: "string|min:1|max:255",
        password: "string|min:8|max:255",
        birthday: "date",
        is_admin: "boolean|optional|default:false",
    },
    userUpdateValidation: {
        id: "number|min:1",
        name: "string|min:1|max:255",
        email: "string|min:3|max:255",
        birthday: "date",
    },
    pageValidation: {
        page: "number|min:1|default:1",
        size: "number|min:1|default:10",
        field: "string|min:1|optional|max:255",
        is_reverse_sort: "boolean|optional|default:false",
    },
    idValidation: {
        id: "number|min:1|default:0",
    },
    tokenValidation: {
        token: "string|min:1",
    },
};
