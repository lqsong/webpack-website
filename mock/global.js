const mockjs= require('mockjs');
const { WEBSITE_APP_APIHOST } = process.env;
const mock = {};

mock[`GET ${WEBSITE_APP_APIHOST}/500`] = (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/500',
    });
};

mock[`GET ${WEBSITE_APP_APIHOST}/404`] = (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/404',
    });
};

mock[`GET ${WEBSITE_APP_APIHOST}/mockjs/demo`] = (req, res) => {
  res.send({
    code: 0,
    data: mockjs.mock({
      total: 1000,
      currentPage: 1,
      'list|10': [
        {
          id: '@integer(1)',
          'name|1': ['个人博客', '网页小功能'],
          'desc|1': ['李庆松的个人博客', '原创定制最好的网页插件小功能'],
          'href|1': ['http://liqingsong.cc', 'http://wyxgn.com'],
        },
      ],
    }),
  });
};

module.exports = {
  ...mock
};