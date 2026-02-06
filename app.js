const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());



const tours =JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


//api routs for all the data 
app.get('/api/v1/tours',(req,res)=>{
 res.status(200).json({
    status:'success',
    results: tours.length,
    data: {
        tours
    }
 })
});


//api routs for one id 
app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params);
const id = req.params.id * 1;
const tour = tours.find(el => el.id ===id);
 
if (id > tours.length){
    return res.status(404).json({
        status: 'fail',
        message:'INVALID ID'
    })
}

 res.status(200).json({
    status:'success',
    results: tours.length,
    data: {
        tour
    }
 })
});

//add data to the json file 
app.post('/api/v1/tours',(req,res)=>{

const newId = tours[tours.length-1].id + 1;
const newTour = Object.assign({id: newId},req.body);

tours.push(newTour);

fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
res.status(201).json({
    status:'success',
data: {
    tours:newTour
}});
  
});
})


//update the data in the json file rout
app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length){
    return res.status(404).json({
        status: 'fail',
        message:'INVALID ID'
    })
}
    res.status(200).json({
        status:'succes',
        data: {
            tour: '<updated tour data..... >'
        }
    })

})
//delete data rout
app.delete('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length){
    return res.status(404).json({
        status: 'fail',
        message:'INVALID ID'
    })
}
    res.status(204).json({
        status:'success',
        data: {
            tour: null
        }
    })

})
//the server 
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on port ${port}......`)
});