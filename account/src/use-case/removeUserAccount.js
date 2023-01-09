export function removeUserUseCase(array, email){
    let deleted = false;
    for (var i = 0; i < array.length; i++){
        if ((array[i].email).includes(email)){
            array.splice(i, 1);
            deleted = true;
        } 
    }
    return deleted;
}