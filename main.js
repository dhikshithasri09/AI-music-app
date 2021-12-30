leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_variable = ""; 

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("#ADD8E6");
    stroke("#000000");

    song_variable.isPlaying("true");
    leftWristX = song1.play();
    leftWristY = song1.play();
    
    if(scoreLeftWrist > 0.2){
        song_variable.stop(song2);

        if(song1 == "false"){
            song1.play();
            document.getElementById("heading").innerHTML = "heading = " + song1;
        }
    }

    if(scoreRightWrist > 0.2){
        song_variable.stop(song1);

        if(song2 == "false"){
            song2.play();
            document.getElementById("heading").innerHTML = "heading = " + song2;
        }
    }
}

song1 = "";
song2 = "";

function preload(){
    song1 = loadSound("Blinding Lights.mp3");
    song2 = loadSound("Paradise.mp3");
}

function play(){
    song1.play();
    song1.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is Initialised !");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keyponts[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keyponts[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
    }
}