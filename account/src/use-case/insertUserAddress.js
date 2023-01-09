export function createUserAddressUseCase(logradouro, numero, complemento, bairro, cep, cidade, uf){
    const address = {
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        uf: uf
    }
    return address;
}

export function insertUserAddressUseCase(array, email, address){
    let found = 0;
    array.forEach(function(item) {
        if ((item.email).includes(email)){
            item.address = address;
            found++;
        }
    });
    if (found === 0){
        console.log("Erro ao adicionar endereço. E-mail não encontrado.");
    } else {
        console.log("Endereço adicionado com sucesso.")
    }
}