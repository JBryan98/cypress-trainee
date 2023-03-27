export const saveToken = (token) => {
    return `insert into token values('${token}')`
}

export const getToken = (token) => {
    return `select * from token where token = '${token}'`
}