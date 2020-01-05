
class LoggedIn {

    static deleteCookie(name) {
        document.cookie = name+ "=; max-age=0";
    }

   static  getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : null;
    }
}
export default LoggedIn