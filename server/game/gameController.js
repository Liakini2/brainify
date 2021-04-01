
const addScore = async (req, res) => {
    //take user id, game, and score and add to the results table.
    const {game_id} = req.params;
    const {score} = req.body;
    // console.log(game_id, score);
    // console.log(game_id, score);
    req.app.get('db').game.add_new_score([game_id, req.session.user.id, score])
    .then(_ => {
        return res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
}

const getScores = async (req, res) => {
    //send back scores based off of user id. Get all games from user, categorize them by what the game trains and send the total results back
    //find score from the previous week and see how it has changed recently.
    const results = await req.app.get('db').game.get_scores([req.session.user.id]);
    let scores = await req.app.get('db').game.average_scores([req.session.user.id]);
    // console.log(results)
    let final = [];
    const categories = await req.app.get('db').game.get_categories()
    // for(let i = 0;i<categories.length;i++)
    // {
    //     const score = results.filter(el => el.category === categories[i].category).reduce((total, curr) => { return total += +curr.score}, 0)/(results.filter(el => el.category === categories[i].category).length ? results.filter(el => el.category === categories[i].category).length : 1)
    //     // console.log('score:', score)
    //     final.push({category: categories[i].category, averageScore: Math.floor(score)});
    // }
    for(let i = 0;i<categories.length;i++) {
        let avg = scores.filter(s => s.category === categories[i].category)[0]?.avg
        // console.log(avg ? avg : 0);
        final.push({category: categories[i].category, averageScore:  avg ? Math.floor(avg) : 0})
    }
    return res.status(200).send(final);
}

const getScoresDateRange = async (req, res) => {
    //find scores for a specific range of dates. Not needed currently, but may want to add in future updates.
}

const compareScores = async (req, res) => {
    //get tally of all scores to see how user stacks up.
}

const getGames = async (req, res) => {
    // console.log('get games');
    let db = req.app.get('db');
    const games = await db.game.get_games();
    // console.log(games);
    if(games)
    {
        return res.status(200).send(games);
    } else {
        return res.status(404).send('no games');
    }
    
}

const getCategories = (req, res) => {
    req.app.get('db').game.get_categories().then(r => {
        // console.log(r);
        return res.status(200).send(r);
    }).catch(err => {
        res.sendStatus(500);
        console.log(err);
    })
}

const getRecommendedGames = async (req, res) => {
    let db = req.app.get('db');
    let scores = await db.game.average_scores([req.session.user.id]);
    const games = await db.game.get_games();
    const categories = await db.game.get_categories();

    let notPlayed = categories.filter(c =>  !scores.map(s => s.category).includes(c.category));
    scores = scores.sort((a, b) => a.avg - b.avg);
    // console.log('scores', scores, 'not played: ', notPlayed);
    let recGames = [];

    // console.log('not played', notPlayed);
    for(let i = 0;i<notPlayed.length && i<3;i++) {
        let gamesToPlayInCategory = games.filter(g => g.category === notPlayed[i].category);
        // console.log('in not played: ', gamesToPlayInCategory);
        recGames.push(gamesToPlayInCategory[Math.floor(Math.random() * gamesToPlayInCategory.length)]);
    }
    // console.log('not played games:', recGames);

    while(recGames.length < 3 && scores.length > 0) {
            let cat = scores.splice(0, 1);
            // console.log(cat[0].category)
            let gamesToPlayInCategory = games.filter(g => g.category === cat[0].category);
            // console.log('games: ', gamesToPlayInCategory)
            let g = gamesToPlayInCategory[Math.floor(Math.random() * gamesToPlayInCategory.length)];
            // console.log('game: ', g);
            recGames.push(g);

    }

    // console.log('rec: ', recGames)
    return res.status(200).send(recGames);
}



module.exports = {
    addScore,
    getScores,
    compareScores,
    getScoresDateRange,
    getGames,
    getCategories,
    getRecommendedGames
}