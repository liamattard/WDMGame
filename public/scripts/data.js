var root = generateJobs();


function click(d) {

  if (!d.children) {

    // Scroll Animation

    body_top = body_top - screen.height / 1.2;
    var shift_value = body_top.toString();
    document.getElementById("body").style.top = shift_value + "px";
    document.getElementById("body").style.height = shift_value + "px";

    shift_hor =
      shift_hor + move(d.parent.children.length, d.parent.children.indexOf(d));
    console.log(
      "din",
      shift_hor,
      move(d.parent.children.length, d.parent.children.indexOf(d))
    );
    document.getElementById("body").style.left = shift_hor.toString() + "px";


    body_height = body_height + 200;
    console.log(body_height);


    // Game Logic

    if (d.changeDay != false) {
      currentPlayer.nextday();
    }

    var jobs = ["Nursery Teacher", "Head Waiter", "Boring Office Job"].indexOf(
      d.name
    );
    var apartment = ["Garage", "Small Apartment", "Nice Apartment"].indexOf(
      d.name
    );

    var transportation = ["By Bus", "By Car"].indexOf(
      d.name
    )

    // Job Selection
    if (jobs != -1) {
      currentPlayer.job = jobs + 1;

      generateHouses(d);

    }  
    // House Selection
    else if (apartment != -1) {

      d["_children"] = Array();
      currentPlayer.house = apartment + 1;
      carOrBus(d);

    } 
    // Transportation Selection
    else if (transportation != -1) {

      currentPlayer.transportation = transportation + 1;
      d["_children"] = Array();
      generateEvents(d);


    }
    else {

      d["_children"] = Array();
      generateEvents(d);

    }

    audio_btn.play();
    audio_move.play();

    d.children = d._children;
    d._children = null;
  }
  update(d);
}

var margin = {
  top: 20,
  right: 120,
  bottom: 20,
  left: 120,
},
  width = screen.width - margin.right - margin.left,
  height = screen.height - margin.top - margin.bottom;

var i = 0,
  body_top = 0,
  shift_hor = 0,
  body_width = screen.width,
  body_height = screen.height,
  duration = 1500,
  rectW = 90,
  rectH = 25;

var audio_btn = new Audio("assets/button.mp3");
var audio_move = new Audio("assets/move.mp3");

var tree = d3.layout.tree().nodeSize([190, 10]);
var diagonal = d3.svg.diagonal().projection(function (d) {
  return [d.x + rectW / 2, d.y + rectH / 2];
});

console.log(screen.width, screen.height);
var svg = d3
  .select("#body")
  .append("svg")
  .attr("id", "graph")
  .attr("align", "center")
  .attr("width", 7000)
  .attr("height", 7000)
  .call((zm = d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", null)))
  .append("g")
  .attr(
    "transform",
    "translate(" +
    screen.width / 2.5 +
    "," +
    screen.height / 7 +
    ")scale(2.5,2.5)"
  );

//necessary so that zoom 9nows where to zoom and unzoom from
zm.translate([350, 20]).scale(2.5);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

root.children.forEach(collapse);
update(root);

d3.select("#body").style("height", screen.height);

function update(source) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
    d.y = d.depth * 180;
  });

  // Update the nodes…
  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    .on("click", click);

  nodeEnter
    .append("rect")
    .attr("class", "title")
    .attr("width", rectW * 1.5)
    //   .attr("height", "25px")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .style("fill", "#ffff");

  nodeEnter
    .append("rect")
    .attr("width", rectW * 2)
    .attr("height", rectH * 2)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("x", -50)
    .attr("y", 35)
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .style("fill", "#ffff");

  nodeEnter
    .append("text")
    .attr("x", rectW / 2)
    .attr("y", rectH / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.name;
    });

  nodeEnter
    .append("text")
    .attr("class", "description")
    .attr("x", rectW / 2)
    .attr("y", rectH * 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.description;
    });

  nodeEnter
    .append("text")
    .attr("class", "attributes")
    .attr("x", -rectW / 3)
    .attr("y", rectH * 3.1)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return "Health";
    });
  nodeEnter
    .append("text")
    .attr("class", "attribute_values")
    .attr("x", -rectW / 3)
    .attr("y", rectH * 2.8)
    .attr("dy", ".35em")
    .attr("fill", " rgb(100, 195, 50)")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.Health;
    });

  var x = true;

  nodeEnter
    .append("text")
    .attr("class", "attributes")
    .attr("x", "105px")
    .attr("y", rectH * 3.1)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      if (d.Happiness == null) {
        x = false;
      }
      return "Happiness";
    });
  nodeEnter
    .append("text")
    .attr("class", "attribute_values")
    .attr("x", "105px")
    .attr("y", rectH * 2.8)
    .attr("dy", ".35em")
    .attr("fill", " rgb(131, 25, 25)")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.Happiness;
    });

  nodeEnter
    .append("text")
    .attr("class", "attributes")
    .attr("x", rectW / 2.3)
    .attr("y", rectH * 3.1)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return "Money";
    });

  nodeEnter
    .append("text")
    .attr("class", "attribute_values")
    .attr("x", rectW / 2.3)
    .attr("y", rectH * 2.8)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("fill", "rgb(100, 195, 50)")
    .text(function (d) {
      return d.Money;
    });

  // Transition nodes to their new position.
  var nodeUpdate = node
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  nodeUpdate
    .select("rect")
    .attr("width", rectW)
    .attr("height", rectH)

    .attr("rx", 6)
    .attr("ry", 6)
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .style("fill", "#fff");

  nodeUpdate.select("text").style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + source.x + "," + source.y + ")";
    })
    .remove();

  nodeExit
    .select("rect")
    .attr("width", rectW)
    .attr("height", rectH)
    //   .attr("width", bbox.getBBox().width)
    //   .attr("height", bbox.getBBox().height)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

  nodeExit.select("text");

  // Update the links…
  var link = svg.selectAll("path.link").data(links, function (d) {
    return d.target.id;
  });

  // Enter any new links at the parent's previous position.
  link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("x", rectW / 2)
    .attr("y", rectH / 2)
    .attr("d", function (d) {
      var o = {
        x: source.x0,
        y: source.y0,
      };
      return diagonal({
        source: o,
        target: o,
      });
    });

  // Transition links to their new position.
  link.transition().duration(duration).attr("d", diagonal);

  //   Transition exiting nodes to the parent's new position.
  link
    .exit()
    .transition()
    .duration(duration)
    .attr("d", function (d) {
      var o = {
        x: source.x,
        y: source.y,
      };
      return diagonal({
        source: o,
        target: o,
      });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

//Redraw for zoom
function redraw() {
  //console.log("here", d3.event.translate, d3.event.scale);
  svg
    .attr(
      "transform",
      "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")"
    )
    .attr("width", 100 + "%");
}

function move(length, index) {
  if (length == 2) {
    if (index == 0) {
      return 220;
    } else {
      return -200;
    }
  } else if (length == 3) {
    if (index == 0) {
      return 500;
    } else if (index == 2) {
      return -500;
    } else {
      return 0;
    }
  }
}

