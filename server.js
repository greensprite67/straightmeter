const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors())

app.use(express.json()); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/message', (req, res) => {
  res.json({ message: 'fob peak lol ' });
});

app.get("/activateserver", (req, res) => {
  res.json({message: "Server is active"});
});

const gayArray = [
  { name: "sigma", value: 100 },
  { name: "gigachad", value: 100 },
  { name: "straight", value: 90 },
  { name: "phonk", value: 80 },
  { name: "gym", value: 85 },
  { name: "grindset", value: 75 },
  { name: "mewing", value: 70 },
  { name: "mogging", value: 65 },
  { name: "looksmaxxing", value: 80 },
  { name: "base", value: 50 },
  { name: "alpha", value: 60 },
  { name: "skibidi", value: -10 },
  { name: "uwu", value: -50 },
  { name: "femboy", value: -80 },
  { name: ":3", value: -40 },
  { name: "nya", value: -30 },
  { name: "gay", value: -100 },
  { name: "lesbian", value: -100 },
  { name: "transgender", value: -100 },
  { name: "nonbinary", value: -100 },
  { name: "master", value: -40 },
  { name: "boi", value: -10 },
];

const descriptionArray = [
  { min: -10000, max: -100, description: "EWW GAY GTFO 💀💀💀" },
  { min: -100, max: 0, description: "Ew bro is gay , not even SIGMA ❌" },
  { min: 0, max: 10, description: "Bro is barely holding onto his gym membership 🥀" },
  { min: 10, max: 30, description: "Bro is starting his mogging journey 🤑" },
  { min: 30, max: 50, description: "Bro is a casual enjoyer of the grindset 🔥" },
  { min: 50, max: 70, description: "Bro is so straight he's playing aniphobia" },
  { min: 70, max: 90, description: "Bro is definitely a sigma , the phonk is getting louder 🤑🤑🤑" },
  { min: 90, max: 120, description: "PURE GIGACHAD ENERGY." },
  { min: 120, max: 300, description: "BRO IS SO STRAIGHT HE BENT THE SPACE-TIME CONTINUUM 🔥🔥💥" },
  { min: 300, max: 1000, description: "ULTRASIGMA MALE: HE MOGS THE ENTIRE UNIVERSE 🗿" },
  { min: 1000, max: 10000, description: "VRO WTF" }
];



async function measureGayness(username) {
  const translatte = require('translatte');
  const clmatch = require('closest-match');
  const WordsNinjaPack = require('wordsninja');
  const WordsNinja = new WordsNinjaPack();
  await WordsNinja.loadDictionary();
  for (let i = 0; i < gayArray.length; i++) {
    gayArray[i].name = gayArray[i].name.toLowerCase();
    WordsNinja.addWords([gayArray[i].name]);
  };  
  var gaypercent = 0;
  var description = "";
  const lname = username.toLowerCase();
  const charperc = lname.length / 10;
  const sname = WordsNinja.splitSentence(lname)
  var aname = lname;
  for (let i = 0; i < sname.length; i++) {
    aname = aname.replace(sname[i], "");
    console.log("aname: " + aname);
  }  
  
  return translatte(aname, { from: 'auto', to: 'en' }).then(res => {
    aname = res.text;
    console.log("aname: " + aname);
    WordsNinja.splitSentence(aname).forEach(word => {
      sname.push(word);
    });
  }).catch(err => {
  })
  .then(() => {
    for (let i = 0; i < sname.length; i++) {
      var simwords = clmatch.closestMatch(sname[i], gayArray.map(item => item.name), true);
      if (simwords.length === 0) {
        break;
      }
      if (simwords.length > 1) {
        for (let j = 0; j < simwords.length; j++) {
          var dist = clmatch.distance(sname[i], simwords[j]);
          if (dist < sname[i].length * 1.2) {
            var simperc = (1 - (dist / simwords[j].length * 0.5));
            gaypercent += ((gayArray.find(item => item.name === simwords[j]).value)/simwords.length)*simperc;
          };
        }
      }
      else {
        var dist = clmatch.distance(sname[i], simwords[0]);
        var simperc = (1 - (dist / simwords[0].length * 0.5));
        if (dist < sname[i].length * 1.2) {
          var val = gayArray.find(item => item.name === simwords[0]).value;
          gaypercent += val * simperc;
        };
      };
    };  

    var multiplier = 1;
    if (charperc > 2) {
      multiplier = multiplier / charperc;
    };
    if (Number.isNaN(gaypercent)) {
      gaypercent = 0;
    }
    gaypercent = gaypercent * multiplier;
    for (let i = 0; i < descriptionArray.length; i++) {
      if (gaypercent >= descriptionArray[i].min && gaypercent <= descriptionArray[i].max) {
        console.log("Description: " + descriptionArray[i].description);
        description = descriptionArray[i].description;
      }
    };
    console.log("sname: " + sname);
    return [gaypercent.toFixed(2), description];
  });
};


app.post('/gaypercent', (req, res) => {
  const usname = req.body.username;
  measureGayness(usname).then((gayness) => {
    res.json({ percent: gayness[0], description: gayness[1] });
  });
});
