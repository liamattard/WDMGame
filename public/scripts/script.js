class CurrentPlayer{

    constructor(){

        this.balance = 1000; 
        this.health = 100;
        this.date = 1;
        this.happiness = 100;
        this.job = 0;
        this.house = 0;


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

        var current_health= health;

        if(op=="-"){
            this.health = this.health-value;
        }
        if(op=="+"){
            this.health = this.health+value;
        }

        // document.getElementById("health_score").innerHTML = this.health;
        // document.getElementById("health_value").style.transition = "all 1s";
        // document.getElementById("health_value").style.width = this.health.toString()+"%";


        document.getElementById("health_value").style.width = health.toString()+"%";

        const obj = document.getElementById("health_percentage");
        animateValue(obj, current_health, this.health, 5000);


    }

    calculate_happiness(value, op){

        if(op == "-"){
            this.happiness= this.happiness-value;
        }
        else if(op == "+"){
            this.health = this.happiness+value;
        }

        document.getElementById("happiness_score").innerHTML = this.happiness;
        document.getElementById("happiness_value").style.transition = "all 1s";
        document.getElementById("happiness_value").style.width = this.happiness.toString()+"%";

    }


    nextday(){

        if(this.job == 1){

            currentPlayer.calculate_money(20,"+");

        }

        document.getElementById("day_"+ this.date.toString()).classList.remove("active");

        this.date++;
        
        document.getElementById("date").innerHTML = this.date.toString();

        document.getElementById("day_"+ this.date.toString()).classList.add("active");

    }
}

var line=0;

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
    

    setTimeout(runStory, 1000);

}

function setDays(){


    let timeline = document.getElementById('timeline');

    for (let i = 1; i < 31; i++){

        let span = document.createElement('span'); 
        span.classList.add('day');
        span.id = 'day_' +i;
        span.innerText = i;

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
        if (line < 6) {            
            runStory();              
        }else{
            
            removeIntro();
        }                   
      }, 1000)
}


function removeIntro(){

    // TODO:Add audio lowered down


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
    document.getElementById("happiness_bar").classList.remove("no_opacity");
    document.getElementById("meterTwo").classList.remove("no_opacity");
    document.getElementById("happiness_bar").classList.add("fadeIn");
    document.getElementById("meterTwo").classList.add("fadeIn");

    // Show Current Day
    document.getElementById("current_day").classList.remove("no_opacity");
    document.getElementById("current_day").classList.add("fadeIn");

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

