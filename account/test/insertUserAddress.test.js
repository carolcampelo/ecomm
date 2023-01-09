import { accounts, createUserUseCase } from "../src/use-case/createUserAccount.js";
import { searchUserAccountByEmailUseCase } from "../src/use-case/searchUserAccountByEmail.js";
import { createUserAddressUseCase, insertUserAddressUseCase } from "../src/use-case/insertUserAddress.js";

//Criação de array de usuários
createUserUseCase("Carolina", "carol@email.com", "senhaCarol123");
createUserUseCase("Karina", "karina@email.com", "senhaKarina123");
createUserUseCase("Cairo", "cairo@email.com", "senhaCairo123");
createUserUseCase("Gabriel", "gabriel@email.com", "senhaGabriel123");
createUserUseCase("Carolina", "carol@email.com", "senhaCarol123");

//Criação de Endereço
const novoEndereco = createUserAddressUseCase("R. das Flores", 123, 101, "Bairro Qualquer", "12345-123", "Cidade Bacana", "RS");

//Inserção do novo endereço
insertUserAddressUseCase(accounts, "cairo@email.com", novoEndereco);

//Resultado da inserção
console.log(searchUserAccountByEmailUseCase(accounts, "cairo@email.com"));

//Inserção com e-mail errado - ERRO
insertUserAddressUseCase(accounts, "gabriel123@email.com", novoEndereco);
