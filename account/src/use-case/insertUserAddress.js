export function createUserAddressUseCase(logradouro, numero, complemento, bairro, cep, cidade, uf) {
  const address = {
    logradouro,
    numero,
    complemento,
    bairro,
    cep,
    cidade,
    uf,
  };
  return address;
}

export function insertUserAddressUseCase(array, email, address) {
  let found = 0;
  array.forEach((item) => {
    if ((item.email).includes(email)) {
      // eslint-disable-next-line no-param-reassign
      item.address = address;
      // eslint-disable-next-line no-plusplus
      found++;
    }
  });
  if (found === 0) {
    console.log('Erro ao adicionar endereço. E-mail não encontrado.');
  } else {
    console.log('Endereço adicionado com sucesso.');
  }
}
