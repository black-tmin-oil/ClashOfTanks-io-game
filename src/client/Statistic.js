const rows = document.querySelectorAll('#play-menu h4');

//player best score presistence
export function save(me) {
    let lastSeen = new Date(Date.now()).toString()
    var score = me.score;
    var highscore = localStorage.getItem("highscore");

    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);      
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }
    const player = {"bestScore": me.score, lastSeen}
    localStorage.setItem('player', JSON.stringify(player)); 
}

export function get() {
    var r = localStorage.getItem('player');
    var w = JSON.parse(r).bestScore
    console.log(w)
    console.log('hi')
}

// class Statistic {
//     save(data) {
//         let lastSeen = Date.now()
//         const player = {score = data.score ,kills=data.kills, lastSeen}
//         localStorage.setItem('player', JSON.stringify(player)); 
//     }
//     get() {
//         var r = localStorage.getItem('player');
//         console.log('retrievedObject: ', JSON.parse(player))

//     }
// }

