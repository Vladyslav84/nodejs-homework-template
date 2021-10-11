const request = require("supertest");
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
require('dotenv').config();
const app = require('../app');
const User = require('../model/userSchema');
const Users = require('../repositories/users');
const db = require('../bin/server');
const newTestUser = require('../test/data/data');

jest.mock('cloudinary');

describe('route contacts', () => {
    beforeAll(async () => {
        await db;
        await User.deleteOne({ email: newTestUser.email });
    });

    afterAll(async () => {

        const mongo = await db;
        await User.deleteOne({ email: newTestUser.email });
        await mongo.disconnect();

    });

    test('Upload avatar', async () => {
        const response = await request(app)
            .post('/api/users/singup')
            .set('Authorization', `Bearer fvsrfsfrsrfr`)
            .send(newTestUser)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(201)
        expect(response.body).toBeDefined()
    });
}) 