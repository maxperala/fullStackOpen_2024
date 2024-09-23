


const errorHandler = (error, req, res, next) => {

    
    if (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }

    next(error);
}


module.exports = {errorHandler};