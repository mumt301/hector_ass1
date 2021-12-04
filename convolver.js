// https://alemangui.github.io/pizzicato/#sound-from-input


function runAfterLoadingPage(){

    // We create a convolver
    var convolver = new Pizzicato.Effects.Convolver({
        impulse: './media/final_proj/small_church_IR.wav',
        mix: 0.5
    }, function() {
        console.log('Convolver ready to be used.');
    });
    
    // We create a sound, that corresponds to the input microphone
    var voice = new Pizzicato.Sound({
        source: 'input',
    }, function() {
        voice.play()
    });

    const play_buton = document.getElementById("playBtn");
    const stop_button = document.getElementById("stopBtn");

    play_buton.addEventListener("click", function () {
        voice.addEffect(convolver);
    });

    stop_button.addEventListener("click", function () {
        voice.removeEffect(convolver);
    });

}

window.onload = runAfterLoadingPage;