const router = require('express').Router();
//TODO controllers/api/index -done
const apiRoutes = require('./api');
//TODO controllers/homeRoutes -done
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
