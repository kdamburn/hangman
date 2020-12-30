const canvas1 = document.getElementById('canvas1');
const context = canvas1.getContext('2d');
canvas1.width = 400;
canvas1.height = 400;
const play = document.getElementById('play');
play.addEventListener('click',setup);
canvas1.addEventListener('click',checkPlacement);
let select = document.getElementById('select');
let anImage = document.getElementById('anImage');
let feedback = document.getElementById('feedbackPara');
let letters = 'abcdefghijklmnopqrstuvwxyz';
let patches = [];
let counter = 0;
let countryList;
let answer;
let guess = '';
let imagePath;

class Patch {
    constructor(letter,x,y,col){
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.col = col;
    }
    show(){
      context.textBaseline = 'middle';
      context.font = '22px serif';
      context.clearRect(this.x,this.y,30,30);
      context.fillStyle = this.col;
      let text = context.measureText(this.letter); // TextMetrics object
      context.fillText(this.letter,this.x + 15 - text.width/2,this.y + 15);
      context.fillStyle = 'grey';
      context.strokeRect(this.x,this.y,30,30);
    }
    mark(){
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x + 30,this.y + 30);
        context.moveTo(this.x,this.y + 30);
        context.lineTo(this.x + 30,this.y);
        context.stroke();
        if(containsLetter(this.letter)){
          guess = checkGuess(this.letter);
          countryName.innerHTML = guess;  
        }else{
            drawHangman();
        }
    }
    findIndex(x,y){
        if(x > this.x && x < this.x + 30 && y > this.y && y < this.y + 30){
           return true;
        }
    }
}
function setup(){
    if (select.value == 'start'){
		feedback.innerHTML = 'Select a continent.';
    }else{
    context.clearRect(0,0,400,400);
    makeScaffold();
    context.lineWidth = 1;
    makePatches();
    for(let i = 0; i < patches.length; i++){
        patches[i].show(); 
    }
    makeAnswer();
    }
}
function makePatches(){
	for(var i = 0; i < 9;i++){
		patches.push(new Patch(letters[i],60 + 30 * i,250,'red'));
	}
	for(var i = 0; i < 9;i++){
		patches.push(new Patch(letters[i + 9],60 + 30 * i,280,'red'));
	}
	for(var i = 0; i < 8;i++){
		patches.push(new Patch(letters[i + 18],60 + 30 * i,310,'red'));
	}
}
function getIndex(e){
    let a = e.clientX ;
    let b = e.clientY ;
    mouseX = a - canvas1.getBoundingClientRect().x;
    mouseY = b - canvas1.getBoundingClientRect().y;
    for(let i = 0;i < patches.length;i++){
        if(patches[i].findIndex(mouseX,mouseY)){
            return i;
        }; 
    }  
}
function checkPlacement(e){
    let index = getIndex(e);
    if(guess != answer && counter < 6){
    patches[index].col = 'grey';
    patches[index].show();
    patches[index].mark();
    }
}
//Lesson 2
function makeScaffold(){
  context.beginPath();
  context.lineWidth = 4;
  context.moveTo(100,200);
  context.lineTo(200,200);
  context.moveTo(150,200);
  context.lineTo(150,50);
  context.lineTo(200,50);
  context.lineTo(200,70);  
  context.stroke();	 
 }
function drawHangman(){
	if(counter == 0){
		circle(200,85,15,'grey');
		counter++;	
	}
	else if(counter == 1){
//        line(200,100,200,150);
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(200,100);
        context.lineTo(200,150);
        context.stroke();
        context.lineWidth = 1;
		counter++;
	}
	else if(counter == 2){
//		line(200,150,180,180);
		context.beginPath();
        context.lineWidth = 3;
        context.moveTo(200,150);
        context.lineTo(180,180);
        context.stroke();
        context.lineWidth = 1;
		counter++;	
	}
	else if(counter == 3){
//		line(200,150,220,180);
		context.beginPath();
        context.lineWidth = 3;
        context.moveTo(200,150);
        context.lineTo(220,180);
        context.stroke();
        context.lineWidth = 1;
		counter++;	
	}
	else if(counter == 4){
//		line(200,120,185,105);
		context.beginPath();
        context.lineWidth = 3;
        context.moveTo(200,120);
        context.lineTo(185,105);
        context.stroke();
        context.lineWidth = 1;
		counter++;	
	}
	else if(counter == 5){
//		line(200,120,215,105);
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(200,120);
        context.lineTo(215,105);
        context.stroke();
        context.lineWidth = 1;
		feedback.style.display = 'block';
        feedback.innerHTML = 'Game Over!';
        counter++;
	}
}
function circle(x,y,r,col){
    context.strokeStyle = col;
    context.beginPath();
    context.lineWidth = 3;
    context.arc(x,y,r,0, 2 * Math.PI);
    context.stroke();
    context.lineWidth = 1;
} 
//Lesson 3
//continent Lists
let asia = ["afghanistan","armenia","azerbaijan","bahrain","bangladesh","bhutan","brunei","cambodia","china","cyprus","georgia","india","indonesia","iran","iraq","israel","japan","jordan","kazakhstan","kyrgyzstan","laos","lebanon","malaysia","maldives","mongolia","myanmar","nepal","north korea","oman","pakistan","palestine","philippines","qatar","russia","saudi arabia","singapore","south korea","sri lanka","syria","taiwan","tajikistan","thailand","timor leste","turkey","turkmenistan","united arab emirates","uzbekistan","vietnam","yemen"];
let africa = 
["algeria","angola","benin","botswana","burkina faso","burundi","cameroon","cape verde","central african republic","chad","comoros","democratic republic of the congo","djibouti","egypt","equatorial guinea","eritrea","ethiopia","gabon","gambia","ghana","guinea bissau","guinea","ivory coast","kenya","lesotho","liberia","libya","madagascar","malawi","mali","mauritania","mauritius","morocco","mozambique","namibia","niger","nigeria","republic of the congo","rwanda","senegal","seychelles","sierra leone","somalia","south africa","south sudan","sudan","swaziland","tanzania","togo","tunisia","uganda","zambia","zimbabwe"];
let europe = ["albania","andorra","armenia","austria","azerbaijan","belarus","belgium","bosnia and herzegovina","bulgaria","croatia","cyprus","czech republic","denmark","estonia","finland","france","georgia","germany","greece","hungary","iceland","ireland","italy","latvia","liechtenstein","lithuania","luxembourg","macedonia","malta","moldova","monaco","montenegro","netherlands","norway","poland","portugal","romania","russia","san marino","serbia","slovakia","slovenia","spain","sweden","switzerland","turkey","ukraine","united kingdom","vatican city"];
let northamerica = 
["antigua and barbuda","bahamas","barbados","belize","canada","costa rica","cuba","dominica","dominican republic","el salvador","grenada","guatemala","haiti","honduras","jamaica","mexico","nicaragua","panama","saint kitts and nevis","saint lucia","saint vincent and the grenadines"," trinidad and tobago","united states of america" ];
let southamerica = 
["argentina","bolivia","brazil",  "chile","colombia","ecuador","guyana","paraguay","peru","suriname","uruguay","venezuela"];
function continent(){
	if (select.value == 'africa'){
		countryList = africa;
	}
	if (select.value == 'asia'){
		countryList = asia;
	}
	if (select.value == 'europe'){
		countryList = europe;
	}
	if (select.value == 'northamerica'){
		countryList = northamerica;
	}
	if (select.value == 'southamerica'){
		countryList = southamerica;
	}
}
function makeAnswer(){
	if (select.value == 'start'){
		feedback.innerHTML = 'Select a continent.';
	}else{
		continent();
		let answerIndex = Math.floor(Math.random() * countryList.length);
        answer = countryList[answerIndex];
        guess = '';
		countryName.innerHTML = makeGuess();
		imagePath = 'images/' + select.value + '/' + answer + '.png';
		anImage.src = imagePath;
        play.style.display = 'none';
        feedback.style.display = 'none';
	}	
}
function makeGuess(){
    for(let i = 0; i < answer.length; i++){
        if(answer[i] == ' '){
            guess = guess + answer[i];
        }else{
            guess = guess + '_';
        }
    }
    return guess;   
}
function checkGuess(aletter){
    let newGuess ='';
    for(let i = 0; i < answer.length; i++){
        if(answer[i]=== aletter){
            newGuess = newGuess + answer[i];
        }else{
            newGuess = newGuess + guess[i];
        }
    }
    if(answer === newGuess){
        feedback.style.display = 'block';
        feedback.innerHTML = "Great! You solved it!";
    }
    return newGuess;   
}
function containsLetter(aletter){
    for(let i = 0; i < answer.length; i++){
        if(answer[i]=== aletter){
            return true;
        }
    }
    return false;  
}

