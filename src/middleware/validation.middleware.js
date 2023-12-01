import {
    body,
    validationResult,
  } from 'express-validator';
  
  const validateRequest = async (
    req,
    res,
    next
  ) => {
    console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
      body('name')
        .notEmpty()
        .withMessage('Name is required'),
      body('price')
        .isFloat({ gt: 0 })
        .withMessage(
          'Price should be a positive value'
        ),
      body('imageUrl').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image is required');
        }
        return true;
      }),
    ];
  
    // 2. run those rules.
    await Promise.all(
      rules.map((rule) => rule.run(req))
    );
  
    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
      return res.render('new-product', {
        errorMessage:
          validationErrors.array()[0].msg,
      });
    }
    next();
  };
  
  export default validateRequest;
  

// // Hoisted declaration 
//     // class 
//     // assignment expression 
// import {body, validationResult} from 'express-validator'
//  const validateRequest = async(req,res,next)=>{

//     // const {name,price,imageUrl} =req.body;
//     // let errors=[];
//     // if(!name || !name.trim()==''){
//     //     errors.push("Name is requirde");
//     // }
//     // if(!price || parseFloat(price)<1){
//     //     errors.push("price must be positive value")
//     // }
//     // try{
//     //     const validUrl = new URL(imageUrl);
//     // }
//     // catch(err){
//     //     errors.push("URL is invalid!")
//     // }
//     console.log(req.body)
//     // 1 setup rules for validation 
//     const rules =[
//         body('name').notEmpty().withMessage("Name is required"),
//         body('price').isFloat({gt:0}).withMessage("price should be a positive value"),
//         // body('imageUrl').isURL().withMessage("Invalid URL")
//         body('imageUrl').custom((value,{req})=>{
//             if(!req.file){
//                 throw new Error("Image is required");
//             }
//             return true;
//         })
//     ]
//     // 2 run those rules 
//      await Promise.all(rules.map(rule=>rule.run(req)));
//     // 3 check if there are any errors after running the; rules 
//     var validationeErrors = validationResult(req);
// console.log(validationeErrors)
//     // 4 if error, then return the error messege 
//     if(!validationeErrors.isEmpty()){
//      res.render('new-product',{
//         errorMessage:validationeErrors.array()[0].msg,})
//     }
//     next();
// }
// export default validateRequest ;


