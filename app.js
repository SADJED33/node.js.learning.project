const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());



const tours =JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//function of  routs for all the data 
const getAllTours = (req,res)=>{
 res.status(200).json({
    status:'success',
    results: tours.length,
    data: {
        tours
    }
 });
};

//get tour function 
const getTour = (req,res)=>{
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
 });
};

//creat tour function 
const creatTour = (req,res)=>{

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
};

//update tour function 
const updatTour =  (req, res) => {
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

}

//delet tour fucntion 
const deletTour =  (req, res) => {
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

}

//api routs for all the data 
// app.get('/api/v1/tours', getAllTours);
//api routs for one id 
// app.get('/api/v1/tours/:id', getTour);
// //add data to the json file 
// // app.post('/api/v1/tours', creatTour)
// //update the data in the json file rout
// app.patch('/api/v1/tours/:id', updatTour)
// //delete data rout
// app.delete('/api/v1/tours/:id', deletTour)

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(creatTour);

app 
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updatTour)
  .delete(deletTour);


//the server 
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on port ${port}......`)
});