const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'))

app.use(express.json());

app.use((req,res,next)=>{
console.log('hello from the middleware');
next();
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


const tours =JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//function of  routs for all the data 
const getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
     status:'success',
     requestedAt: req.requestTime,
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
  
const getAllUsers = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}

const createUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}



const getUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}



const updateUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}


const deleteUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(creatTour);

app 
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updatTour) 
  .delete(deletTour);
app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//the server 
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on port ${port}......`)
});