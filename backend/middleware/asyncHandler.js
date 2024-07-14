const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

/* TRANDITIONAL FUNCTION EXPRESSION
const asyncHandler = function(fn) {
    return function(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
  
export default asyncHandler; 
*/
