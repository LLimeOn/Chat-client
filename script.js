IP=dsf,PORT=62626,PROTOCOL="ws";const sendBtn=document.querySelector("#tosendb"),authBtn=document.querySelector("#tosendb_auth");var pingSnd=new Audio("https://llimeon.github.io/battleship-client/sounds/ping.ogg");let ustate=0,name="None",u_id=11111,sound_set=!1,perem=0,send_end=0;function typing(){perem>0?perem-=1:perem<1&&1==send_end&&(send_end=0,socket.send(JSON.stringify({type:"typing",text:"stop",name:name}))),console.log(perem)}function st_ty(){setInterval(function(){typing()},1e3)}window.addEventListener("focus",function(e){console.log("focus"),sound_set=!1,console.log(sound_set)}),window.addEventListener("blur",function(e){console.log("blur"),sound_set=!0,console.log(sound_set)}),socket=new WebSocket(PROTOCOL+"://"+IP+":"+PORT),socket.onmessage=function(e){sound_set&&(console.log(sound_set),pingSnd.play());let n=JSON.parse(e.data);switch(console.log(n),n.type){case"pong":return console.log("pong!"),!1;case"connection":return 1==n.agree_connect?(st_ty(),name=n.name,ustate=1,send_b.hidden=!1,reg_bl.hidden=!0,sh_b.hidden=!0,chat_a.hidden=!1,!1):(console.log("error!"),!1);case"message":return data=decodeURI(n.text),data=data.replace(/(?:\r\n|\r|\n)/g,"</br>"),name_m=decodeURI(n.name),p=document.createElement("p"),p.innerHTML=`<code>${name_m}</code>: ${data}`,p.setAttribute("onclick","this.hidden = true"),contm.append(p),chatik.scrollBy(0,1e3),!1;case"connection_error":reason=n.response;var t=`<div class='block_e'><div class='poof'><p class='error_text'>${reason}</p></div></div>`;return $("#tm_a").append(t),setTimeout(function(){$(".block_e")[0].remove()},3e3),!1;case"typing":switch(n.text){case"start":t=`<p style="margin:0; margin-top:2px;" class='items_${n.name}'>${n.name} печатает..</p>`;return $("#tp_bv").append(t),!1;case"stop":return $(`.items_${n.name}`)[0].remove(),!1}return!1}return!1},snd_v.addEventListener("keydown",function(e){if("Enter"!=e.key&&(0==send_end&&(send_end=1,socket.send(JSON.stringify({type:"typing",text:"start",name:name}))),perem=5,blankSpace=$("#snd_v").find("br").length,snd_v.style.height=15*blankSpace+15+"px"),"Enter"===e.key&&!e.shiftKey){perem=0,console.log("send! m"),console.log(snd_v.innerHTML),mgf=snd_v.innerHTML.replaceAll("<div>","\n").replaceAll("<br>","\n"),console.log(mgf),data=encodeURI(mgf),console.log(data),snd_v.innerHTML="",socket.send(JSON.stringify({type:"message",text:data,name:name}));let e=$("#snd_v").val().split("\n").length;return console.log(e),snd_v.style.height="30px",blankSpace=$("#snd_v").find("br").length,snd_v.style.height=15*blankSpace+15+"px",!1}if("Enter"===e.key&&e.shiftKey){let e=document.createElement("br"),n=window.getSelection().getRangeAt(0);return n.deleteContents(),n.insertNode(e),n.collapse(),blankSpace=$("#snd_v").find("br").length,snd_v.style.height=15*blankSpace+15+"px",!1}return"Enter"===e.key&&(blankSpace=$("#snd_v").find("br").length,snd_v.style.height=15*blankSpace+15+"px"),blankSpace=$("#snd_v").find("br").length,snd_v.style.height=15*blankSpace+15+"px",!1}),tosendb_auth.addEventListener("mouseenter",function(e){console.log("enter!"),anime({targets:"#tosendb_auth",width:"140",delay:200,backgroundColor:"#404040"})}),tosendb_auth.addEventListener("mouseleave",function(e){console.log("leave!"),anime({targets:"#tosendb_auth",width:"200",delay:300,backgroundColor:"#323232"})}),area_auth.addEventListener("focus",function(e){console.log("focus"),anime({targets:"#area_auth",borderRadius:"5px",width:"270"})}),area_auth.addEventListener("blur",function(e){console.log("blur"),anime({targets:"#area_auth",width:"200"})}),area_auth_pass.addEventListener("focus",function(e){console.log("focus"),anime({targets:"#area_auth_pass",borderRadius:"5px",width:"270"})}),area_auth_pass.addEventListener("blur",function(e){console.log("blur"),anime({targets:"#area_auth_pass",width:"200"})}),authBtn.addEventListener("click",function(e){return console.log("send!"),data=encodeURI(area_auth.value),socket.send(JSON.stringify({type:"auth",ustate:ustate,text:data,name:name,pass:area_auth_pass.value,variant:variant.value})),!1}),socket.onopen=function(){$("#tm_a").append("<div class='block_e'><div class='poof'><p class='error_text'>server connected</p></div></div>"),setTimeout(function(){$(".block_e")[0].remove()},3e3),console.log("Connected.")},socket.onclose=function(e){$("#tm_a").append("<div class='block_e'><div class='poof'><p class='error_text'>close connect</p></div></div>"),setTimeout(function(){$(".block_e")[0].remove()},3e3),e.wasClean?(setTimeout(()=>(function(){try{console.log("Reconect.."),socket=new WebSocket(PROTOCOL+"://"+IP+":"+PORT)}catch(n){console.log("Reconected!"),console.log("Code: "+e.code+" reason: "+e.reason)}}),5),console.log("Close connection")):(console.log("Connection fail"),alert_text="Fail to connect to server")},socket.onerror=function(e){var n=`<div class='block_e'><div class='poof'><p class='error_text'>error: ${e.message}</p></div></div>`;$("#tm_a").append(n),setTimeout(function(){$(".block_e")[0].remove()},3e3),console.log("Error "+e.message)};
