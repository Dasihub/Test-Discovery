require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден!',
                    type: 'warning',
                    data: [],
                    auth: false,
                });
            }
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return res.status(404).json({
                    message: 'Неправильный пароль!',
                    type: 'warning',
                    data: [],
                    auth: false,
                });
            }
            const token = jwt.sign({ name: user.name, id: user.id, login: user.email }, process.env.JWT, {
                expiresIn: '1h',
            });
            res.status(200)
                .cookie('token', token, { httpOnly: true, maxAge: 604800 })
                .json({
                    message: 'Авторизация прошла успешно!',
                    type: 'success',
                    data: [
                        {
                            name: user.name,
                            id: user.id,
                            login: user.email,
                        },
                    ],
                    auth: true,
                });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }

    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user) {
                return res.status(303).json({
                    message: 'Пользователь с таким логином уже существует!',
                    type: 'warning',
                    data: [],
                    register: false,
                });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({ name, email, password: hashPassword });
            newUser.save();
            res.status(201).json({
                message: 'Регистрация прошла успешно!',
                type: 'success',
                data: [],
                register: true,
            });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                register: false,
            });
        }
    }

    async check(req, res) {
        try {
            const { token } = req.cookies;
            if (token === undefined) {
                return res.status(200).json({
                    message: 'Вы еще не авторизованы!',
                    type: 'info',
                    data: [],
                    auth: false,
                });
            }
            const decryptToken = jwt.verify(token, process.env.JWT);
            res.status(200).json({
                message: 'Вы авторизованы!',
                type: 'info',
                data: [
                    {
                        name: decryptToken.name,
                        id: decryptToken.id,
                        login: decryptToken.login,
                    },
                ],
                auth: true,
            });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }

    async logout(req, res) {
        try {
            res.status(200).clearCookie('token').json({
                message: 'Вы успешно вышли!',
                type: 'info',
                data: [],
                logout: true,
            });
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                logout: false,
            });
        }
    }
}

module.exports = new AuthController();
