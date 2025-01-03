const Constant = {
  statusCode: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHRIZED_ACCESS: 401,
    API_NOT_FOUND: 404,
    DATA_NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  successMessage: {
    SUCCESSFULL: "Successfull",
    BLOG_SAVED :"Your Blog Saved Sucessfully"
    },
    errorMessage: {
      
    },  
    statusCount: {
        COUNT: 0,
        EXIST: 1,
    },
    orderIdCount: {
      COUNT: 0,
      EXIST: 1,
    },
    sort: {
        A_Z: 1,
        Z_A: 2,
        low_high: 3,
        high_low: 4,
      },
    Notification:{
        ORDER_PLACED:""
    }
};

module.exports = Constant;
