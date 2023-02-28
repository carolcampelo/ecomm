export default function changeUserNameUseCase(array, email, newName) {
  let changed = false;
  array.forEach((item) => {
    if ((item.email).includes(email)) {
      // eslint-disable-next-line no-param-reassign
      item.name = newName;
      changed = true;
    }
  });
  return changed;
}
