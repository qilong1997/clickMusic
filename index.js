// DOMๅๅๅงๅ
const bgm = document.getElementById("bgm"),
    hint = document.getElementById("hint"),
    char = [
        "๐๐๐๐๐๐๐๐",
        "๐๐๐๐ณ๐๐๐ฃ๐ค๐ฅ๐ข๐ฒ๐๐ฉ๐ช๐๐ฐ๐ซ๐ฌ๐ญ๐ก๐ฎ๐ฏ๐ผ๐ต๐ถ",
        "๐๐น๐บ๐๐ป๐ฝ๐พ๐ค๐ฉ๐ฆ",
    ],
    table = prompt("่ฏท่พๅฅ็งๅฏๅฃไปค");
let group;

if (table == 216) {
    bgm.src = "https://juanerjun-1253312316.cos.ap-chengdu.myqcloud.com/files/music/216.mp3";
    group = 0;
} else {
    bgm.src = "https://juanerjun-1253312316.cos.ap-chengdu.myqcloud.com/files/music/3.mp3";
    group = 1;
}

// ็ปๅธๅๅงๅ
let directionX = 0,
    time = 0,
    bgcH = 34,
    bgcS = 78,
    body = document.getElementsByTagName("body")[0],
    c = document.getElementById("canvas");

(window.onresize = function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
})();

// ้ณไนๅๅคๅฐฑ็ปช๏ผๅฏไปฅๅผๅง
bgm.oncanplay = function () {
    c.style.display = "block";
    hint.style.fontSize = "7em";
    setInterval(count, 5);
    setInterval(out, 20);
    // ็นๅป็ป้ขๅ๏ผๅทๆฐ่ฎกๆถ
    document.onclick = function (event) {
        const e = event || window.event;
        draw(e.clientX, e.clientY);
        bgm.play();
        if (bgm.currentTime >= 33 && table == 216) {
            hint.style.animation = "beatsSmall .24s";
        } else {
            hint.style.animation = "beats .24s";
        }
        hint.style.animationIterationCount = "infinite";
        hint.style.animationDirection = "alternate";
        hint.style.animationTimingFunction = "ease-in";
        body.style.backgroundColor = "#FFF";
        bgm.volume = 1;
        bgcS = 100;
        time = 80;
    };
};

// ๅจ(x,y)ไฝ็ฝฎ็ปๅถๅพๆ 
function draw(x, y) {
    // ้ๆบๆ่ฝฌๅพๆ ไธๅฎ่งๅบฆ
    const randR = (Math.round(Math.random() * 20) - 10) / 20;
    // const randY = (Math.round(Math.random()*10)-0)*10;
    const ctx = c.getContext("2d");
    ctx.font = "60px Arial";
    ctx.translate(x, y);
    ctx.rotate(randR);
    const charIndex = randomInteger(0, char[group].length / 2 - 2) * 2;
    ctx.fillText(char[group].substr(charIndex, 2), -40, +30);
    ctx.rotate(-randR);
    ctx.translate(-x, -y);
}

// ๅนณ็งป็ป้ขๅๅฎน
function out() {
    const ctx = c.getContext("2d");
    const nowImage = ctx.getImageData(0, 0, c.width, c.height);
    ctx.putImageData(nowImage, directionX * 7, -8);
}

// ็ๆ่ๅดๅ้ๆบๆดๆฐ
function randomInteger(min, max) {
    const length = max - min;
    let value = Math.round(Math.random() * (length + 1)) + min;
    if (value == max + 1) {
        value = min;
    }
    return value;
}
function change() {
    group = randomInteger(0, char.length - 1);
}

// ่ฎกๆถๅจ
function count() {
    // ๆฒกๆไบๅจ็ๆๅตไธ๏ผ้ๆธ้ไฝ้ณ้๏ผ็ดๅฐๅๆญขๆญๆพ
    if (time) {
        time -= 1;
        bgcH += 1;
        hint.style.color = "hsl(" + bgcH + ", " + bgcS + "%, 70%)";
        if (bgm.volume >= 0.01) {
            bgm.volume -= 0.01;
        }
    } else {
        bgm.pause();
        hint.style.animation = "";
        body.style.backgroundColor = "#222";
        hint.style.color = "white";
        hint.innerHTML = "<i class='fas fa-headphones-alt'></i>";
    }
    // ใๅฝฉ่ใ ๅ่ฎกๆถ
    // ๅจ่พๅฅ็งๅฏๅฃไปคๆญฃ็กฎๆถ๏ผๆญๆพๅฐ33็งๅๆดๆน็ป้ขๅๅฎน
    if (bgm.currentTime >= 33 && table == 216) {
        hint.style.fontSize = "2em";
        hint.innerHTML = "<i class='fab fa-qq'></i> 315038639";
    }
}
