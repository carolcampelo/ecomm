import { accounts, createUserUseCase } from '../../src/use-case/createUserAccount.js';

createUserUseCase('Carolina', 'carol@email.com', 'senhaCarol123');
createUserUseCase('Karina', 'karina@email.com', 'senhaKarina123');
createUserUseCase('Cairo', 'cairo@email.com', 'senhaCairo123');
createUserUseCase('Gabriel', 'gabriel@email.com', 'senhaGabriel123');

console.log(accounts);
