
function generateJobs(){

    var root = new Object();

    root["name"] = "Choose Your Job";
    root["children"] = [];

    var Nursery = new Object();
    Nursery["name"] = "Nursery Teacher";
    Nursery["children"] = [];
    Nursery.changeDay = false;
     
    var HeadWaiter = new Object();
    HeadWaiter["name"] = "Head Waiter";
    HeadWaiter["children"] = [];
    HeadWaiter.changeDay = false;

    var OfficeJob = new Object();
    OfficeJob["name"] = "Boring Office Job";
    OfficeJob["children"] = [];
    OfficeJob.changeDay = false;

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
    option["name"] = "Choose Your Accomodation";
    option["children"] =  [];
    option.changeDay = false;


    var Garage = new Object();
    Garage["name"] = "Garage";
    Garage["children"] = Array();
    Garage.changeDay = false;
     
    var Small = new Object();
    Small["name"] = "Small Apartment";
    Small["children"] = [];
    Small.changeDay = false;

    var Nice = new Object();
    Nice["name"] = "Nice Apartment";
    Nice["children"] = [];
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