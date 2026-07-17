let score = 0;
let answered = 0;

function correct(button){

if(button.disabled) return;

score++;
answered++;

button.style.background="#00cc66";
button.innerHTML="✔ Correct";

let feedback = button.parentElement.querySelector(".feedback");

feedback.innerHTML="✅ Excellent decision. This helps contain the incident quickly.";

disable(button);

update();

}

function wrong(button){

if(button.disabled) return;

answered++;

button.style.background="#cc3333";
button.innerHTML="✖ Incorrect";

let feedback = button.parentElement.querySelector(".feedback");

feedback.innerHTML="⚠ This decision would increase the impact of the cyberattack.";

disable(button);

update();

}

function disable(button){

let buttons = button.parentElement.querySelectorAll("button");

buttons.forEach(btn=>btn.disabled=true);

}

function update(){

let result=document.getElementById("result");

result.innerHTML="Score: "+score+" / 5";

if(answered===5){

if(score===5){

result.innerHTML=
"🏆 Congratulations!<br><br>You scored 5/5 and successfully managed the cyber crisis.<br><br><strong>Certificate: Incident Commander</strong>";

}

else if(score>=3){

result.innerHTML=
"👍 Great Job!<br><br>Your score was "+score+"/5.<br>You made good decisions, but there is room for improvement.";

}

else{

result.innerHTML=
"⚠ Score: "+score+"/5.<br>Your decisions allowed the attack to cause greater disruption.<br>Review the incident response process and try again.";

}

}

}