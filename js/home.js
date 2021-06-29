var msg = new SpeechSynthesisUtterance();
var msg1 = new SpeechSynthesisUtterance();
var msg2 = new SpeechSynthesisUtterance();
var msg3 = new SpeechSynthesisUtterance();

    msg.text = "HEY There!...I am your personal yoga instructor.";
    window.speechSynthesis.speak(msg);
    msg1.text = "I may not be able to satisfy all your needs.";
    window.speechSynthesis.speak(msg1);
    msg2.text = "but i am sure i can keep your body and mind healthy...";
    window.speechSynthesis.speak(msg2);

    msg3.text = "Click on Get Started to proceed with the practice session.";
    window.speechSynthesis.speak(msg3);