const canvas = document.createElement('canvas');
const grid = 50;
canvas.setAttribute('width', grid * 20)
canvas.setAttribute('height', grid * 15)
document.body.prepend(canvas);
canvas.style.border = '1px solid black'
const context = canvas.getContext('2d');

const players = [{
    x: canvas.width / 2 + (grid * 8),
    color: 'blue',
    position: canvas.width / 2 + (canvas.width / 4)
}, {
    x: canvas.width / 2 - (grid * 8),
    color: 'red',
    position: canvas.width / 4
}];

const game = { req: '', bullets: [], bulletSpeed: 5 };

const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    a: false,
    d: false,
    w: false,
    s: false,
    A: false,
    D: false,
    W: false,
    S: false,
}

canvas.addEventListener('click', startGame()); //for click canvas to reset the game needs adjustments - not working temporarily

function startGame() {
    cancelAnimationFrame(game.req);
    console.log(startGame);
    players.forEach((player) => {
        player.score = 0;
        player.cooldown = 100;
        player.size = grid / 2 + 5;
        player.speed = Math.ceil(grid / 8);
        player.y = canvas.height / 2
    })
    game.req = requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
    //console.log(e);
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
    // if (e.key == 'm') { //temporary var to check coordinates
    //     console.log(players[0].x, players[0].y)
    //     console.log(players[1].x, players[1].y)
    //     collisionDetec(players[0], players[1]);
    // }
})



function collisionDetec(p, b) {
    //let boolHoriz = a.x < b.x + b.size && a.x + a.size * 2 > b.x;
    //let boolVertic = a.y < b.y + b.size && a.y + a.size * 2 > b.y;
    //let bools = a.x < b.x + b.size && a.x + a.size * 2 > b.x && a.y < b.y + b.size && a.y + a.size * 2 > b.y;
    //console.log(a.x, (b.x + b.size * 2));
    return p.x < b.x + b.size && p.x + p.size * 2 > b.x && p.y < b.y - b.size + b.size * 2 && p.y + p.size > b.y - b.size;
}

function movementPlayer() {
    if (keys['ArrowLeft'] && players[0].x > canvas.width / 2 + players[0].size) {
        players[0].x -= players[0].speed
    }
    // if (keys['ArrowLeft'] && players[0].x > 0) {
    //     players[0].x -= players[0].speed
    // }
    if (keys['ArrowRight'] && players[0].x < canvas.width - players[0].size) {
        players[0].x += players[0].speed;
    }
    if (keys['ArrowUp'] && players[0].y > players[0].size) {
        players[0].y -= players[0].speed;
    }
    if (keys['ArrowDown'] && players[0].y < canvas.height - players[0].size) {
        players[0].y += players[0].speed;
    };
    if ((keys['a'] || keys['A']) && players[1].x > players[1].size) {
        players[1].x -= players[1].speed;
    }
    if ((keys['d'] || keys['D']) && players[1].x < canvas.width / 2 - players[1].size) {
        players[1].x += players[1].speed;
    }
    if ((keys['w'] || keys['W']) && players[1].y > players[1].size) {
        players[1].y -= players[1].speed;
    }
    if ((keys['s'] || keys['S']) && players[1].y < canvas.height - players[1].size) {
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
        players.forEach((player, index2) => {
            if (collisionDetec(bullet, player)) {
                console.log('HIT' + player.color + ' ' + index2);
                if (index2 == 0) players[1].score++;
                else players[0].score++;
                game.bullets.splice(index, 1);
            }
        })
    })

    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
    players.forEach((player) => {
        if (player.cooldown > 0) {
            player.cooldown--;
        }
        context.fillStyle = player.color;
        context.font = grid + 'px serif';
        context.textAlign = 'center';
        context.fillText('Score: ' + player.score, player.position, grid);

        context.beginPath();

        context.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        context.fill();
    })


    game.req = requestAnimationFrame(draw);
}