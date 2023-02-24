import { accounts, createUserUseCase } from "../../src/use-case/createUserAccount.js";
import { changeUserNameUseCase } from "../../src/use-case/changeUserName.js";

//Criação de array de usuários
createUserUseCase("Carolina", "carol@email.com", "senhaCarol123");
createUserUseCase("Karina", "karina@email.com", "senhaKarina123");
createUserUseCase("Cairo", "cairo@email.com", "senhaCairo123");
createUserUseCase("Gabriel", "gabriel@email.com", "senhaGabriel123");
createUserUseCase("Carolina", "carol@email.com", "senhaCarol123");

//Teste 01 - Mudança de nome válida
console.log(changeUserNameUseCase(accounts, "carol@email.com", "Carol"));

//Criação de array de usuários
createUserUseCase("Carolina", "carol@email.com", "senhaCarol123");
createUserUseCase("Karina", "karina@email.com", "senhaKarina123");
createUserUseCase("Cairo", "cairo@email.com", "senhaCairo123");
createUserUseCase("Gabriel", "gabriel@email.com", "senhaGabriel123");
createUserUseCase("Carolina", "carol@email.com", "senhaCarol123");

//Teste 02 - Mudança de nome inválida
console.log(changeUserNameUseCase(accounts, "carolabc@email.com", "Carol"));