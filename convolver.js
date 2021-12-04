// https://alemangui.github.io/pizzicato/#sound-from-input


function runAfterLoadingPage(){

    // We create a convolver
    var convolver = new Pizzicato.Effects.Convolver({
        impulse: './media/final_proj/small_church_IR.wav',
        mix: 0.5
    }, function() {
        console.log('Convolver ready to be used.');
    });

    var convolver2 = new Pizzicato.Effects.Convolver({
        impulse: './media/final_proj/St_Andrews_Sydney_IR.wav',
        mix: 0.5
    }, function() {
        console.log('Convolver 2 ready to be used.');
    });
    
    // We create a sound, that corresponds to the input microphone
    var voice = new Pizzicato.Sound({
        source: 'input',
    }, function() {
        voice.play()
    });

    const play_buton = document.getElementById("playBtn");
    const stop_button = document.getElementById("stopBtn");
    const convolution_amount = document.getElementById("rangeInput");

    play_buton.addEventListener("click", function () {
        voice.addEffect(convolver);
    });

    stop_button.addEventListener("click", function () {
        voice.removeEffect(convolver);
    });

    convolution_amount.addEventListener("change", function() {
        convolver.mix = (convolution_amount.value)/100;
        document.getElementById("amount").innerHTML = "Intensity : " +convolution_amount.value+"%";
    }, false);


    const play_buton2 = document.getElementById("playBtn2");
    const stop_button2 = document.getElementById("stopBtn2");
    const convolution_amount2 = document.getElementById("rangeInput2");

    play_buton2.addEventListener("click", function () {
        voice.addEffect(convolver2);
    });

    stop_button2.addEventListener("click", function () {
        voice.removeEffect(convolver2);
    });

    convolution_amount2.addEventListener("change", function() {
        convolver2.mix = (convolution_amount2.value)/100;
        // console.log("Value of slider: ", convolution_amount2.value);
        document.getElementById("amount2").innerHTML =  "Intensity : " +convolution_amount2.value+"%";
    }, false);

}

window.onload = runAfterLoadingPage;