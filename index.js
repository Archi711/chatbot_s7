const express = require('express');
const app = express();
const port = 3000
const bodyparser = require('body-parser')

const { dockStart } = require('@nlpjs/basic');

async function startAI(){
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./corpuses/crp_1.json')
  await nlp.train();
  return nlp
}
app.use(express.static('public'))
app.use(express.json())
let nlp

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/chat', async function(req, res){
  console.log(req.body)
  if(!nlp || !req.body.question) return res.sendStatus(400)
  const { question } = req.body
  const { answer } = await nlp.process('en', question)
  return res.json({
    answer
  })
})

app.listen(port, async function() {
  nlp = await startAI()
  console.log(`app on port: ${port}`);
});
