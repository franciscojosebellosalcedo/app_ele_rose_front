export const ROUTES={
    LOGIN:"/",
    DASHBOARD:"dashboard",
    CATEGORIES:"categories",
    CREATE_CATEGORY:"create",
    EDIT_CATEGORY:"edit",
    USERS:"users",
    PRODUCTS:"products",
    PRODUCTS_NEWS:"products-news",

    REGISTER:"register",
    NOT_FOUND:"*"
}

export const URL_BASE=process.env.REACT_APP_URL_BASE;

export const HEADERS={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type":"application/json"
}