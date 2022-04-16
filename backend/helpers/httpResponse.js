const successHttpResponse = (res, data = 'OK') => {
    return res.status(200).json(data);
  };
  
  const createSuccessHttpResponse = (res, data = 'OK') => {
    return res.status(201).json(data);
  };
    
  const badRequestHttpResponse = (res, message = 'Bad Request' ) => {
    return res.status(400).json(message);
  };
  
  const unauthorizedHttpResponse = (res, message = 'Unauthorized' ) => {
    return res.status(401).json(message);
  };
  
  const notFoundHttpResponse = (res, message = 'Not Found' ) => {
    return res.status(404).json(message);
  };
  
  export default {
    successHttpResponse,
    createSuccessHttpResponse,
    badRequestHttpResponse,
    unauthorizedHttpResponse,
    notFoundHttpResponse,
  };