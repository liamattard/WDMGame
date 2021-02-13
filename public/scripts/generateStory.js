
var normalEvents = Array();
var restaurantEvents = Array();
var nurseryEvents = Array();
var officeJobEvents = Array();
var eventsList = Array();
var lowHealth = Array();
var lowHappiness = Array();


// O(N^2) algorithm imma fuck it mghandix aptit nahseb :)
function readTextFile(file) {
  var rawFile = new XMLHttpRequest();

  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {

    if (rawFile.readyState === 4) {

      if (rawFile.status === 200 || rawFile.status == 0) {

        // Getting all text from file
        var allText = rawFile.responseText;
        var parents_objects = allText.split("\n");

        for (var i in parents_objects) {

          var properties = parents_objects[i].split(",");
          var parent_id = properties[0];
          var parent_status = properties[4];

          // If property is a parent
          if (parent_status == 1) {


            parent_object = new Object();
            parent_object["name"] = properties[2];
            parent_object["description"] = properties[3];
            parent_object["children"] = Array();
            parent_object["isParent"] = properties[4]; 

            type = properties[1];


            for (var j in parents_objects) {

              var child_properties = parents_objects[j].split(",");
              var child_id = child_properties[0];
              var child_status = child_properties[4];

              if (child_id == parent_id && child_status == 0) {

                child_object = new Object();
                child_object["description"] = child_properties[2];
                child_object["name"] = child_properties[3];
                child_object["Money"] = child_properties[5]; 
                child_object["Health"] = child_properties[6]; 
                child_object["Happiness"] = child_properties[7]; 
                child_object.changeDay = true;
                child_object["isParent"] = child_properties[4]; 
                parent_object["children"].push(child_object);
              }
            }
            if(type == 0){
              normalEvents.push(parent_object);
            } else if (type == 2){
              restaurantEvents.push(parent_object);
            } else if (type == 3){
              officeJobEvents.push(parent_object);
            } else if (type == 1){
              nurseryEvents.push(parent_object);
            } else if (type == 4){
              lowHealth.push(parent_object);
            } else if (type == 5){
              lowHappiness.push(parent_object);
            }
          }
        }
      }
    }
  }
  rawFile.send(null);
}

console.log(normalEvents)

readTextFile("assets/test.csv");

function generateJobs(){

  var root = new Object();

  root["name"] = "Choose Your Job";
  root["description"] = "Choose Carefully!";
  root["children"] = [];
  root["noValues"] = true;
  root["isParent"] = "1";

  var Nursery = new Object();
  Nursery["name"] = "Nursery Teacher";
  Nursery["children"] = [];
  Nursery["description"] = "Take care of toddlers."
  Nursery["Happiness"] = "+10";
  Nursery["Money"] = "+70/ 7 days";
  Nursery["Health"] = "+0";
  Nursery.changeDay = false;
  Nursery["noValues"] = false;
  Nursery["isParent"] = "0";

   
  var HeadWaiter = new Object();
  HeadWaiter["name"] = "Head Waiter";
  HeadWaiter["children"] = [];
  HeadWaiter["description"] = "Managing the whole restaurant."
  HeadWaiter["Happiness"] = "+0";
  HeadWaiter["Money"] = "140/ 7 days";
  HeadWaiter["Health"] = "+0";
  HeadWaiter["noValues"] = true;
  HeadWaiter.changeDay = false;
  HeadWaiter["isParent"] = "0";


  var OfficeJob = new Object();
  OfficeJob["name"] = "Boring Office Job";
  OfficeJob["children"] = [];
  OfficeJob["description"] = "Drinking coffee and counting money.";
  OfficeJob["Happiness"] = "-10";
  OfficeJob["Money"] = "+200/ 7 days";
  OfficeJob["Health"] = "+0";
  OfficeJob.changeDay = false;
  OfficeJob["noValues"] = false;
  OfficeJob["isParent"] = "0";


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
  option["isParent"] = "1";


  var Garage = new Object();
  Garage["name"] = "Garage";
  Garage["children"] = Array();
  Garage.changeDay = false;
  Garage["children"] =  [];
  Garage["description"] = ""
  Garage["Happiness"] = "-5";
  Garage["Money"] = "-35/ 7 days";
  Garage["Health"] = "+0";
  Garage["isParent"] = "0";

   
  var Small = new Object();
  Small["name"] = "Small Apartment";
  Small["children"] = [];
  Small["description"] = ""
  Small["Happiness"] = "+0";
  Small["Money"] = "-60/ 7 days";
  Small["Health"] = "+0";
  Small.changeDay = false;
  Small["isParent"] = "0";


  var Nice = new Object();
  Nice["name"] = "Nice Apartment";
  Nice["children"] = [];
  Nice["description"] = ""
  Nice["Happiness"] = "+10";
  Nice["Money"] = "-100/ 7 days";
  Nice["Health"] = "+0";
  Nice["isParent"] = "0";
  Nice.changeDay = false;

  root._children.push(option);
  option.children.push(Garage);
  option.children.push(Small);
  option.children.push(Nice);

  return root;
}

function carOrBus(root){

    var option = new Object();
    option["name"] = "Transportation";
    option["children"] =  [];
    option["description"] = "Choose your transportation method."
    option.changeDay = false;
    option["isParent"] = "1";



    var Bus= new Object();
    Bus["name"] = "By Bus";
    Bus["children"] = Array();
    Bus.changeDay = false;
    Bus["children"] =  [];
    Bus["description"] = "Travel to work by bus everyday."
    Bus["Happiness"] = "-10";
    Bus["Money"] = "-35/ 7 days";
    Bus["Health"] = "+0";
    Bus["isParent"] = "0";


    var Car= new Object();
    Car["name"] = "By Car";
    Car["children"] = [];
    Car["description"] = "Travel to work by car everyday."
    Car["Happiness"] = "+20";
    Car["Money"] = "-100/ 7 days";
    Car["Health"] = "+0";
    Car.changeDay = false;
    Car["isParent"] = "0";


    root._children.push(option);
    option.children.push(Car);
    option.children.push(Bus);

    return root;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function generateEvents(root){


    if(eventsList.length == 0){
      console.log("ENTERED HERE");

      if (currentPlayer.job == 1){

        eventsList = eventsList.concat(nurseryEvents);
        eventsList = eventsList.concat(normalEvents);

      } else if (currentPlayer.job == 2){

        eventsList = eventsList.concat(restaurantEvents);
        eventsList = eventsList.concat(normalEvents);

      } else if ( currentPlayer.job == 3){

        eventsList = eventsList.concat(officeJobEvents);
        eventsList = eventsList.concat(normalEvents);

      }

      shuffleArray(eventsList);

    }

    // if(currentPlayer.happiness < 25){

    //   shuffleArray(lowHappiness);
    //   root._children.push(lowHappiness[0]);

    // } else if (currentPlayer.health < 25){

    //   shuffleArray(lowHealth);
    //   root._children.push(lowHealth[0]);

    // } else {

      root._children.push(eventsList[0]);
      eventsList.shift();

    // }




    return root;

}