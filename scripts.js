var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Hello World!')
    .pauseFor(250)
    .deleteAll()
    .typeString('Strings can be removed')
    .pauseFor(250)
    .deleteChars(7)
    .typeString('<strong>altered!</strong>')
    .pauseFor(250)
    .start();