import { accounts, createUserUseCase } from '../../src/use-case/createUserAccount.js';
import removeUserUseCase from '../../src/use-case/removeUserAccount.js';
import searchUserAccountByEmailUseCase from '../../src/use-case/searchUserAccountByEmail.js';

// Criação de array de usuários
createUserUseCase('Carolina', 'carol@email.com', 'senhaCarol123');
createUserUseCase('Karina', 'karina@email.com', 'senhaKarina123');
createUserUseCase('Cairo', 'cairo@email.com', 'senhaCairo123');
createUserUseCase('Gabriel', 'gabriel@email.com', 'senhaGabriel123');
createUserUseCase('Carolina', 'carol@email.com', 'senhaCarol123');

// Teste 01 de remoção de usuário - retorno true + teste de busca de usuário
console.log(removeUserUseCase(accounts, 'carol@email.com'));
console.log(searchUserAccountByEmailUseCase(accounts, 'carol@email.com'));

// Criação de array de usuários
createUserUseCase('Carolina', 'carol@email.com', 'senhaCarol123');
createUserUseCase('Karina', 'karina@email.com', 'senhaKarina123');
createUserUseCase('Cairo', 'cairo@email.com', 'senhaCairo123');
createUserUseCase('Gabriel', 'gabriel@email.com', 'senhaGabriel123');
createUserUseCase('Carolina', 'carol@email.com', 'senhaCarol123');

// Teste 01 de remoção de usuário - retorno false
console.log(removeUserUseCase(accounts, 'carolabc@email.com'));
