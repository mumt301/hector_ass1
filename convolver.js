// https://alemangui.github.io/pizzicato/#sound-from-input


function runAfterLoadingPage(){

    // We create a convolver
    var convolver = new Pizzicato.Effects.Convolver({
        impulse: './media/final_proj/small_church_IR.wav',
        mix: 0.5
    }, function() {
        console.log('Convolver ready to be used.');
    });

    // var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    //     feedback: 0.3,
    //     time: 0.2,
    //     mix: 0.68
    // });
    
    // We create a sound, that corresponds to the input microphone
    var voice = new Pizzicato.Sound({
        source: 'input',
    }, function() {
        voice.addEffect(convolver);
        voice.play();
    });

}

window.onload = runAfterLoadingPage;