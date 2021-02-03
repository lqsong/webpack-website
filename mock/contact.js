const { WEBSITE_APP_APIHOST } = process.env;
const mock = {};

mock[`POST ${WEBSITE_APP_APIHOST}/contact`] = (req, res) => {
    res.send({
        code: 0,
        data: '',
        msg: 'success',
    });
  };



module.exports = {
  ...mock
};