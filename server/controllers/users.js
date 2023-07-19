const express = require('express');
const bcrypt = require('bcrypt');
const joi = require('joi');
const { Card } = require('../models/cardModel');
const User = require('../models/authUserModel');
const AuthUserModelJOI = require('../models/authUserModelJoi');
const _ = require('lodash');

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = {
    // REGISTER
    // POST http://localhost:3000/api/users/
    allUsers: async function (req, res, next) {
        try {
            const result = await User.find();
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting users' });
        }
    },
    register: async (request, response) => {
        try {
            const userModel = new AuthUserModelJOI(request.body);
            const errors = userModel.validateRegistration();
            if (errors) return response.status(400).send(errors);

            let user = await User.findOne({ email: request.body.email });
            if (user)
                return response.status(400).send('User already registered.');

            user = new User(
                _.pick(request.body, [
                    'firstName',
                    'lastName',
                    'middleName',
                    'email',
                    'password',
                    'phone',
                    'imageUrl',
                    'imageAlt',
                    'state',
                    'country',
                    'city',
                    'street',
                    'houseNumber',
                    'zip',
                    'isBiz',
                    'cards',
                ])
            );

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save();

            response
                .status(200)
                .send(_.pick(user, ['_id', 'firstName', 'email']));
        } catch (err) {
            response.status(500).send(err.message);
            console.log(err);
        }
    },

    verifyToken: async (request, response) => {
        const user = await User.findOne({ email: request.user.email }).select(
            '-password'
        );
        response.json(user);
    },

    // Login
    login: async (request, response) => {
        try {
            const userModel = new AuthUserModelJOI(request.body);
            const errors = userModel.validateLogin();
            if (errors) return response.status(400).send(errors);

            const user = await User.findOne({ email: request.body.email });
            if (!user)
                return response.status(400).json({ message: 'Invalid email.' });

            if (
                user.failedAttempts.length === 3 &&
                user.failedAttempts[0] + ONE_DAY > Date.now()
            ) {
                // Lockout
                return response
                    .status(400)
                    .send({ message: 'You are locked out for 24 hours' });
            }

            const password = await bcrypt.compare(
                request.body.password,
                user.password
            );
            if (!password) {
                response.status(400).send({ message: 'Invalid password.' });
                user.failedAttempts.push(Date.now());
                if (user.failedAttempts.length === 4) {
                    user.failedAttempts.shift();
                }
                await user.save();
                return;
            }
            user.failedAttempts = [];
            await user.save();

            delete user.password;
            response.status(200).json({
                token: user.generateAuthToken(),
                ...user._doc,
            });
        } catch (err) {
            response.status(500).json({ message: err.message });
        }
    },

    favorite: async (req, res) => {
        const { businessId } = req.params;
        const userId = req.user._id;
        try {
            const user = await User.findById(userId);
            let type;
            const index = (user.favorites || []).indexOf(businessId);
            if (index > -1) {
                // already in favorites - remove
                user.favorites.splice(index, 1);
                type = 'Removed from';
            } else {
                // add
                user.favorites.push(businessId);
                type = 'Added to';
            }
            await user.save();

            res.status(200).send({ success: true, type });
        } catch (err) {
            console.log(err);
            res.status(401).send(err.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select('-password');
            res.status(200).send(user);
        } catch (err) {
            res.status(401).send(err.message);
        }
    },
    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: 'invalid data' });
                return;
            }

            const deleted = await User.findOne({ _id: value._id });

            await User.deleteOne(value).exec();
            res.json(deleted);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error delete vacation' });
        }
    },

    edit: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string(),
                firstName: joi.string().optional().min(2).max(100),
                middleName: joi.string().optional().allow(''),
                lastName: joi.string().optional().min(2).max(100),
                phone: joi.string().optional().min(6).max(250),
                imageUrl: joi.string().optional().allow(''),
                imageAlt: joi.string().optional().allow(''),
                state: joi.string().optional().allow(''),
                country: joi.string().optional(),
                city: joi.string().optional(),
                street: joi.string().optional(),
                houseNumber: joi.string().optional(),
                zip: joi.string().optional().allow(''),
                isBiz: joi.boolean(),
                cards: joi.array().optional(),
                favorites: joi.array().optional(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({
                    error: 'invalid data',
                    details: error.details,
                });
                return;
            }

            const user = await User.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                value
            );

            if (!user) return res.status(404).send('Given ID was not found.');

            const updated = await User.findOne({ _id: req.params.id });
            res.json(updated);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: 'fail to update data' });
        }
    },

    // show cards under specific user
    // GET http://localhost:3000/api/users/cards
    myCards: async (req, res) => {
        try {
            const user = req.user;

            const myCards = await Card.find({ user_id: user._id });

            res.status(200).json({
                status: 'success',
                results: myCards.length,
                data: myCards,
            });
        } catch (err) {
            console.log(err);
            res.status(404).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    // Show personal details
    // GET http://localhost:3000/api/users/me
    myUser: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });
            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: 'invalid data' });
                return;
            }

            const result = await User.findById(value._id);

            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting user' });
        }
    },
};
