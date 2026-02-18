let counter = 0;

document.addEventListener('DOMContentLoaded', () => {
    const span = document.getElementById('counter');
    if (span) {
        counter = parseInt(span.textContent, 10) || 0;
        span.textContent = counter;
    }
});

function runForLoop() {
    const out = [];
    for (let i = 0; i <= counter; i++) {
        out.push(i);
    }
    const el = document.getElementById('forLoopResult');
    if (el) el.textContent = out.join(' ');
}

function updateCounterDisplay() {
    const span = document.getElementById('counter');
    if (span) span.textContent = counter;
}

function tickDown() {
    counter -= 1;
    updateCounterDisplay();
}

function tickUp() {
    counter += 1;
    updateCounterDisplay();
}

function showOddNumbers() {
    const out = [];
    for (let i = 1; i <= counter; i++) {
        if (i % 2 !== 0) out.push(i);
    }
    const el = document.getElementById('oddNumberResult');
    if (el) el.textContent = out.join(' ');
}

function addMultiplesToArray() {
    if (counter < 5) {
        console.log([]);
        return;
    }
    const arr = [];
    let start = Math.floor(counter / 5) * 5;
    if (start === 0) start = 5;
    for (let v = start; v >= 5; v -= 5) {
        arr.push(v);
    }
    console.log(arr);
}

function printCarObject() {
    const t = document.getElementById('carType');
    const m = document.getElementById('carMPG');
    const c = document.getElementById('carColor');
    const obj = {
        cType: t ? t.value : '',
        cMPG: m ? m.value : '',
        cColor: c ? c.value : ''
    };
    console.log(obj);
}

function loadCar(n) {
    let src;

    if (n === 1) src = (typeof carObject1 !== 'undefined') ? carObject1 : window.carObject1;
    else if (n === 2) src = (typeof carObject2 !== 'undefined') ? carObject2 : window.carObject2;
    else if (n === 3) src = (typeof carObject3 !== 'undefined') ? carObject3 : window.carObject3;
    if (!src) return;
    const t = document.getElementById('carType');
    const m = document.getElementById('carMPG');
    const c = document.getElementById('carColor');
    if (t) t.value = src.cType || '';
    if (m) m.value = src.cMPG || '';
    if (c) c.value = src.cColor || '';
}

function changeColor(n) {
    const p = document.getElementById('styleParagraph');
    if (!p) return;
    let color = '';
    if (n === 1) color = 'red';
    else if (n === 2) color = 'green';
    else if (n === 3) color = 'blue';
    p.style.color = color;
}
