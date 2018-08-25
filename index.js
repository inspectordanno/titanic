$(document).ready(function(){

function draw(passengerClass) {

  var survived = 0;
  var died = 0;
  console.log(passengerClass);

  titanicData.forEach(function(person, i) {
    // console.log(person.Pclass);
    if (person.PClass === passengerClass || passengerClass === "all") {
      console.log("YES");

      if (person.Survived == "1") {
        survived = survived + 1;
      } else if (person.Survived == "0") {
        died = died + 1;
      }

    }
  });

  var bars = svg.selectAll("rect")
    .data([{
        category: "survived",
        value: survived
      },
      {
        category: "died",
        value: died
      }
    ]);

  function styleBars(rect) {
    rect
      .attr("height", function(d) {
        return yScale(d.value);
      })
      .attr("width", barWidth)
      .attr("x", function(d, i) {
        return i * (w / 2);
      })
      .attr("y", function(d) {
        return h - yScale(d.value);
      });
  }


  bars.enter()
    .append("rect")
    .attr("id", function(d) {
      return d.category;
    })
    .attr("fill", function(d) {
      if (d.category === "survived") {
        return "#34495e";
      } else if (d.category === "died") {
        return "grey";
      }
    })
    .call(styleBars);

  bars.transition().duration(1000)
      .call(styleBars);

  var labels = svg.selectAll("text")
    .data([{
        category: "survived",
        value: survived
      },
      {
        category: "died",
        value: died
      }
    ]);

  labels.enter().append("text")
    .attr("y", 80)
    .text(function(d) {
      return d.value;
    })
    .attr("x", function(d, i) {
      return i * (w / 2) + barWidth/2;
    })
    .attr("text-anchor", "middle");

  labels
    .text(function(d) {
      return d.value;
    });

}

var titanicData;
var h, w, barPadding, barWidth, yScale, svg;


d3.csv("titanic.csv", function(error, data) {
  w = 200;
  h = 300;
  barPadding = 10;
  barWidth = (w/2) - barPadding;


  yScale = d3.scaleLinear()
    .domain([0, 1313])
    .range([0, 300]);


  svg = d3.select(".svg-container-1")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  console.log(data);
  titanicData = data;

  $("#first-class").on("click", function() {
    draw("1st");
  });

  $("#second-class").on("click", function() {
    draw("2nd");
  });

  $("#third-class").on("click", function() {
    draw("3rd");
  });

  $("#total").on("click", function() {
    draw("all");
  });

  draw("all");

  svg.append("text")
    .attr("x", barWidth/2)
    .attr("y", h - barPadding)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text("Lived");

  svg.append("text")
    .attr("x", (w/2) + (barWidth/2))
    .attr("y", h - barPadding)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text("Died");


  });
});
