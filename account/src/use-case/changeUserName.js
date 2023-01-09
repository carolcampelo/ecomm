export function changeUserNameUseCase(array, email, newName){
    let changed = false;
    array.forEach(function(item) {
        if ((item.email).includes(email)){
            item.name = newName;
            changed = true;
        }
    });
    return changed;
}