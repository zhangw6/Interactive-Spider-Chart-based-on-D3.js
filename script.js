
function ini() {
    var data = [
        [
            {attribute_name: "School Rank", value: 72},
            {attribute_name: "A2", value: 0.19},
            {attribute_name: "A3", value: 4200},
            {attribute_name: "A4", value: 34},
            {attribute_name: "A5", value: 67}

        ], [
            {attribute_name: "School Rank", value: 48},
            {attribute_name: "A2", value: 0.15},
            {attribute_name: "A3", value: 3700},
            {attribute_name: "A4", value: 38},
            {attribute_name: "A5", value: 34}
        ]

        ,[
            {attribute_name: "School Rank", value: 38},
            {attribute_name: "A2", value: 0.13},
            {attribute_name: "A3", value: 5700},
            {attribute_name: "A4", value: 55},
            {attribute_name: "A5", value: 32}


        ]
    ];

    var max_data = [120, 0.2, 6000, 70, 100];
    var min_data = [41,0.1, 1000, 20, 30, 10];

    var selected_attributes = [0,1,2,3,4];

    var colours_of_items = ["green", "blue","pink"];
    var sequence_of_selected_attributes = [0, 1, 1, 1,1];//e.g. want school rank to be as samll as possible


 



    
    drawSpiderChart(data, 'chart', max_data, min_data, selected_attributes, colours_of_items, sequence_of_selected_attributes);
}


function drawSpiderChart(data, div_name, max_data, min_data, selected_attributes, colours_of_items, sequence_of_selected_attributes) {
 
 var newdata = data;
   var p = document.getElementById("pop");
    p.appendChild(document.createElement("br"));    

var k = document.getElementById("chart");
console.log("initial:"+k.getBoundingClientRect().top);

   for(var i=0;i<data[0].length;i++){
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.class = "checkbox";
    checkbox.checked = true;
 
    checkbox.id = i;
    p.appendChild(checkbox);


    // checkbox.onchange = changeHandle(this,selected_attributes);

    var label = document.createElement('label')
    label.appendChild(document.createTextNode(data[0][i].attribute_name));

    p.appendChild(label);
    p.appendChild(document.createElement("br"));    


}

var num1 = i;



for(var i=data[0].length;i<data[0].length+data.length;i++){
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.class = "checkbox";
    checkbox.checked = true
    checkbox.id = i;
    p.appendChild(checkbox);


    // checkbox.onchange = changeHandle(this,selected_attributes);

    var label = document.createElement('label')
    label.appendChild(document.createTextNode("NO."+(i-data[0].length+1)+"House"));

    p.appendChild(label);
    p.appendChild(document.createElement("br"));    


}

var num2 = i;


  $( function() {
    $( "#pop" ).draggable();
  } );


    var w = document.getElementById(div_name).clientWidth - 150;
    var h = document.getElementById(div_name).clientHeight - 150;

    var mycfg = {
        w: w,
        h: h,
        maxValue: 0.6,
        minValue: [],
        maxData: [],
        levels: 6,
        ExtraWidthX: 200,
        color: ["yellow", "blue", "red"],
        sequence: [],
        zoom:1
    }


    mycfg.sequence = sequence_of_selected_attributes;
    mycfg.color = colours_of_items;
    mycfg.minValue = min_data;
    mycfg.maxData = max_data;
    mycfg.zoom = (Math.max.apply(Math, max_data)-Math.max.apply(Math, min_data));






var newdata = data;


   var b = document.getElementById("button2");
    b.addEventListener ("click",function(){myFunction4(newdata,div_name,mycfg,num1,num2,max_data,min_data,sequence_of_selected_attributes)},false);
   //object.addEventListener("click", myScript);




var newdata = data;
var selected_attributes2 = [];

for(var i=0;i<data[0].length;i++){
   if(!selected_attributes.includes(i)){
    selected_attributes2.push(i);

   }
   else{

   }


}



    for (var i = 0, j = 0; i < selected_attributes2.length; ++i) {
        splice1(newdata, (selected_attributes2[i] - j));
        j++;
    }


    RadarChart.draw('#'+div_name, newdata, mycfg);


}

function check(data,selected_attributes,mycfg){


   selected_attributes=myFunction2(data[0].length);

   for (var i = 0, j = 0; i < selected_attributes.length; ++i) {
        splice1(data, (selected_attributes[i] - j));
        j++;
    }

    

   RadarChart.draw('#'+'chart', data, mycfg);


}


function splice1(d, n) {
    for(var i=0;i<d.length;i++){
        d[i].splice(n,1);
        
    }
}


function splice2(d, n) {
   d.splice(n,1);
}


function myFunction(){

document.getElementById("pop").style.display = "block";
var k = document.getElementById("chart");
k.getBoundingClientRect().top=8;
console.log("click"+k.getBoundingClientRect().top);


}


function myFunction2(num){


selected_a = [];


for(var i=0;i<num;i++){
var cb = document.getElementById(i);
var t = document.getElementsByClassName("checkbox");
console.log(t[0]);
if(!cb.checked){
    selected_a.push(i);

}//if
}//for






return selected_a;


}//function


function myFunction3(num1,num2){


selected_h = [];



for(var i= num1;i<num2;i++){
    var cb = document.getElementById(i);
   if(!cb.checked){
    selected_h.push(i-5);

   
}//if
}//for





return selected_h;


}//function

function changeHandle(checkbox,selected_a){


}





function myFunction4(data,div_name,mycfg_new,num1,num2,max_data_new,min_data_new,sequence_new){

    var temp = JSON.parse(JSON.stringify(data));
    var tempmax = JSON.parse(JSON.stringify(max_data_new));
    var tempmin = JSON.parse(JSON.stringify(min_data_new));
    var temps = JSON.parse(JSON.stringify(sequence_new));
    var tempcfg = JSON.parse(JSON.stringify(mycfg_new));




    var selected_a = [];
    var selected_h = [];

 var selected_a=myFunction2(num1);
 var selected_h=myFunction3(num1,num2);

 if((temp[0].length-selected_a.length)<3){
    alert("not enough attributes, please add more!!!");

    document.getElementById("pop").style.display = "block";

    return;
    


 }

if((temp.length-selected_h.length)<1){
    alert("not enough house to compare, please add more!!!");

    document.getElementById("pop").style.display = "block";

    return;


 }


 for (var i = 0,j=0; i < data[0].length; ++i) {
  
     if(selected_a.includes(i)){
        tempmax.splice(i-j,1);
        tempmin.splice(i-j,1);
        temps.splice(i-j,1);
        j++;

     }

    }

var t;

    tempcfg.minValue = tempmin;
    tempcfg.maxData = tempmax;
    tempcfg.sequence=temps;
    tempcfg.zoom = (Math.max.apply(Math, tempmax)-Math.max.apply(Math, tempmin))*0.6;



  for (var i = 0, j = 0; i < selected_a.length; ++i) {
        splice1(temp, (selected_a[i] - j));
  

        j++;


    }

for (var i = 0, j = 0; i < selected_h.length; ++i) {
         splice2(temp, (selected_h[i] - j));


        j++;

    }

 RadarChart.draw('#'+div_name, temp, tempcfg);

document.getElementById("pop").style.display = "none";
var k = document.getElementById("chart");
console.log("close:"+k.getBoundingClientRect().top);
}






