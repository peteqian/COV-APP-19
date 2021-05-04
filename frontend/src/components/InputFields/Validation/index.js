export const textFieldValidation = (text) => {
    //can not be empty
    if(text.trim() === "")
        return false;

    return true;
};

export const emailValidation = (email) => {
    //can not be empty
    if(email.trim() === "")
        return false;
    
    //check pattern *@*.*
    if(!new RegExp(/\S+@\S+\.\S+/).test(email))
        return false;
    
    return true;
}

export const passwordValidation = (password) => {
    //cannot contain white space
    if(password !== password.trim())
        return {
            valid: false,
            message: 'Password can not be empty',
        };

    //needs to contain an uppercase letter
    if(password === password.toLowerCase())
        return {
            valid: false,
            message: 'Password need to contain a uppercase letter',
        };

    //needs to contain a lowercase letter
    if(password === password.toUpperCase())
        return {
            valid: false,
            message: 'Password need to contain a lowercase letter',
        };

    //needs to be atleast 8 characters long
    if(password.length < 8){
        return {
            valid: false,
            message: 'Password needs to be ateast 8 characters long',
        };
    }
    

    return { valid: true, message: 'Password is valid' };
}

export const phoneNumberValidation = (phoneNumber) => {
    //can not be empty
    if(phoneNumber.trim() === "")
        return false;
    
    //needs to be 10 digits
    if(!new RegExp(/^\d{10}$/).test(phoneNumber))
        return false;
    
    return true;
}