export const ROUTES={
    LOGIN:"/",
    DASHBOARD:"dashboard",

    //string url categories
    CATEGORIES:"categories",
    CREATE_CATEGORY:"create",
    EDIT_CATEGORY:"edit",

    //string url products
    PRODUCTS:"products",
    CREATE_PRODUCT:"create",
    NO_CATEGORIES_PRODUCTS:"no-categories",

    //string url user
    USERS:"users",

    //string url collections
    COLLECTIONS:"collections",
    CREATE_COLLECTION:"create",
    EDIT_COLLECTION:"edit",

    //string url slider
    SLIDER:"slider",
    ADD_ELEMENT_SLIDER:"add",

    //string url clients
    CLIENTS:"clients",

    //string url orders
    ORDER:"orders",
    ORDER_DETAILS:"details",

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
    {name:"Nuevos",value:true},
    {name:"Anterior",value:false},
];

export const optionsFilterOrders=[
    {name:"Pendiente",value:"Pending"},
    {name:"En proceso",value:"In process"},
    {name:"Enviado",value:"Sent"},
    {name:"Finalizado",value:"Finalized"},
    {name:"Cancelado",value:"Canceled"},
    {name:"Ninguno",value:null},
];

export const typeElementSlider=["Producto","Colección"];


export const keyLocalStorage=process.env.REACT_APP_KEY_LOCAL;

export const PUBLIC_KEY_UPLOADCARE=process.env.REACT_APP_PUBLIC_KEY_UPLOADCARE;

export const SECRET_KEY_UPLOADCARE=process.env.REACT_APP_SECRET_KEY_UPLOADCARE;


export const URL_BASE=process.env.REACT_APP_URL_BASE;

export const HEADERS={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type":"application/json"
}