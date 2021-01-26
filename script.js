var currentDisplay = "0";
var val1 = "";
var val2 = "";
var currentFun = "";
var currentAns = '';

window.addEventListener('keydown', keyDispatch);

function rounder (num) {
    let digits = 100000000;
    return Math.round((num + Number.EPSILON) * digits) / digits; 
}

function keyDispatch(e) {
    console.log(typeof(e.key));
    let digRegEx = /\d|\./;
    let funRegEx = /[-+\/\*]/;
    if (e.key == 'Enter') processEq();
    if (e.key == 'Escape') clearAll();
    if (digRegEx.test(e.key)) numPressed(e.key);
    if (funRegEx.test(e.key)) funPressed(e.key);
    console.log(e.key);
}

function compute (v1, v2, fun) {
    switch (fun) {
        case "+": return rounder(v1 + v2);
        case "-": return rounder(v1 - v2);
        case 'x': return rounder(v1 * v2);
        case '*': return rounder(v1 * v2);
        case '/': return rounder(v1 / v2);
        case '^': return Math.pow(v1, v2);
    }
}
function processEq () {
    //only calcs if has function and second value
    if (val2 != '' && currentFun != '') {
        //check for div by 0
        if (val2 === '0' && currentFun === '/') {
            currentDisplay = "oh no you don't...";
            val1 = "";
            val2 = "";
            currentAns = "error";
            setDisplay();
        }
        //calculate and reset variables, pushing answer to val1 for further calcs
        else {
        currentDisplay = compute(parseFloat(val1), parseFloat(val2), currentFun);
        val1 = currentDisplay;
        val2 = '';
        currentAns = currentDisplay;
        setDisplay();
        console.log(val1);
        console.log(currentDisplay);
        }
        
    }
    else return;
}

function clearAll() {
    currentDisplay = '0';
    val1 = "";
    val2 = "";
    currentFun = "";
    currentAns = '';
    setDisplay();
}

function setDisplay (){
    const display = document.querySelector('#display');
    display.textContent = currentDisplay;
}

function numPressed(key){
    // if currently displaying an answer, clear old answer to start over
    if (currentAns != '') clearAll();
    if (val1.length > 14 || val2.length > 14) return;

    //if no function yet, add to first
    if (currentFun == '') {
        if (key == '.' && val1.indexOf('.') >= 0) return;
        //start first char, replacing 0
        if (val1 == '' || val1 == '0') {
            val1 = key;
            currentDisplay = val1;
            console.log(val1);
        }
        //add to string
        else { 
            currentDisplay = currentDisplay + key; 
            val1 += key;
        }
    }
    // if function set, add to second
    else {
        val2 += key;
        currentDisplay = currentDisplay + key;
    }
    setDisplay();
}

function funPressed(fun) {
    if (val1 == '') return;
    processEq();
    currentAns = '';
    currentFun = fun;
    currentDisplay = `${val1} ${fun} `;
    setDisplay();
}

function modPressed(mod) {
    switch (mod) {
        //negate
        case 'n': 
            if (val1 == '' && val2 == '') return;
            else if (val2 == ''){ 
                val1 *= -1;
                currentDisplay = val1;
                setDisplay();
            }
            else {
                val2 *= -1;
                currentDisplay = `${val1} ${currentFun} ${val2}`;
                setDisplay();
            }
            break;
            //percentize
            case 'p': 
            if (val1 == '' && val2 == '') return;
            else if (val2 == ''){ 
                val1 = rounder(val1 / 100);
                currentDisplay = val1;
                setDisplay();
            }
            else {
                val2 = rounder(val2 / 100);
                currentDisplay = `${val1} ${currentFun} ${val2}`;
                setDisplay();
            }
            break;
    }
}



// function compute (v1, v2, fun) {
//     switch (fun) {
//         case "+": return rounder((v1 + v2 + Number.EPSILON) * digits) / digits;
//         case "-": return Math.round((v1 - v2 + Number.EPSILON) * digits) / digits;
//         case 'x': return Math.round((v1 * v2 + Number.EPSILON) * digits) / digits;
//         case '*': return Math.round((v1 * v2 + Number.EPSILON) * digits) / digits;
//         case '/': return Math.round((v1/v2 + Number.EPSILON) * digits) / digits;
//     }
// }