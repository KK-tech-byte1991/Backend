const transformIdMiddleware = (req, res, next) => {
    res.transformAndSend = (data) => {
      if (Array.isArray(data)) {
        data = data.map(item => {
          item.id = item._id;
          delete item._id;
          return item;
        });
      } else if (typeof data === 'object' && data !== null) {
        data.id = data._id;
        delete data._id;
      }
      res.json(data);
    };
    next();
  };
  
  module.exports = transformIdMiddleware;
  