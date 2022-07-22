img="";
status="";
object=[];
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function modelloaded(){
    console.log("modelloaded");
    status=true;
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
   else{
    console.log(results);
    object=results;
   }
}

function preload(){
    img=loadImage("dog_cat.jpg");
}

function draw(){
    image(video,0,0,400,400);
    if(status != ""){
        objectDetector.detect(video,gotresults);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected: "+ object.length;
            fill("green");
            percent=floor(object[i].confidence*100);
            text(object[i].label + "" + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("green");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}