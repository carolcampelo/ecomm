export function searchUserAccountByUfUseCase(array, uf){
    const userAccountsWithAddress = array.filter(user => (user.hasOwnProperty('address')));
    const userAccountsByUf = userAccountsWithAddress.filter(userAccountsWithAddress => userAccountsWithAddress.address.uf === uf)
    return userAccountsByUf;
}
