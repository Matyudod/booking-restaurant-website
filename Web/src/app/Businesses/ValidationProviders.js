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
    statusValidation: {
        status: "number|min:-1|max:5",
    },
    tokenValidation: {
        token: "string|min:1",
    },
    bookingInfoDtoValidation: {
        customer_id: "number|min:1",
        table_id: "number|min:1",
        received_date: "date",
        payment_date: "date|optional",
    },
    imageUploadValidation: {
        url: "string|min:1",
        file_base64: "string|min:1",
        is_url: "boolean",
    },
    foodUpdateValidation: {
        id: "number|min:1",
        cooking_method_id: "number|min:1",
        food_group_id: "number|min:1",
        name: "string|min:1|max:255",
        price: "number|min:1",
        image: "string|min:1",
    },
};
