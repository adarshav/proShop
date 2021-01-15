//when the url is wrong or not found this funcion will be triggered
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
// And this function is to handle the errors
const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}; //is This necessary? Ans- when we enter a wrong URL in postman, the output will be displayed in the form of HTML which is difficult to debug Hence to avoid those things custom error Handling is made

export { notFound, errorHandle };
