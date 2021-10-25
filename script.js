IP = "31.135.144.218"
PORT = 62626
PROTOCOL = 'ws' //ws or wss PROTOCOL

const sendBtn = document.querySelector('#tosendb');
const authBtn = document.querySelector('#tosendb_auth');
let ustate = 0;
let name = "Ghost";
let u_id = 11111;

socket = new WebSocket(PROTOCOL+'://'+IP+':'+PORT);

socket.onmessage = function (e) {
    let rc = JSON.parse(e.data);
    console.log(rc);
    switch (rc.type) {
        case "pong":
            console.log("pong!");
            return false;
        case "connection":
            if (rc.agree_connect == 1){
                name = rc.name;
                u_id = rc.u_id;
                ustate = 1;
                send_b.hidden = false;
                auth_b.hidden = true;
            } else {
                console.log("error!");
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
    socket.send(JSON.stringify({type: "auth", ustate: ustate, text: data, name: name}));
    return false;
});







socket.onopen = function() {
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
    console.log("Error " + error.message);
  };