const { Router } = require('express');
const ResultController = require('../controllers/resultController');

const router = Router();

router.post('/', ResultController.create);
router.get('/', ResultController.getAllResult);
router.delete('/', ResultController.clear);

module.exports = router;
