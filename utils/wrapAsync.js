function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err)); 
        // you can write above line in this format to make it short 
        // fn(req, res, next).catch(next);
    }
}
export default wrapAsync;