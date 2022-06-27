const img = document.querySelector(".inner");
const start = document.querySelector(".start");
const dogname = document.querySelector("#dogname");
console.log(dogname);
const scoreN = document.querySelector("#myscore");
let count = 0;
let score = 0;
let counter = 5;// timer
let scoreCheck=0;
let timespan =document.querySelector("#timer1")
let progressBar =document.querySelector("#progress-inner")

function addScore(newScore){
  score+=newScore;
  scoreN.innerText=score;  
}



async function delay(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
  }

async function play() {
scoreCheck=score


   
  if (count == 5) {
    value = confirm(`Do You Want To Continue?? Your Score: ${score}` );
    if (value == true) {
      count = 0;
      
    } else 

    {  count = 0
       scoreN.innerText=0;
       scoreCheck=0
       score=0
      
     


        
       alert("Thank you! Bye!");
       return img.innerHTML = `<img src="img/giphy.gif">`;        
      
    }

      return;
    }
  
  // after five attempts
  let breedList = await bringBreedList();
  let Cards = await get4cards(breedList);
  let Shown = await showImg(Cards);
  count += 1;
  for(let i=3; i>=0;i--)
    {
    await delay(1000);
    // progressWidth = i /5 * 100
    if(i > 0){
    // progressBar.style.width = progressWidth +"%"
    timespan.innerHTML= i+"s"
    } else{
    // else{progressBar.style.width= "0%"
    clearInterval;
    timespan.innerText=0;}
    } 

  }



async function bringBreedList() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
    return await data.message; 
}

async function get4cards(breedList) {
  try {
    let fourCards = [];
    let tempArr = [];
    let i = 0;

    for (key in breedList) {
      //you need a for..in loop to iterate through an object
      if (breedList[key].length > 0) {
        breedList[key].forEach((subType, i) => {
          tempArr.push(`${key}/${breedList[key][i]}`);
           });
      } else {
        tempArr.push(`${key}`);
      }
    }
    while (i < 4) {
      let n = Math.floor(Math.random() * tempArr.length);
      fourCards.push(tempArr[n]);
      i++;
    }

    return fourCards;
  } catch (e) {
    console.log("error");
  }
}


async function showImg(fourCards) {
  img.innerHTML = "";

  randomN = Math.floor(Math.random() * 4);
  let dogName = fourCards[randomN];
  dogname.innerHTML = `<h3> ${dogName.toUpperCase().replace("/", " ").split(' ').reverse().join(' ')} </h3>`; //이름 앞 뒤 아직 변경 안 됨.

  for (let i = 0; i < fourCards.length; i++) {
    const response = await fetch(
      `https://dog.ceo/api/breed/${fourCards[i]}/images/random`
    );
    const data = await response.json();
    const data1 = await data.message;

    if (dogName == fourCards[i]) {
      const imgEl = document.createElement("button");
      img.appendChild(imgEl);
      imgEl.setAttribute("id", "right");
      imgEl.innerHTML = `<img src =${data1}>`;
    } else {
      img.innerHTML += `<button class="wrong" data-value="${fourCards[i]}"><img src=${data1}></button>`;
    }
  }

  document.getElementById("right").onclick = function () {
    rightCard = document.getElementById("right").innerHTML;
    document.getElementById(
      "right"
    ).innerHTML = `<img src="img/ezgif.com-gif-maker.png">`;
    if(scoreCheck == score){
    addScore(5)
    }
    setTimeout(function () {
      document.getElementById("right").innerHTML = rightCard;
    }, 500);
  };

  Array.from(document.getElementsByClassName("wrong")).forEach((wrongImg) => {
    wrongImg.addEventListener("click", function () {
      let wrongCard = wrongImg.innerHTML;
      wrongImg.innerHTML=`<p>${wrongImg.getAttribute("data-value").toUpperCase().replace("/", " ").toUpperCase().replace("/", " ").split(' ').reverse().join(' ')}</p>`
      addScore(-3)
      setTimeout(function(){
      wrongImg.innerHTML = wrongCard;
      }, 500);
    });
  });
  
}


start.addEventListener("click", play);















