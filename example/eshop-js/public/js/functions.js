export const valid_user_input = (user) => {
    if (!user.firstname.match('^[a-zA-Z0-9åäöÅÄÖ -]+$')) {
        return false;
    } 
    if (!user.surname.match('^[a-zA-Z0-9åäöÅÄÖ -]+$')) {
        return false;
    }
    if (!user.phone.match('[0-9-]+')) {
        return false;
    }
    if (!user.email.match('[a-zA-Z0-9.]+@[a-zA-Z0-9.]+')) {
        return false;
    }
    if (!(user.gender === 0 | user.gender === 1)) {
        return false;
    }
    if (!user.address.match('^[a-zA-Z0-9åäöÅÄÖ -]+$')) {
        return false;
    }
    if (!user.postcode.match('[0-9]+')) {
        return false;
    }
    if (!user.city.match('^[a-zA-Z0-9åäöÅÄÖ -]+$')) {
        return false;
    }

    return true;
};