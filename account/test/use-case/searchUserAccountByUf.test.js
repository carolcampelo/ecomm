import searchUserAccountByUfUseCase from '../../src/use-case/searchUserAccountByUf.js';
import { accounts, createUserUseCase } from '../../src/use-case/createUserAccount.js';
import { createUserAddressUseCase, insertUserAddressUseCase } from '../../src/use-case/insertUserAddress.js';

// Criação de array de usuários
createUserUseCase('Carolina', 'carol@email.com', 'senhaCarol123');
createUserUseCase('Karina', 'karina@email.com', 'senhaKarina123');
createUserUseCase('Cairo', 'cairo@email.com', 'senhaCairo123');
createUserUseCase('Gabriel', 'gabriel@email.com', 'senhaGabriel123');

// Criação de novos usuários sem endereço
createUserUseCase('Teste', 'teste@email.com', 'senhaTeste123');
createUserUseCase('Teste2', 'teste2@email.com', 'senhaTeste2123');

// Criação de Endereço
const novoEndereco = createUserAddressUseCase('R. das Flores', 123, 101, 'Bairro Qualquer', '12345-123', 'Cidade Bacana', 'SP');
const novoEndereco1 = createUserAddressUseCase('R. das Flores', 123, 101, 'Bairro Qualquer', '12345-123', 'Cidade Bacana', 'MG');
const novoEndereco2 = createUserAddressUseCase('R. das Flores', 123, 101, 'Bairro Qualquer', '12345-123', 'Cidade Bacana', 'MG');
const novoEndereco3 = createUserAddressUseCase('R. das Flores', 123, 101, 'Bairro Qualquer', '12345-123', 'Cidade Bacana', 'SP');

// Inserção do novo endereço
insertUserAddressUseCase(accounts, 'carol@email.com', novoEndereco);
insertUserAddressUseCase(accounts, 'karina@email.com', novoEndereco1);
insertUserAddressUseCase(accounts, 'cairo@email.com', novoEndereco2);
insertUserAddressUseCase(accounts, 'gabriel@email.com', novoEndereco3);

// Busca usuário por UF = SP
console.log(searchUserAccountByUfUseCase(accounts, 'SP'));
