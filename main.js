alarm="";
status="";
objects="";
name="";
function preload(){
    alarm=loadSound("perfect_alarm.mp3");
}
function setup(){
canvas=createCanvas(480,320);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    
}
function modelLoaded()
{
    console.log("Model Loaded");
    status=true;
    document.getElementById("status").innerHTML="Status : Detecting Baby"
}
function draw(){
    image(video,0,0,480,320);
    if(status !="")
    {
        objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("present").innerHTML="Baby Detected";

            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+percent+"%",objects[i].x,objects[i].y);
            stroke("#FF0000");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            name=objects[i].label;
    if(name == "person")
    {
        alarm.stop();
    }
    else {
        alarm.play();
    }
    
    
    }
}
}
function gotResult(error,results){
if(error){
    console.log(error);
}
if(results){
    console.log(results);
    objects=results;
}
}
