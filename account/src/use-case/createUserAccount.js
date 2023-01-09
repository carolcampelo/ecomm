export const accounts = [];

export function createUserUseCase(name, email, password){
    const user = {
        id: accounts.length + 1,
        name: name,
        email: email,
        password: password,
        createdDate: new Date().toLocaleDateString('en-CA')
    }
    accounts.push(user);
    return accounts;
}