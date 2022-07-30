// import packages
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config;
// PORT 3000
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/'));
app.use(express.json());

app.get('/', function(req, res)  {
  res.status(200);
  console.log("A request has been processed... ")
})


// Calculate LDL-Cholesterol
app.get('/calculatedLDLC/:totalc/:hdlc/:trig', function(req, res) {
  const totalc = Number(req.params.totalc);
  const hdlc = Number(req.params.hdlc);
  const trig = Number(req.params.trig);


  if (isNaN(totalc) || isNaN(hdlc) || isNaN(trig)) {
    res.status(400);
    res.json({error: "Incomplete fields."})
    return ;
  }
  const result = ((totalc)-(hdlc)-((trig*0.2))).toFixed(1) ;
  console.log("/Calculated LDL request initiated")
  res.json({'calculatedLDLC' : result})
});

// Calculate total cholesterol
app.get('/calculatedTotalC/:ldlc/:hdlc/:trig', function(req, res) {
  const ldlc = Number(req.params.ldlc);
  const hdlc = Number(req.params.hdlc);
  const trig = Number(req.params.trig);

  if (isNaN(ldlc) || isNaN(hdlc) || isNaN(trig)) {
    res.status(400);
    res.json({error: "Incomplete fields."})
    return ;
  }
   
  const result = ((ldlc)+(hdlc)+((trig*0.2))).toFixed(1);
  console.log("/Calculated total cholesterol request initiated.")
  res.json({'calculatedTotalC' : result})
});


// Calculate HDL-Cholesterol
app.get('/calculatedHDLC/:totalc/:ldlc/:trig', function(req, res) {
  const totalc = Number(req.params.totalc);
  const ldlc = Number(req.params.ldlc);
  const trig = Number(req.params.trig);

  if (isNaN(totalc) || isNaN(ldlc) || isNaN(trig)) {
    res.status(400);
    res.json({error: "Incomplete fields."})
    return ;
  }
  const result = ((totalc)-(ldlc)-((trig*0.2))).toFixed(1);
  console.log("/calculatedHDLC request initiated.")
  res.json({'calculatedHDLC' : result})
});


// Calculate Triglycerides
app.get('/calculatedTrig/:totalc/:hdlc/:ldlc', function(req, res) {

  const totalc = Number(req.params.totalc);
  const hdlc = Number(req.params.hdlc);
  const ldlc = Number(req.params.ldlc);

  if (isNaN(totalc) || isNaN(hdlc) || isNaN(ldlc)) {
    res.status(400);
    res.json({error: "Incomplete fields."})
    return ;
  }

  const result = (((totalc)-(hdlc)-(ldlc))*5).toFixed(1);
  console.log("/calculatedTrig request initiated.")
  res.json({'calculatedTrig' : result})

});

app.listen(PORT, () => console.log('Server Initialized.'));