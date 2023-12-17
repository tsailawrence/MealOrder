const Router = require("koa-router");
const config = require("config");
const validate = require("koa2-validation");
const Joi = require("joi");

const { rejectTheRequest } = require("../utils/error");
const { auth, verifyClerk } = require("../middleware/index");

const getMyInfo = require("../controllers/get-my-info");
const register = require("../controllers/register");
const clerkRegister = require("../controllers/clerk-register");
const refreshToken = require("../controllers/refresh-token");
const handleLineWebhook = require("../controllers/handle-line-webhook");
const getMyStoreOrders = require("../controllers/get-my-store-orders");
const addMyStoreMenuType = require("../controllers/add-my-store-menu-type");
const addMyStoreMenu = require("../controllers/add-my-store-menu");
const getMyStoreProducts = require("../controllers/get-my-store-products");
const getMyFavoriteRestaurant = require("../controllers/get-my-favorite-restaurant");
const getTopRestaurant = require("../controllers/get-top-restaurant");
const getRestaurantCategory = require("../controllers/get-restaurant-category");
const getRestaurantByCategory = require("../controllers/get-restaurant-by-category");
const getRestaurant = require("../controllers/get-restaurant");
const addMyFavoriteRestaurant = require("../controllers/add-my-favorite-restaurant");
const addMyOrder = require("../controllers/add-my-order");
const getMyOrder = require("../controllers/get-my-order");
const getMyCurrentMonthPayment = require("../controllers/get-my-current-month-payment");
const addMyStore = require("../controllers/add-my-store");
const getMyStore = require("../controllers/get-my-store");
const lineBinding = require("../controllers/handle-line-binding");

const updateMyStore  = require('../controllers/update-my-store')
const updateMyStoreOrder  = require('../controllers/update-my-store-order')
const deleteMyOrder   = require('../controllers/delete-my-order')
const updateMyStoreMenu   = require('../controllers/update-my-store-menu')
const deleteMyStoreMenu   = require('../controllers/delete-my-store-menu')
const updateMyStoreMenuType = require('../controllers/update-my-store-menu-type');
const deleteMyStoreMenuType = require('../controllers/delete-my-store-menu-type');
const getMyStoreMenuTypeCustomerMonthlyBilling = require('../controllers/get-my-store-customer-monthly-billing');
const getMyStoreMonthlyOrders = require('../controllers/get-my-store-monthly-orders');
const router = new Router();

router.post("/webhook", handleLineWebhook);

router.use("*", async (ctx, next) => {
  const meta = {
    version: config.api.version,
    request: {
      url: ctx.params[0],
      query: Object.assign({}, ctx.request.query, ctx.request.body),
    },
  };

  try {
    const { _url: url } = ctx.request?.body;
    if (url) {
      ctx.request.body.url = url;
    }

    await next();

    if (ctx.response.status === 200) {
      const finalBody = { data: ctx.body };

      if (Array.isArray(ctx.body)) {
        finalBody.count = ctx.body.length;
      }

      if (ctx.nextIndex) {
        finalBody.nextIndex = ctx.nextIndex;
      }

      if (ctx.totalPage) {
        finalBody.totalPage = ctx.totalPage;
      }

      finalBody.meta = meta;
      ctx.body = finalBody;
    }
    // error handling
  } catch (err) {
    if (err?.isBoom) {
      ctx.status = err.output.statusCode;
      ctx.body = {
        error: err.output.payload.error,
        message: err.message,
      };
    } else {
      ctx.status = err?.status || 500;
      ctx.body = {
        message: err?.message || "Something wrong.",
      };
      if (ctx.status === 500) {
        ctx.body.error = "Internal Server Error";
      }
      ctx.app.emit("error", err, ctx);
    }
  }
});

// 200 example and health check route
router.get("/", async (ctx) => {
  ctx.body = "success";
});

router.get(
  "/my/info",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyInfo
);

router.post(
  "/register",
  validate({
    body: {
      userId: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      emailAddress: Joi.string(),
      phoneNumber: Joi.string(),
      imageUrl: Joi.string(),
      authenticationMethod: Joi.string(),
      type: Joi.string(),
    },
  }),
  register
);

router.post(
  "/token/refresh",
  validate({
    body: {
      refreshToken: Joi.string().required(),
    },
  }),
  refreshToken
);

router.post(
  "clerkRegister",
  "/clerk/register",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
    body: {
      type: Joi.string(),
    },
  }),
  verifyClerk,
  clerkRegister
);

router.get(
  "getMyStore",
  "/my/store",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyStore
);

router.get(
  "getMyStoreOrders",
  "/my/store/orders",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyStoreOrders
);

router.post(
  "addMyStoreMenuType",
  "/my/store/:storeId/menu/type",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
    body: {
      value: Joi.string(),
    },
  }),
  verifyClerk,
  addMyStoreMenuType
);

router.post(
  "addMyStoreMenu",
  "/my/store/:storeId/menu",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      menuTypeId: Joi.number().required(),
    },
  }),
  verifyClerk,
  addMyStoreMenu
);

router.get(
  "getMyStoreProducts",
  "/my/store/:storeId/products",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyStoreProducts
);

router.get(
  "getMyFavoriteRestaurant",
  "/my/favoriteRestaurant",
  "/my/favoriteRestaurant",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyFavoriteRestaurant
);

router.get(
  "getTopRestaurant",
  "/store/topRestaurant",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getTopRestaurant
);

router.get(
  "getRestaurantCategory",
  "/store/restaurantCategory",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getRestaurantCategory
);

router.get(
  "getRestaurantByCategory",
  "/store/restaurantByCategory/:categoryId",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getRestaurantByCategory
);

router.get(
  "getRestaurant",
  "/store/restaurant/:storeId",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getRestaurant
);

router.post(
  "addMyFavoriteRestaurant",
  "/my/favoriteStore/add/:storeId",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  addMyFavoriteRestaurant
);

router.post(
  "addMyOrder",
  "/my/order/add",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  addMyOrder
);
router.get(
  "getMyCurrentMonthPayment",
  "/my/order/getMyCurrentMonthPayment",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyCurrentMonthPayment
);

router.get(
  "getMyOrder",
  "/my/order/get",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  getMyOrder
);

router.post(
  "addMyStore",
  "/my/store/add",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  addMyStore
);

router.post(
  "lineBinding",
  "/line/:lineId",
  validate({
    query: {
      accessToken: Joi.string()
        .required(),
    },
    params: {
      lineId: Joi.string()
          .required()
    }
  }),
  verifyClerk,
  lineBinding
);

router.post(
    'updateMyStore',
    '/my/store/update/:storeId',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    updateMyStore
);

router.post(
  "updateMyStoreOrder",
  "/my/store/updateOrder/:orderId",
  validate({
    query: {
      accessToken: Joi.string().required(),
    },
  }),
  verifyClerk,
  updateMyStoreOrder
);

router.post(
    'deleteMyOrder',
    '/my/order/delete/:orderId',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    deleteMyOrder
);

router.post(
    'updateMyStoreMenu',
    '/my/store/update/:storeId/menu/:menuId',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    updateMyStoreMenu
);

router.post(
    'deleteMyStoreMenu',
    '/my/store/delete/:storeId/menu/:menuId',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    deleteMyStoreMenu
);

router.post(
    'updateMyStoreMenuType',
    '/my/store/:storeId/update/menu/type/:menuTypeId',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
        body: {
            value: Joi.string(),
        }
    }),
    verifyClerk,
    updateMyStoreMenuType
);

router.post(
    'deleteMyStoreMenuType',
    '/my/store/:storeId/delete/menu/type/:menuTypeId',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    deleteMyStoreMenuType
);

router.get(
    'getMyStoreMenuTypeCustomerMonthlyBilling',
    '/my/store/:storeId/order/customerMonthlyBilling/:month',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    getMyStoreMenuTypeCustomerMonthlyBilling
);

router.get(
    'getMyStoreMonthlyOrders',
    '/my/store/:storeId/order/getMonthly/:month',
    validate({
        query: {
            accessToken: Joi.string().required(),
        },
    }),
    verifyClerk,
    getMyStoreMonthlyOrders
);


// bad request example
router.get("/error", async () => {
  throw rejectTheRequest({
    status: 400,
    message: { message: "error", code: 404 },
  });
});

module.exports = router;
