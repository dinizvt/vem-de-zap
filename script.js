function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
    return false;
}

function sendMsg(phone, msg){
    var plt = isMobile() ? 'api' : 'web';
    var msgEncoded = encodeURIComponent(msg);
    var phone = phone.match(/\d+/g).join('');
    console.log(phone);
    if(phone.length===11 || phone.length ===10){
        phone = "55"+phone;
    }
    var url = `https://${plt}.whatsapp.com/send?phone=${phone}&text=${msgEncoded}`;
    window.open(url);
}

window.onload = () => {
    var msgForm = document.getElementById('msg-form');
    var phone = document.getElementById("phone");
    var msg = document.getElementById("msg");

    msgForm.onsubmit = (e) =>{
        sendMsg(phone.value, msg.value)
    };
};
