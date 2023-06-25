const validation = (input) => {
    const errors = {};
    
    // if(!input.name) errors.name = "Add a name";
    if(input.name.length < 3) errors.name = "Name must have at least 3 characters";
    if(input.name.length > 10) errors.name = "Name must not have more than 10 characters";
    if(/\d/.test(input.name)) errors.name = "Name can not contain a number";
    
    if (!/\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(input.image)) errors.image = "Enter Url Image";
    if(!input.image) errors.image = "You need to add an image";
    // if (!/^\d+$/.test(input.speed)) errors.speed = "Speed must contain only numbers";
    if (input.speed <= 0 || input.speed > 100) errors.speed = "Speed must be greater than 0 and less than or equal to 100";
    if(!input.speed) errors.speed = "You need to add some speed";
    
    // if(!input.attack) errors.attack = "You need to add some attack";
    // if (!/^\d+$/.test(input.attack)) errors.attack = "Attack must contain only numbers";
    if (input.attack <= 0 || input.attack > 100) errors.attack = "Attack must be greater than 0 and less than or equal to 100";
    
    // if(!input.defense) errors.defense = "You need to add some defense";
    // if (!/^\d+$/.test(input.defense))errors.defense = "Defense must contain only numbers";
    if (input.defense <= 0 || input.defense > 100) errors.defense = "Defense must be greater than 0 and less than or equal to 100";
    
    // if(!input.life) errors.life = "You need to add some life";
    // if (!/^\d+$/.test(input.life)) errors.life = "Life must contain only numbers";
    if (input.life <= 0 || input.life > 100) errors.life = "Life must be greater than 0 and less than or equal to 100";
    
    // if(!input.height) errors.height = "You need to add some height";
    // if (!/^\d+$/.test(input.height)) errors.height = "Height must contain only numbers";
    if (input.height <= 0 || input.height > 100) errors.height = "Height must be greater than 0 and less than or equal to 100";
    
    // if(!input.weight) errors.weight = "You need to add some weight";
    // if (!/^\d+$/.test(input.weight)) errors.weight = "Weight must contain only numbers";
    if (input.weight <= 0 || input.weight > 100) errors.weight = "Weight must be greater than 0 and less than or equal to 100";
    
    if(input.types.length === 0) errors.types = "Add at least one type"
    
    if(input.tender === 0) errors.tender = "Debe ser mayor a cero"
    if(input.tender < 10) errors.tender =" Debe ser menor a 10"
   
    return errors;
}

export default validation;