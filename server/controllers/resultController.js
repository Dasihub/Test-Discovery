const ResultModel = require('../models/resultModel');

class ResultController {
    async create(req, res) {
        try {
            const { begin, end, answersTrue, answersFalse, count, ball } = req.body;
            const newResult = new ResultModel({ begin, end, answersTrue, answersFalse, count, ball });
            newResult.save();
            res.status(201).json({
                message: 'Игра окончено!',
                type: 'success',
                data: [],
            });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            });
        }
    }

    async getAllResult(req, res) {
        try {
            const results = await ResultModel.find();
            res.status(200).json({
                message: 'Данные получены!',
                type: 'success',
                data: results,
            });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            });
        }
    }

    async clear(req, res) {
        try {
            const results = await ResultModel.deleteMany();
            res.status(200).json({
                message: 'Данные удалены!',
                type: 'success',
                data: results,
            });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            });
        }
    }
}

module.exports = new ResultController();
