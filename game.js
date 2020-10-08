const canvas = document.createElement('canvas');
const grid = 50;
canvas.setAttribute('width', grid * 20)
canvas.setAttribute('height', grid * 15)
document.body.prepend(canvas);
canvas.style.border = '1px solid black'

const context = canvas.getContext('2d');
const players = [{
    x: 10,
    y: canvas.height / 2,
    size: 30,
    speed: 5,
    color: 'red'
}, {
    x: 10,
    y: canvas.height / 2,
    size: 30,
    speed: 5,
    color: 'blue'
}];

const game = { req: '' };
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
}

document.addEventListener('keydown', (e) => {
    if (e.code in keys) {
        keys[e.code] = true;
    }
})

document.addEventListener('keyup', (e) => {
    if (e.code in keys) {
        keys[e.code] = false;
    }
})

game.req = requestAnimationFrame(draw);



function movementPlayer() {
    if (keys['ArrowLeft']) {
        players[0].x -= players[0].speed;
    }
    if (keys['ArrowRight']) {
        players[0].x += players[0].speed;
    }
    if (keys['ArrowUp']) {
        players[0].y -= players[0].speed;
    }
    if (keys['ArrowDown']) {
        players[0].y += players[0].speed;
    };

}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    movementPlayer();
    context.beginPath();
    context.fillStyle = players[0].color;
    context.arc(players[0].x, players[0].y, players[0].size, 0, Math.PI * 2);
    context.fill();
    game.req = requestAnimationFrame(draw);
}