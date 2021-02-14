class CurrentPlayer{

    constructor(){

        this.balance = 1000; 
        this.health = 100;
        this.date = 1;
        this.happiness = 100;
        this.job = 0;
        this.house = 0;
        this.transportation = 0;


    }
    /**
     *  Add or detect money from the current Player with an animation.
     * */ 
    calculate_money(price, op){

        var current_balance = currentPlayer.balance;

        if(op == "-"){
            this.balance = this.balance-price;
        }
        else if(op =="+"){
            this.balance = this.balance+price;
        }

        const obj = document.getElementById("balance_value");
        animateValue(obj, current_balance, this.balance, 2000);
    }

    calculate_health(value, op){

        console.log("VALUE "+value);
        console.log("OP "+op);

        var current_health= this.health;

        if(op=="-"){
            this.health = this.health-value;
        }
        if(op=="+"){
            this.health = this.health+value;
        }

        if(this.health> 100){
            this.health = 100;

        }

        // document.getElementById("health_score").innerHTML = this.health;
        // document.getElementById("health_value").style.transition = "all 1s";
        // document.getElementById("health_value").style.width = this.health.toString()+"%";


        document.getElementById("health_value").style.width = this.health.toString()+"%";

        const obj = document.getElementById("health_percentage");
        animateValue(obj, current_health, this.health, 5000);


    }

    calculate_happiness(value, op){

        var current_happiness = this.happiness;

        if(op == "-"){
            this.happiness= this.happiness-value;
        }
        else if(op == "+"){
            this.happiness= this.happiness+value;
        }

        if (this.happiness>100){
            this.happiness = 100;
        }

        document.getElementById("happiness_label").innerHTML = this.happiness;

        
        const obj = document.getElementById("happiness_label");
        animateValue(obj, current_happiness, this.happiness, 2000);

        if( this.happiness > 75){
            document.getElementById("rotate_cube").style.transform = "rotateY(0deg)";
        }else if( this.happiness > 50){
            document.getElementById("rotate_cube").style.transform = "rotateY(-90deg)";

        }else if( this.happiness > 25){
            document.getElementById("rotate_cube").style.transform = "rotateY(-180deg)";

        }else if( this.happiness > 0){
            document.getElementById("rotate_cube").style.transform = "rotateY(-270deg)";

        }
        
        // document.getElementById("happiness_value").style.transition = "all 1s";
        // document.getElementById("happiness_value").style.width = this.happiness.toString()+"%";

    }


    nextday(d){



        document.getElementById("day_"+ this.date.toString()).classList.remove("active");

        this.date++;

        var change_health_value = d.Health.slice(1);
        var change_health_symbol = d.Health.charAt(0);

        console.log("HEALTH VALUE "+ d.Health);
        console.log("HEALTH VV"+ change_health_value);
        console.log("HEALTH VVV"+ change_health_symbol);
        if(change_health_value!= "0"){
            currentPlayer.calculate_health(parseInt(change_health_value) , change_health_symbol);

        }


        var change_money_value = d.Money.slice(1);
        var change_money_symbol = d.Money.charAt(0);
        console.log("Money VALUE "+ change_money_value);
        if(change_money_value != "0"){

            currentPlayer.calculate_money(parseInt(change_money_value), change_money_symbol);

        }

        var change_happiness_value = d.Happiness.slice(1);
        var change_happiness_symbol = d.Happiness.charAt(0);
        console.log("Happiness VALUE "+ change_happiness_value);
        if(change_happiness_value != "0"){

            currentPlayer.calculate_happiness(parseInt(change_happiness_value), change_happiness_symbol);

        }



        // console.log(this.date);
        if((this.date) %7 === 0){ 


            let moneyShot = document.getElementsByClassName("moneyShot");

            function timeout (ms) {
                return new Promise(res => setTimeout(res,ms));
              }


            async function fireEvents () {

                moneyShot[0].style.display = "block";
                await timeout(3000);
            }

            fireEvents().then(() =>
            {

                moneyShot[0].style.display = "none";

            });


            if (this.job == 1){

                currentPlayer.calculate_money(70,"+");
                currentPlayer.calculate_happiness(10,"+");

            } else if (this.job == 2){

                currentPlayer.calculate_money(140,"+");

            } else if(this.job == 3){

                currentPlayer.calculate_money(200,"+");
                currentPlayer.calculate_happiness(10,"-");

            }

            if (this.house == 1){

                currentPlayer.calculate_money(35,"-");
                currentPlayer.calculate_happiness(5,"-");
                

            }
            else if (this.house == 2){

                currentPlayer.calculate_money(60,"-");
                

            } else if (this.house == 3){

                currentPlayer.calculate_money(100,"-");
                currentPlayer.calculate_happiness(10,"-");

            }

            if (this.transportation == 1){

                currentPlayer.calculate_happiness(20,"+");
                currentPlayer.calculate_money(100,"-");

            } else if (this.transportation == 2){

                currentPlayer.calculate_happiness(10,"-");
                currentPlayer.calculate_money(35,"-");

            }



        }
        
        document.getElementById("date").innerHTML = this.date.toString();

        document.getElementById("day_"+ this.date.toString()).classList.add("active");

        if(this.balance <= 0 || this.happiness <= 0 || this.health <=0 ||this.date >= 31){


            results();

        }

        

    }
}

var line=0;
var audio;
let currentPlayer = new CurrentPlayer();


function startStory() {

    // TODO: Add Intro
    document.getElementById("intro_title").classList.add("fadeOut");
    document.getElementById("start_btn").classList.add("fadeOut");


    // Setting Timeline
    setDays();
    document.getElementById("date").innerHTML = currentPlayer.date.toString();

    // Setting Player Values 
    currentPlayer.calculate_money(0,"+");
    setTimeout(function(){currentPlayer.calculate_health(0, "+"); },2000);
    setTimeout(function(){currentPlayer.calculate_happiness(0, "+"); },2000);
    

    audio = new Audio('assets/audio.mp3');
    audio.play();

    setTimeout(runStory, 1000);

}

function setDays(){


    let timeline = document.getElementById('timeline');

    for (let i = 1; i < 31; i++){


        let span = document.createElement('span'); 
        span.classList.add('day');
        span.id = 'day_' +i;
        span.innerText = i;

        if (i % 7=== 0){

            span.innerText = "PAYDAY";
            span.style.color = "rgb(120,120,120)";
            span.style.fontWeight = "900";

        }

        if(i==1){

            span.classList.add('active');
        }

        timeline.appendChild(span);

    }

}


function runStory(){

    story = line.toString();
    console.log(story)
    document.getElementById(story).classList.add("text_anim");

    setTimeout(function() {   
        story = line.toString();
        console.log(story)
        document.getElementById(story).classList.add("text_anim");

        line++;                   
        if (line < 1) {            
            runStory();              
        }else{
            
            removeIntro();
        }                   
      }, 1000)
}


function removeIntro(){

    // TODO:Add audio lowered down

    audio.volume = 0.1;

    document.getElementById("body").style.display = "block";
    document.getElementById("body").classList.add("fadeIn");


    // Hide intro
    document.getElementById("intro").style.display = "none";

    
    // Show Balance Meter
    document.getElementById("balance").classList.remove("no_opacity");
    document.getElementById("balance").classList.add("fadeIn");

    // Show Health Bar
    document.getElementById("progress_bar").classList.remove("no_opacity");
    document.getElementById("meter").classList.remove("no_opacity");
    document.getElementById("progress_bar").classList.add("fadeIn");
    document.getElementById("meter").classList.add("fadeIn");

    // Show Happiness Bar
    document.getElementById("cube_scene").classList.remove("no_opacity");
    // document.getElementById("meterTwo").classList.remove("no_opacity");
    document.getElementById("cube_scene").classList.add("fadeIn");
    // document.getElementById("meterTwo").classList.add("fadeIn");

    // Show Current Day
    document.getElementById("current_day").classList.remove("no_opacity");
    document.getElementById("current_day").classList.add("fadeIn");

    setTimeout(function(){audio.pause()},1000);
}


/**
 *  Animate Numbers going up or down
 * */ 
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
}



function results(){

    document.getElementById("graph").style.display= "none";
    document.getElementById("balance").style.textAlign = "center";
    document.getElementById("balance").style.top = 15 + "%";
    document.getElementById("balance").style.left = 45 + "%";
    document.getElementById("balance").style.transform = "translate(-50%,-50%)";
    document.getElementById("balance").style.transform = "scale(1.5)";


    document.getElementById("progress_bar").style.top = 80 + "%";
    document.getElementById("progress_bar").style.left = 40 + "%";


    elements = [["cube_scene", 77, 40], ["current_day", 45, 40]]

    for (i = 0; i < elements.length; i++) {

        document.getElementById(elements[i][0]).style.top = elements[i][1] + "%";
        document.getElementById(elements[i][0]).style.right = elements[i][2] + "%";
        document.getElementById(elements[i][0]).style.transform = "translate(-50%,-50%)";

    }
  

}
