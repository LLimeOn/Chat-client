IP = dsf
PORT = 62626
PROTOCOL = 'ws' //ws or wss PROTOCOL

const sendBtn = document.querySelector('#tosendb');
const authBtn = document.querySelector('#tosendb_auth');
var pingSnd = new Audio("https://llimeon.github.io/battleship-client/sounds/ping.ogg");
let ustate = 0;
let name = "None";
let u_id = 11111;

socket = new WebSocket(PROTOCOL+'://'+IP+':'+PORT);

socket.onmessage = function (e) {
    pingSnd.play()
    let rc = JSON.parse(e.data);
    console.log(rc);
    switch (rc.type) {
        case "pong":
            console.log("pong!");
            return false;
        case "connection":
            if (rc.agree_connect == 1){
                name = rc.name;
                // u_id = rc.u_id;
                ustate = 1;
                send_b.hidden = false;
                // auth_b.hidden = true;
                reg_bl.hidden = true;
                sh_b.hidden = true;
                // tm_a.hidden = true;
                chat_a.hidden = false;
                return false;
            } else {
                console.log("error!");
                return false;
            };
            return false;
        case "message":
            data = decodeURI(rc.text);
            name_m = decodeURI(rc.name)
            p = document.createElement('p');
            // p.innerHTML = `${data}`;
            p.innerHTML = `<code>${name_m}</code>: ${data}`;
            p.setAttribute("onclick", "this.hidden = true");
            contm.append(p);
            chatik.scrollBy(0,1000);
            return false;
        case "connection_error":
            reason = rc.response
            var div = `<div class='block_e'><div class='poof'><p class='error_text'>${reason}</p></div></div>`;
            $("#tm_a").append(div);
            setTimeout(function () {
                $('.block_e')[0].remove();
            }, 3000);
            return false;


    };
    return false;
};

// function ping(){
//     socket.send(JSON.stringify({type: "ping"}));
//     console.log("ping!");
//     return false;
// }

// setInterval(ping, 10000);

// let el = document.getElementById("tosendb");
// el.addEventListener('click', modify, false);

sendBtn.addEventListener('click', function (event) {
    console.log("send! m");
    data = encodeURI(area.value);
    area.value = "";
    socket.send(JSON.stringify({type: "message", text: data, name: name}));
    return false;
});

area.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("send! m");
        data = encodeURI(area.value);
        area.value = "";
        socket.send(JSON.stringify({type: "message", text: data, name: name}));
        return false;
    }
});

authBtn.addEventListener('click', function (event) {
    console.log("send!");
    data = encodeURI(area_auth.value);

    // socket.send(JSON.stringify({type: "auth", ustate: ustate, text: data, name: name}));

    // area_auth_pass = encodeURI(area_auth_pass.value);
    socket.send(JSON.stringify({type: "auth", ustate: ustate, text: data, name: name, pass: area_auth_pass.value, variant: variant.value}));
    return false;
});







socket.onopen = function() {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>server connected</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
    console.log("Connected.");
    // token = localStorage.getItem('skrepka.battleships.token.login');
    // let token = "1";
    // if (token) {
    //     socket.send(JSON.stringify({type: "authorization", method: "token", token: token}));
    // } else {
    //     blocks[0].classList.remove("hide");
    //     alert_text = "";
    //     state = -2;
    // }
};

socket.onclose = function(event) {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>close connect</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
    if (event.wasClean) {
            setTimeout(() => function(){
            try {
            console.log("Reconect..");
            socket = new WebSocket(PROTOCOL+'://'+IP+':'+PORT);
            }
            catch (e) {console.log("Reconected!"); console.log('Code: ' + event.code + ' reason: ' + event.reason)};
        }, 5)
        console.log('Close connection');
        } else {
        console.log('Connection fail');
        alert_text = "Fail to connect to server";
    };
};

socket.onerror = function(error) {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>error: ${error.message}</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
    console.log("Error " + error.message);
  };