
function generateJobs(){

    var root = new Object();

    root["name"] = "Choose Your Job";
    root["description"] = "Choose Carefully!";
    root["children"] = [];
    root["noValues"] = true;

    var Nursery = new Object();
    Nursery["name"] = "Nursery Teacher";
    Nursery["children"] = [];
    Nursery["description"] = "Take care of toddlers."
    Nursery["Happiness"] = "+10";
    Nursery["Money"] = "+70/ 7 days";
    Nursery["Health"] = "+0";
    Nursery.changeDay = false;
    Nursery["noValues"] = false;
     
    var HeadWaiter = new Object();
    HeadWaiter["name"] = "Head Waiter";
    HeadWaiter["children"] = [];
    HeadWaiter["description"] = "Managing the whole restaurant."
    HeadWaiter["Happiness"] = "+0";
    HeadWaiter["Money"] = "+140/ 7 days";
    HeadWaiter["Health"] = "+0";
    HeadWaiter["noValues"] = true;
    HeadWaiter.changeDay = false;

    var OfficeJob = new Object();
    OfficeJob["name"] = "Boring Office Job";
    OfficeJob["children"] = [];
    OfficeJob["description"] = "Drinking coffee and counting money.";
    OfficeJob["Happiness"] = "-10";
    OfficeJob["Money"] = "+200/ 7 days";
    OfficeJob["Health"] = "+0";
    OfficeJob.changeDay = false;
    OfficeJob["noValues"] = false;

    root.children.push(Nursery);
    root.children.push(HeadWaiter);
    root.children.push(OfficeJob);

    return root;
}

function generateSampleBlock(root){

    var option = new Object();
    option["name"] = "Sample";
    option["children"] =  [];

    root._children.push(option);

    return root;
}

function generateHouses(root){

    var option = new Object();
    option["name"] = "Accomodation";
    option["children"] =  [];
    option["description"] = "Choose where you will call home."
    option.changeDay = false;


    var Garage = new Object();
    Garage["name"] = "Garage";
    Garage["children"] = Array();
    Garage.changeDay = false;
    Garage["children"] =  [];
    Garage["description"] = ""
    Garage["Happiness"] = "-5";
    Garage["Money"] = "-35/ 7 days";
    Garage["Health"] = "+0";
     
    var Small = new Object();
    Small["name"] = "Small Apartment";
    Small["children"] = [];
    Small["description"] = ""
    Small["Happiness"] = "+0";
    Small["Money"] = "-60/ 7 days";
    Small["Health"] = "+0";
    Small.changeDay = false;

    var Nice = new Object();
    Nice["name"] = "Nice Apartment";
    Nice["children"] = [];
    Nice["description"] = ""
    Nice["Happiness"] = "+10";
    Nice["Money"] = "-100/ 7 days";
    Nice["Health"] = "+0";
    Nice.changeDay = false;

    root._children.push(option);
    option.children.push(Garage);
    option.children.push(Small);
    option.children.push(Nice);

    body_top = body_top - screen.height / 2.2;
    var shift_value = body_top.toString();
    document.getElementById("body").style.top = shift_value + "px";
    document.getElementById("body").style.height = shift_value + "px";
    return root;
}


function carOrBus(root){

    var option = new Object();
    option["name"] = "Transportation";
    option["children"] =  [];
    option["description"] = "Choose your transportation method."
    option.changeDay = false;


    var Bus= new Object();
    Bus["name"] = "By Bus";
    Bus["children"] = Array();
    Bus.changeDay = false;
    Bus["children"] =  [];
    Bus["description"] = "Travel to work by bus everyday."
    Bus["Happiness"] = "-10";
    Bus["Money"] = "-35/ 7 days";
    Bus["Health"] = "+0";

    var Car= new Object();
    Car["name"] = "By Car";
    Car["children"] = [];
    Car["description"] = "Travel to work by car everyday."
    Car["Happiness"] = "+20";
    Car["Money"] = "-100/ 7 days";
    Car["Health"] = "+0";
    Car.changeDay = false;

    root._children.push(option);
    option.children.push(Car);
    option.children.push(Bus);

    body_top = body_top - screen.height / 2.2;
    var shift_value = body_top.toString();
    document.getElementById("body").style.top = shift_value + "px";
    document.getElementById("body").style.height = shift_value + "px";
    return root;
}