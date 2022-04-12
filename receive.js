

var peer = new Peer(Math.random().toString(16).slice(8));

peer.on('open', function(id) {
	document.getElementById('youridh').innerHTML = `<strong>Your ID: </strong> ${id}`;
  });

var hischoice = 'empty';
var mychoice = 'empty';

peer.on('connection', function(conn) {
    conn.on('open', async function() {
        document.getElementById('disButt').onclick = function() {
            conn.send('closing')
            setTimeout(function () { conn.close() }, 1000);
            document.getElementById('butons').innerHTML = ''
        }
        await new Promise(resolve => setTimeout(function () {
            var isConfirmed = confirm(`Connect to ${conn.peer}?`)
            if(isConfirmed) {
                conn.send('confirmed')
                document.getElementById('butons').innerHTML = "<a href='#'><img width='100px' src='rock.png' id='rock'></img></a><a href='#'><img width='100px' src='paper.png'  id='paper'></img></a><a href='#'><img width='100px' src='scissors.png'  id='scissors'></img></a>"
    
                document.getElementById('rock').onclick = function() {
                    document.getElementById('butons').innerHTML = ''
                    conn.send('rock')
                    mychoice = 'rock'
                };
                document.getElementById('paper').onclick = function() {
                    document.getElementById('butons').innerHTML = ''
                    conn.send('paper')
                    mychoice = 'paper'
                };
                document.getElementById('scissors').onclick = function() {
                    document.getElementById('butons').innerHTML = ''
                    conn.send('scissors')
                    mychoice = 'scissors'
                };
                conn.on('data', function(data) {
                    console.log(data)
                    if(data=='closing') {
                        document.getElementById('butons').innerHTML = ''
                    }
                    if(data=='rock') {
                        hischoice = 'rock'
                        //conn.close()
                    } else  if(data=='paper') {
                        hischoice = 'paper'
                        //conn.close()
                    } else  if(data=='scissors') {
                        hischoice = 'scissors'
                        //conn.close()
                    }
                });
            } else conn.close()
        }, 1000))
    });
}); 

document.getElementById('conButt').onclick = function() {
    if(document.getElementById('conID').value != null) {
        var conn = peer.connect(document.getElementById('conID').value);
        conn.on('open', function() {
            document.getElementById('disButt').onclick = function() {
                conn.send('closing')
                setTimeout(function () { conn.close() }, 1000);
                document.getElementById('butons').innerHTML = ''
    
            }
            conn.on('data', function(data) {
                console.log(data)
                if(data=='closing') {
                    document.getElementById('butons').innerHTML = ''
        
                }
                if(data=='confirmed') {
                    document.getElementById('butons').innerHTML = "<a href='#'><img width='100px' src='rock.png' id='rock'></img></a><a href='#'><img width='100px' src='paper.png'  id='paper'></img></a><a href='#'><img width='100px' src='scissors.png'  id='scissors'></img></a>"
        
                    document.getElementById('rock').onclick = function() {
                        document.getElementById('butons').innerHTML = ''
                        conn.send('rock')
                        mychoice = 'rock'
                    };
                    document.getElementById('paper').onclick = function() {
                        document.getElementById('butons').innerHTML = ''
                        conn.send('paper')
                        mychoice = 'paper'
                    };
                    document.getElementById('scissors').onclick = function() {
                        document.getElementById('butons').innerHTML = ''
                        conn.send('scissors')
                        mychoice = 'scissors'
                    };
                }
                if(data=='rock') {
                    hischoice = 'rock'
                    //conn.close()
                } else  if(data=='paper') {
                    hischoice = 'paper'
                    //conn.close()
                } else  if(data=='scissors') {
                    hischoice = 'scissors'
                    //conn.close()
                }
            });
        });
    }
}

function win(his, yours) {
    document.getElementById("disButt").click();
    setTimeout(() => {
        document.getElementById('butons').innerHTML = `<strong>You won!</strong> You chose ${yours}, and the opponent chose ${his}`
    }, 1100);
    mychoice = 'empty'
    hischoice = 'empty'
}

function lose(his, yours) {
    document.getElementById("disButt").click();
    setTimeout(() => {
        document.getElementById('butons').innerHTML = `<strong>You lost!</strong> You chose ${yours}, and the opponent chose ${his}`
    }, 1100);
    mychoice = 'empty'
    hischoice = 'empty'
}

function tie(his, yours) {
    document.getElementById("disButt").click();
    setTimeout(() => {
        document.getElementById('butons').innerHTML = `<strong>It's a tie!</strong> You chose ${yours}, and the opponent chose ${his}`
    }, 1100);
    mychoice = 'empty'
    hischoice = 'empty'
}

setInterval(() => {
    if(mychoice != 'empty' && hischoice != 'empty') {
        if(mychoice == hischoice) {
            tie(hischoice, mychoice)
        } else if(mychoice == 'rock') {
            if(hischoice == 'paper') {
                lose(hischoice, mychoice)
            } else {
                win(hischoice, mychoice)
            }
        } else if(mychoice == 'paper') {
            if(hischoice == 'scissors') {
                lose(hischoice, mychoice)
            } else {
                win(hischoice, mychoice)
            }
        } else if(mychoice == 'scissors') {
            if(hischoice == 'rock') {
                lose(hischoice, mychoice)
            } else {
                win(hischoice, mychoice)
            }
        }
    }
}, 1500);