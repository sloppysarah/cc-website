document.getElementById("ccpt").oninput = plainLow
document.getElementById("shiftamount").oninput = caesarCipher
document.getElementById("rfpt").oninput = plainRFLow
document.getElementById("pfpt").oninput = playfairEncrypt

// caesar cipher
let numtext;

function plainLow() {
    let plaint = document.getElementById("ccpt").value;
    let loplaint = plaint.toLowerCase();
    numtext = [];
    for (let char of loplaint) {
        numtext.push(char.charCodeAt(0) - 96);
    }
}

function caesarCipher() {
    let ciphert = "";
    let shift = +document.getElementById("shiftamount").value; // + turns string into #
    let x = 1;
    let y = 1;
    if (shift % 1 == 0)
        for (let num of numtext) {
            let finnum = num + shift;
            while (finnum > 26 || finnum < 1) {
                if (finnum > 26) {
                    finnum = num + shift - 26 * x
                    if (num + shift - 26 * x > 26)
                        x++;
                }
                if (finnum < 1) {
                    finnum = num + shift + 26 * y
                    if (num + shift + 26 * y < 1)
                        y++;
                }
            }
            if (finnum <= 26 && finnum >= 1)
                ciphert += finnum + " ";
            x = 1;
            y = 1;

        }
    document.getElementById("display1").innerHTML = ciphert;
}
// end caesar cipher

// railfence cipher
function plainRFLow() {
    let plaint = document.getElementById("rfpt").value;
    let loplaint = plaint.toLowerCase();
    let finplaint = loplaint.replace(/[^a-z]/g, "");
    let top = "";
    let bot = "";
    let x = 1;
    for (let char of finplaint) {
        if (x % 2 !== 0)
            top += char;
        if (x % 2 == 0)
            bot += char;
        x++;
    }
    document.getElementById("disp2").innerHTML = top + bot;
}
// end railfence cipher

// playfair cipher
function playfairEncrypt() {
    let plaint = document.getElementById("pfpt").value;
    let loplaint = plaint.toLowerCase();
    let cleanplaint = loplaint.replace(/[^a-z]/g, "");

    let numtext = [];

    for (let char of cleanplaint) {
        if (char.charCodeAt(0) - 96 >= 10)
            numtext.push(char.charCodeAt(0) - 97);
        if (char.charCodeAt(0) - 96 < 10)
            numtext.push(char.charCodeAt(0) - 96);
    }
    for (let x = 0; x < numtext.length; x += 2)
        if (numtext[x] == numtext[x + 1]) {
            let extra = numtext[x];
            if (numtext[x + 1] <= 25)
                numtext.splice([x + 1], 0, extra += 1)
            if (numtext[x + 1] == 26)
                numtext.splice([x + 1], 0, extra -= 1)
        }
    if (numtext.length % 2 !== 0 && numtext.length > 0) {
        numtext.push(25)
    }

    let cipherPF = [];
    for (let i = 0; i < numtext.length; i += 2) {
        if (numtext[i] % 5 == numtext[i + 1] % 5) // same column
            cipherPF.push((numtext[i] + 5) - 25 * Math.floor((numtext[i] + 4) / 25), (numtext[i + 1] + 5) - 25 * Math.floor((numtext[i + 1] + 4) / 25));
        if (Math.ceil(numtext[i] / 5) == Math.ceil(numtext[i + 1] / 5)) // same row
            cipherPF.push(numtext[i] + 1 - 5 * ((numtext[i] % 5) ? 0 : 1), numtext[i + 1] + 1 - 5 * ((numtext[i + 1] % 5) ? 0 : 1))
        if (numtext[i] % 5 !== numtext[i + 1] % 5 && Math.ceil(numtext[i] / 5) !== Math.ceil(numtext[i + 1] / 5)) {
            let x = 0;
            let y = 0;
            while (numtext[i] - 5 * x > 5) {
                    x++;
            }
            while (numtext[i + 1] - 5 * y > 5) {
                    y++;
            }
            cipherPF.push((((numtext[i + 1] % 5) ? (numtext[i + 1] % 5) : 5) + 5 * x), (((numtext[i] % 5) ? (numtext[i] % 5) : 5) + 5 * y));
        }
    }
   let cipherStr = "";
    for (let enc of cipherPF) {
        if (enc >= 10) // k = 10
            enc++;
        if (enc == 9)
            cipherStr += Math.random() < 0.5 ? "I" : "J";
        if (enc !== 9)
            cipherStr += String.fromCharCode(64 + enc) + " ";
    }
    document.getElementById("pfct").innerHTML = cipherStr;
}

// end playfair cipher