let video;
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

        /*
        setTimeout(function(){
        if((eyeRY < 50.0 && eyeRY > 20.0) && (ankleRY <= 450.0 && ankleRY > 430.0))
        {
            instr1 = 'Position fixed. Navigating...';
            msg.text = "Position fixed. Navigating...";
            window.speechSynthesis.speak(msg);
            
            setTimeout(function(){
                    window.location.href = 'mcorrect.html';
                 }, 5000);
        }
        else
        {
            instr1 = '';
            msg.text = '';
            
            if(eyeRY > 50.0)
            {
                instr1 = 'Standing too close.';
                msg.text = "Standing too close. Move a step back.";
                window.speechSynthesis.speak(msg);
            }
            
            instr1 = '';
            msg.text = '';
            
            if(ankleRY < 430.0)
            {
                instr1 = 'Standing far.';
                msg.text = "Standing far. Move a step forward.";
                window.speechSynthesis.speak(msg);
            }
        }}, 5000);
        */
        var correct = true;
        
        if(eyeRY > 70.0 || eyeRY <= 10.0)
        {
            instr1 = "Align the eye keypoints to the line.";
            itext.innerHTML = instr1;
            msg.text = "Align the eye keypoints to the line.";
            window.speechSynthesis.speak(msg);
            correct = false;
        }
        else
        {
            instr1 = '';
            msg.text = '';
        }
        
        if(ankleRY > 475.0 || ankleRY < 430.0)
        {
            instr2 = "Align the ankle keypoints to the line.";
            itext.innerHTML = instr2;
            msg.text = "Align the ankle keypoints to the line.";
            window.speechSynthesis.speak(msg);
            correct = false;
        }
        else
        {
            instr2 = '';
            msg.text = '';
        }
        
        if(correct == true)
       {
            msg.text = "Perfect. Please wait. You are being navigated.......";
            window.speechSynthesis.speak(msg);
            
            itext.innerHTML = '<span style="color: #18EB1D;">All set! Starting the practice...</span>';
            
            setTimeout(function(){
            window.location.href="./g_correct-indiv.html";
        }, 5000);
       }
       
    }
    else
    {
        setTimeout(correct(), 7000);
    }
    
    console.log('running the model again...')
    setTimeout(correctPose, 7000);
    
    
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
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        
        fill(255, 0, 0);
        ellipse(pose.rightEye.x, pose.rightEye.y, 16);
        ellipse(pose.leftEye.x, pose.leftEye.y, 16);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 16);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 16);
    }
    
    
    strokeWeight(3);
    stroke('green');
    line(0, 50, 640, 50);
    /*
    line(0, 100, 640, 100);
    line(0, 150, 640, 150);
    line(0, 200, 640, 200);
    line(0, 250, 640, 250);
    line(0, 300, 640, 300);
    line(0, 350, 640, 350);
    line(0, 400, 640, 400);
    */
    line(0, 450, 640, 450);
    
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
    //text(poseLabel, 50, 30);
    text(instr2, 20, 50);
    */
    
}
