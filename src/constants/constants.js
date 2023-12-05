export const ROUTES={
    LOGIN:"/",
    DASHBOARD:"dashboard",

    CATEGORIES:"categories",
    CREATE_CATEGORY:"create",
    EDIT_CATEGORY:"edit",

    PRODUCTS:"products",
    CREATE_PRODUCT:"create",


    USERS:"users",
    PRODUCTS_NEWS:"products-news",

    REGISTER:"register",
    NOT_FOUND:"*"
}

export const conditionals=[
    {keyValue:"Ninguno",value:""},
    {keyValue:"Mayor a",value:">"},
    {keyValue:"Menor a",value:"<"},
    {keyValue:"Igual a",value:"="},
];

export const optionsFilter=[
    {name:"Ninguna",value:""},
    {name:"Precio",value:"realPrice"},
    {name:"Cantidad",value:"amount"},
    {name:"Categoría",value:"category"},
];


export const keyLocalStorage=process.env.REACT_APP_KEY_LOCAL;

export const URL_BASE=process.env.REACT_APP_URL_BASE;

export const HEADERS={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type":"application/json"
}