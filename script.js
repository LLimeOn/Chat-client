IP = dsf
PORT = 62626
PROTOCOL = 'ws' //ws or wss PROTOCOL

const sendBtn = document.querySelector('#tosendb');
const authBtn = document.querySelector('#tosendb_auth');
var pingSnd = new Audio("https://llimeon.github.io/battleship-client/sounds/ping.ogg");
let ustate = 0;
let name = "None";
let u_id = 11111;
let sound_set = false;
let perem = 0;
let send_end = 0;

window.addEventListener('focus', function (event) {
    console.log("focus");
    sound_set = false;
    console.log(sound_set);
});

window.addEventListener('blur', function (event) {
    console.log("blur");
    sound_set = true;
    console.log(sound_set);
});


socket = new WebSocket(PROTOCOL+'://'+IP+':'+PORT);

socket.onmessage = function (e) {
    if (sound_set) {
        console.log(sound_set);
        pingSnd.play()
    }
    let rc = JSON.parse(e.data);
    console.log(rc);
    switch (rc.type) {
        case "pong":
            console.log("pong!");
            return false;
        case "connection":
            if (rc.agree_connect == 1){
                st_ty();
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
            data = data.replace(/(?:\r\n|\r|\n)/g, '</br>')
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
        case "typing":
            switch (rc.text) {
                case "start":
                    var div = `<p style="margin:0; margin-top:2px;" class='items_${rc.name}'>${rc.name} печатает..</p>`;
                    $("#tp_bv").append(div);
                    return false;
                case "stop":
                    $(`.items_${rc.name}`)[0].remove();
                    return false;
            }
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

function typing() {
    if (perem > 0) {
        perem = perem - 1;
    } else if (perem < 1) {
        if (send_end == 1){
            send_end = 0;
            socket.send(JSON.stringify({type: "typing", text: "stop", name: name}));
        }
    }
    console.log(perem)
};

// fc

snd_v.addEventListener("keydown", function(event) {
    
    if (event.key != "Enter") {
        if (send_end == 0){
            send_end = 1;
            socket.send(JSON.stringify({type: "typing", text: "start", name: name}));
        };
        perem = 5;

        blankSpace = $('#snd_v').find("br").length; //count blank lines
        snd_v.style.height = blankSpace*15 + 15 + "px";
    }
    if (event.key === "Enter" && !event.shiftKey) {
        perem = 0;
        console.log("send! m");
        console.log(snd_v.innerHTML);
        mgf = snd_v.innerHTML.replaceAll("<div>", "\n").replaceAll("<br>", "\n");
        console.log(mgf);
        data = encodeURI(mgf);
        console.log(data);
        snd_v.innerHTML = "";
        socket.send(JSON.stringify({type: "message", text: data, name: name}));
        let text = $("#snd_v").val();
        let lines = text.split("\n");
        let count = lines.length;
        console.log(count);
        snd_v.style.height = "30px";

        blankSpace = $('#snd_v').find("br").length; //count blank lines
        snd_v.style.height = blankSpace*15 + 15 + "px";
        // $("#snd_v").remove();
        // div = '<div contenteditable="true" placeholder="Message" class="sendtext" id="snd_v" style="resize: none;"></div>'
        // $("#iente").append(div);
        // $("#snd_v").select();

        return false;
    }
    if (event.key === "Enter" && event.shiftKey) {
        let brNode = document.createElement('br')

        let range = window.getSelection().getRangeAt(0);
        range.deleteContents()
        range.insertNode(brNode)
        range.collapse()
        blankSpace = $('#snd_v').find("br").length; //count blank lines
        snd_v.style.height = blankSpace*15 + 15 + "px";
        return false;
    }
    if (event.key === "Enter") {

        blankSpace = $('#snd_v').find("br").length; //count blank lines
        snd_v.style.height = blankSpace*15 + 15 + "px";

    }

    blankSpace = $('#snd_v').find("br").length; //count blank lines
    snd_v.style.height = blankSpace*15 + 15 + "px";
    
    return false;
});

// snd_v.addEventListener('onkeyup', function(e){
//     e = e || event;
//     if (e.keyCode === 13 && !e.ctrlKey) {
//       // start your submit function
//       console.log("enter!")
//     }
//     return true;
// });

tosendb_auth.addEventListener('mouseenter', function (event) {
    console.log("enter!");
    anime({
        targets: '#tosendb_auth',
        width: '140',
        delay: 200,
        backgroundColor: '#404040'
    })
});

tosendb_auth.addEventListener('mouseleave', function (event) {
    console.log("leave!");
    anime({
        targets: '#tosendb_auth',
        width: '200',
        delay: 300,
        backgroundColor: '#323232'
    })
});

area_auth.addEventListener('focus', function (event) {
    console.log("focus");
    anime({
        targets: '#area_auth',
        borderRadius: '5px',
        width: '270',

    });
});

area_auth.addEventListener('blur', function (event) {
    console.log("blur");
    anime({
        targets: '#area_auth',
        width: '200'

    });
});

area_auth_pass.addEventListener('focus', function (event) {
    console.log("focus");
    anime({
        targets: '#area_auth_pass',
        borderRadius: '5px',
        width: '270',

    });
});

area_auth_pass.addEventListener('blur', function (event) {
    console.log("blur");
    anime({
        targets: '#area_auth_pass',
        width: '200'

    });
});

// fcn

function st_ty(){
    setInterval(function(){typing()},1000)
}

// INPUT LINE


// sendBtn.addEventListener('click', function (event) {
//     console.log("send! m");
//     data = encodeURI(area.value);
//     area.value = "";
//     socket.send(JSON.stringify({type: "message", text: data, name: name}));
//     return false;
// });

// area.addEventListener("keydown", function(event) {
//     if (event.key != "Enter") {
//         if (send_end == 0){
//             send_end = 1;
//             socket.send(JSON.stringify({type: "typing", text: "start", name: name}));
//         };
//         perem = 5;
//     }
//     if (event.key === "Enter") {
//         perem = 0
//         console.log("send! m");
//         data = encodeURI(area.value);
//         area.value = "";
//         socket.send(JSON.stringify({type: "message", text: data, name: name}));
//         return false;
//     }
// });



// INPUT LINE


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