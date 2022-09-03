export function verifyNotFound(validate: any){
    if (!validate){
        throw { type: "Not Found", message: "Não encontrado"}
    }
}