export const generateURL = () => {
    let url = window.location.protocol + "//" + window.location.host;
    let pathArray = window.location.pathname.split( '/' );
    let newPathname = "";
    for (let i = 0; i < pathArray.length - 2; i++) {
        newPathname += pathArray[i];
        newPathname += "/";
    }
    let newURL = url + newPathname;

    return newURL;
};

export const redirectToLogin = () => {
    let url = this.generateURL();
    window.location.replace(url + "user/login");
};
