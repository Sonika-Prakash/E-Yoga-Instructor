let video;
let keys = JSON.parse(olgpose);
let poseNet;
let pose;
let skeleton;

let brain;

let poseLabel;
let instr = '';
let instr1 = '';
let instr2 = '';
let instr3 = '';
let instr4 = '';
let instr5 = '';

var msg = new SpeechSynthesisUtterance();

var itext = document.getElementById("instr");

function setup() {
  var cnvs = createCanvas(640, 480);
  cnvs.style('margin-top', '200px');
  cnvs.style('margin-left', '70px');
  cnvs.style('border', '4px solid black');
  cnvs.style('box-shadow', '5px 10px 20px #2E4053');
  
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, posenetLoaded);
  poseNet.on('pose', gotPoses);
}

function posenetLoaded() {
    console.log('poseNet ready');
    correctPose();
}

function correctPose() {
    if (pose) 
    {
        instr = '';
        itext.innerHTML = '';
        correct();
    }
    else
    {
        setTimeout(correctPose, 100);
    }
}

function correct() {
    if (pose)
    {
        eyeRX = pose.rightEye.x;
        eyeRY = pose.rightEye.y;
        shoulderRX = pose.rightShoulder.x;
        shoulderRY = pose.rightShoulder.y;
        shoulderLX = pose.leftShoulder.x;
        shoulderLY = pose.leftShoulder.y;
        elbowRX = pose.rightElbow.x;
        elbowRY = pose.rightElbow.y;
        elbowLX = pose.leftElbow.x;
        elbowLY = pose.leftElbow.y;
        wristRX = pose.rightWrist.x;
        wristRY = pose.rightWrist.y;
        wristLX = pose.leftWrist.x;
        wristLY = pose.leftWrist.y;
        hipRX = pose.rightHip.x;
        hipRY = pose.rightHip.y;
        hipLX = pose.leftHip.x;
        hipLY = pose.leftHip.y;
        kneeRX = pose.rightKnee.x;
        kneeRY = pose.rightKnee.y;
        kneeLX = pose.leftKnee.x;
        kneeLY = pose.leftKnee.y;
        ankleRX = pose.rightAnkle.x;
        ankleRY = pose.rightAnkle.y;
        ankleLX = pose.leftAnkle.x;
        ankleLY = pose.leftAnkle.y;
        
        var correct = true;
        
    
        
        if(wristRY > keys[0]["y"] && wristLY > keys[1]["y"])
        {
            
            msg.text = "raise your hands";
            window.speechSynthesis.speak(msg);
            if(itext.innerHTML == ''){
                itext.innerHTML = "Raise your hands.";
            }
            correct = false;
        }
        else
        {
           
            msg.text = '';
        }
        
        if(wristRY > keys[0]["y"])
        {
            instr1 = 'Raise your right hand.';
            if(itext.innerHTML == ''){
                itext.innerHTML = instr1;
            }
            msg.text = "raise your right hand";
            window.speechSynthesis.speak(msg);
            correct = false;
        }
        else
        {
            instr1 = '';
            msg.text = '';
        }
        
        if(wristLY > keys[1]["y"])
        {
            instr2 = 'Raise your left hand.';
            if(itext.innerHTML == ''){
                itext.innerHTML = instr2;
            }
            msg.text = "raise your left hand.";
            window.speechSynthesis.speak(msg);
            correct = false;
        }
        else
        {
            instr2 = '';
            msg.text = '';
        }
        
        kdiffhR = Math.abs(kneeRY - hipRY);
        if(kdiffhR > keys[2]["y"])
        {
            instr3 = 'Raise your right knee to the hip level.'
            if(itext.innerHTML == ''){
                itext.innerHTML = instr3;
            }
            msg.text = "Raise your right knee to hip level.";
            window.speechSynthesis.speak(msg);
            correct = false;
        }
        else
        {
            instr3 = '';
            msg.text = '';
        }
        
        kdiffaR = Math.abs(kneeRX - ankleRX);
        if(kdiffaR > keys[3]["x"])
        {
            instr4 = 'Stack your right knee over your right ankle forming 90 degrees.';
            if(itext.innerHTML == ''){
                itext.innerHTML = instr4;
            }
            msg.text = "Stack your right knee over your right ankle.";
            window.speechSynthesis.speak(msg);
        }
        else
        {
            instr4 = '';
            msg.text = '';
        }
        
        
          if(correct == true)
        {
            setTimeout(function(){
            msg.text = "Perfect! Please hold the pose and breathe deeply. Inhale. Exhale. Inhale. Exhale. Inhale. Exhale. Stand straight. You have successfully practiced all the poses.";
            window.speechSynthesis.speak(msg);
            
            window.location.href = './workout.html';
            }, 2000);
        }
    }
    else
    {
        setTimeout(correct(), 5000);
    }
    
    console.log('running the model again...')
    setTimeout(correctPose, 5000);
    
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw()
{
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);
    
    if(pose)
    {
        for(let i = 0; i < pose.keypoints.length; i++)
        {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16);
        }
        
        for(let i = 0; i < skeleton.length; i++)
        {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
    
    /*
    strokeWeight(2);
    stroke(170);
    line(0, 50, 640, 50);
    line(0, 100, 640, 100);
    line(0, 150, 640, 150);
    line(0, 200, 640, 200);
    line(0, 250, 640, 250);
    line(0, 300, 640, 300);
    line(0, 350, 640, 350);
    line(0, 400, 640, 400);
    line(0, 450, 640, 450);
    */
    
    pop();

    /*
    fill(0, 0, 0);  
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(LEFT);
    //text(poseLabel, 50, 30);
    text(instr1, 20, 30);
    
    fill(0, 0, 0);  
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(LEFT);
    text(instr2, 20, 50); 
    
    fill(0, 0, 0);  
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(LEFT);
    text(instr3, 20, 70);
    
    fill(0, 0, 0);  
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(LEFT);
    text(instr4, 20, 90);
    
    fill(0, 0, 0);  
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(LEFT);
    text(instr5, 20, 110); 
    */
    
    if(instr1 == '' && instr2 == '' && instr3 == '' && instr4  == '' && instr5 == '')
    {
        instr = 'Perfect!';
        
    }
    
    /*
    fill(0, 0, 0);  
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(LEFT);
    text(instr, 20, 30); 
    */
}