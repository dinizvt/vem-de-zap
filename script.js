function sendMsg(phone, msg){
    var msgEncoded = encodeURIComponent(msg);
    var phone = phone.match(/\d+/g).join('');
    console.log(phone);
    if(phone.length===11 || phone.length ===10){
        phone = "55"+phone;
    }
    console.log(phone)
    var url = `https://web.whatsapp.com/send?phone=${phone}&text=${msgEncoded}`;
    window.open(url);
}
$(document).ready(() => {
    $("#msg-form").on('submit', (e)=>{
        e.preventDefault();
        var phone = $("#phone").val();
        var msg = $("#msg").val();
        sendMsg(phone, msg);
    });
});