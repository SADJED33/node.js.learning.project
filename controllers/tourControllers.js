const fs = require('fs');

const tours =JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req,res,next,val)=>{
    if (req.params.id * 1 > tours.length){
    return res.status(404).json({
        status: 'fail',
        message:'INVALID ID'
    })
}next();
}

//function of  routs for all the data 
exports.getAllTours = (req,res)=>{
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
exports.getTour = (req,res)=>{
    console.log(req.params);
const id = req.params.id * 1;
const tour = tours.find(el => el.id ===id);
 
 res.status(200).json({
    status:'success',
    results: tours.length,
    data: {
        tour
    }
 });
};

//creat tour function 
exports.creatTour = (req,res)=>{

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
exports.updatTour =  (req, res) => {
    
    res.status(200).json({
        status:'succes',
        data: {
            tour: '<updated tour data..... >'
        }
    })

}

//delet tour fucntion 
exports.deletTour =  (req, res) => {
    
    res.status(204).json({
        status:'success',
        data: {
            tour: null
        }
    })

}