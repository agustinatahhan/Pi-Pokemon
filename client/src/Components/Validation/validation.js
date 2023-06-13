const validation = (input) => {
    const errors = {};

    if(input.name.length < 3){
        errors.name = "Name must have at least 3 characters";
    }
    if(input.name.length > 10){
        errors.name = "Name must not have more than 10 characters";
    }
    if(/\d/.test(input.name)){
        errors.name = "Name can not contain a number"
    }
    return errors;
}

export default validation;