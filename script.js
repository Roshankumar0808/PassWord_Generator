const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const CopyBtn=document.querySelector("[data-copy]");
const CopyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc")
//set strength circle colour to grey
//change password length
function handleSlider(){
   inputSlider.value=passwordLength;
   lengthDisplay.innerText=passwordLength;
   const min = inputSlider.min;
   const max = inputSlider.max;
   inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

}
function setIndicator(color){
    indicator.style.backgroundColor=color
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    return String.fromCharCode(getRndInteger(33,47));
}

function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolCheck.checked) hasSym=true;

    if(hasUpper&&hasLower&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator("#0f0");
    }
    else if(
        (hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        CopyMsg.innerText="copied";
    }
    catch(e){
         CopyMsg.innerText="Failed";
    }
    CopyMsg.classList.add("active");
    setTimeout(()=>{
        CopyMsg.classList.remove("active");
    },2000);

}
//class1 1:45
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

CopyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    //special condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})
function shufflepassword(array){
        //Fisher Yates Method
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        let str = "";
        array.forEach((el) => (str += el));
        return str;
}

generateBtn.addEventListener('click',()=>{
    console.log('hi');
    if(checkCount<=0){
        return ;
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    let funArray=[];
    if(uppercaseCheck.checked){
        funArray.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funArray.push(generateLowerCase);
    }
    if(symbolCheck.checked){
        funArray.push(generateSymbol);
    }
    if(numbersCheck.checked){
        funArray.push(generateRandomNumber);
    }

    for(let i=0;i<funArray.length;i++){
        password+=funArray[i]();
    }

    for(let i=0;i<passwordLength-funArray.length;i++){
        let randomnum=getRndInteger(0,funArray.length);
        password+=funArray[randomnum]();
    }
    password=shufflepassword(Array.from(password));
    passwordDisplay.value=password;
    calStrength();

})