const canvas = document.createElement('canvas');
const grid = 50;
canvas.setAttribute('width', grid * 20)
canvas.setAttribute('height', grid * 15)
document.body.prepend(canvas);
canvas.style.border = '1px solid black'
const context = canvas.getContext('2d');

const players = [{
    x: canvas.width / 2 + (grid * 2),
    y: canvas.height / 2,
    size: 30,
    speed: 5,
    color: 'blue',
    cooldown: 0
}, {
    x: canvas.width / 2 - (grid * 2),
    y: canvas.height / 2,
    size: 30,
    speed: 5,
    color: 'red',
    cooldown: 0
}];

const game = { req: '', bullets: [], bulletSpeed: 5 };

const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    A: false,
    D: false,
    W: false,
    S: false,
}

document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.key in keys) {
        keys[e.key] = true;
    }
    if (e.code == 'ShiftRight') {
        players[0].cooldown = 20;
        game.bullets.push({
            x: players[0].x - players[0].size - 15,
            y: players[0].y - 5,
            speed: -game.bulletSpeed,
            size: 10,
            color: 'brown'
        })
    }
    if (e.code == 'ShiftLeft') {
        players[1].cooldown = 20;
        game.bullets.push({
            x: players[1].x + players[1].size + 15,
            y: players[1].y - 5,
            speed: game.bulletSpeed,
            size: 10,
            color: 'green'
        })
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
    if (e.code == 'KeyM') {
        console.log(players[0].x, players[0].y)
        console.log(players[1].x, players[1].y)
        collisionDetec(players[0], players[1]);
    }
})

game.req = requestAnimationFrame(draw);

function collisionDetec(a, b) {
    let bools = a.x < b.x + b.size;
}

function movementPlayer() {
    // if (keys['ArrowLeft'] && players[0].x > canvas.width / 2 + players[0].size) {
    //     players[0].x -= players[0].speed
    // }
    if (keys['ArrowLeft'] && players[0].x > 0) {
        players[0].x -= players[0].speed
    }
    if (keys['ArrowRight'] && players[0].x < canvas.width - players[0].size) {
        players[0].x += players[0].speed;
    }
    if (keys['ArrowUp'] && players[0].y > players[0].size) {
        players[0].y -= players[0].speed;
    }
    if (keys['ArrowDown'] && players[0].y < canvas.height - players[0].size) {
        players[0].y += players[0].speed;
    };
    if (keys['A'] && players[1].x > players[1].size) {
        players[1].x -= players[1].speed
    }
    if (keys['D'] && players[1].x < canvas.width / 2 - players[1].size) {
        players[1].x += players[1].speed;
    }
    if (keys['W'] && players[1].y > players[1].size) {
        players[1].y -= players[1].speed;
    }
    if (keys['S'] && players[1].y < canvas.height - players[1].size) {
        players[1].y += players[1].speed;
    };
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    movementPlayer();

    game.bullets.forEach((bullet, index) => {
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.size, bullet.size)
        bullet.x += bullet.speed;
        if (bullet.x < 0) {
            game.bullets.splice(index, 1);
        }
    })

    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
    players.forEach((player) => {
        if (player.cooldown > 0) {
            player.cooldown--;
        }
        context.beginPath();
        context.fillStyle = player.color;
        context.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        context.fill();
    })


    game.req = requestAnimationFrame(draw);
}