export function verifyNotFound(validate: any){
    if (typeof validate === "undefined") {
        throw { type: "Not Found", message: "Não encontrado"}
    }
    if (validate.isArray() && validate.length === 0){
        throw { type: "Not Found", message: "Não encontrado"}
    }
    if (typeof validate === "object" && validate.length === 0){
        throw { type: "Not Found", message: "Não encontrado"}
    }
    return true
}