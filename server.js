const express = require('express');
const app = express();
const magic8Resp = require('./models/Magic8Resp');
const port = 3000;

//routes
//initial home route with links to each further page
app.get('/', (req, res)=>{
    res.send('<div><h1>Welcome to the mysterious musings of the Magic 8 Ball</h1><h2><a href="./magic">Enter the Magic 8</a></h2><h1>Tip Calculator</h1><h2><a href="./tip">Tips Please</a></h2><h1>Desire a Greeting?</h1><h2><a href="./greeting">Greeting</a></h2></div>');
});

app.get('/magic', (req, res)=>{
    res.send('<div><h1>The Magic 8 Ball sees all...</h1><h2>Type / then a question about your future, past or preset in the url bar with %20 in place of spaces and see what will come!</h2></div>');
});

app.get('/tip', (req, res)=>{
    res.send('<div><h1>Welcome to the tip calculator</h1><h2>Type / the total bill amount (e.g. 100) / the desired tip percentage (e.g. 15) in the url bar and see what your tip should be!</h2></div>');
});

app.get('/greeting', (req, res)=>{
    res.send('<div><h1>Fair tidings there wanderer!</h1><h2>Do you desire a personalized greeting?  Type / your name or another name to get said greeting! Be enriched!</h2></div>');
});

//magic route with parameter (has link to get back to home page)
app.get('/magic/:question', (req, res)=>{
    //random number to determine response of the magic 8 ball
    let randNum = Math.floor(Math.random() * (magic8Resp.length));
    res.send('<h1>'+req.params.question+'?</h1><h1>'+magic8Resp[randNum]+'</h1><h2><a href="/">Home</a></h2>');
});

//greeting route with parameter (has link to get back to home page)
app.get('/greeting/:name', (req, res)=>{
    res.send('<div><h1>Salutations ' + req.params.name + ' how fair ye? Wait, ye need not answer, I can see that thou fairest exceedingly well *wink*.  A sailor&apos;s warmest welcome *bow*.</h1><h2><a href="/">Home</a></h2></div>');
});

//tip paramter routes
app.get('/tip/:total', (req, res)=>{
    //cue user to add/tipPercentage
    res.send('<h1>Tip Calculator</h1><h2>Requires /tip Percentage added to the url after ' + req.params.total + ' bill total to calculate how much the tip should be!</h2>')
});

//final tip route (has link to get back to home page)
app.get('/tip/:total/:tipPercentage', (req, res)=>{
    //results of the tip calulator
    let tip = req.params.total * req.params.tipPercentage/100;
    tip.toFixed(2);
    res.send('<h1>Tip Calculator Results</h1><h2>' + req.params.tipPercentage + '% tip on a total bill of $'+req.params.total + '<br/>Tip Amount: $'+tip+'</h2><h2><a href="/">Home</a></h2>');
});



//listen
app.listen(port, ()=>{
    console.log("Listening at port ", port);
});