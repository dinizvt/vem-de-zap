const isMobile = navigator => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
    return false;
}
const mapObject = (mask, obj) => {
    let result = {};

    for (let [key, f] of Object.entries(mask)) {
        if (!Object.keys(obj).includes(key)) throw `Key ${key}`;
        if (f == null) continue;
        result[key] = f(obj[key]);
    }
    return result;
}
//form node -> Object
const getFormAnsw = form => Object.fromEntries(new FormData(form));

//extract numbers from string  ex: 123abc456 -> 123456
const getNumbers = str => str.match(/\d+/g).join('');

//add country code to number
const addCCode = (cc,num) => cc+num;

//phone number verifier
const verifyPhone = str => /(\d{2})(\d{2})(\d{8,9})/.test(str);

const formatPhone = cc => phone => {
    const formated = addCCode(cc, getNumbers(phone));
    return verifyPhone(formated) ? formated : null;
}

const createURL = (url, data) => {
    const result = new URL(url);
    for (let [key, value] of Object.entries(data)) {
        result.searchParams.append(key, value);
    }
    return result.toString();
}

const mask = {
    'phone': formatPhone(55),
    'msg': encodeURIComponent
}

const URL_MOBILE = 'https://api.whatsapp.com/send';
const URL_DESKTOP = 'https://web.whatsapp.com/send';

window.onload = () => {
    const url = isMobile(navigator) ? URL_MOBILE : URL_DESKTOP;
    const form = document.getElementById("main-form");
    form.onsubmit = e => {
        e.preventDefault();
        window.open(createURL(url, mapObject(mask, getFormAnsw(form))))
    };
};
