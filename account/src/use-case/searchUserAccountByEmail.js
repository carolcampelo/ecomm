/* eslint-disable consistent-return */
export default function searchUserAccountByEmailUseCase(array, email) {
  const arrayUserAcountByEmail = array.filter((user) => (user.email === email));
  if (arrayUserAcountByEmail === '') {
    return 'Não encontrado.';
  }
  if (arrayUserAcountByEmail !== '') {
    return arrayUserAcountByEmail;
  }
}
