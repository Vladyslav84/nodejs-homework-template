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

describe('PATCH /api/users/avatars', () => {
    let newUser, token;
    beforeAll(async () => {
        // const contactsServer = new ContactsServer();
        // server = await contactsServer.start();
        await db;
        newUser = await User.create(newTestUser);
        const SEC_KEY = process.env.SEC_KEY;
        const issueToken = (payload, secret) => jwt.sign(payload, secret);
        token = issueToken({ id: newUser._id }, SEC_KEY);
        await Users.updateToken(newUser._id, token);
    });
        
    afterAll(async () => {
        const mongo = await db
        await User.findOneAndDelete({ email: newUser.email });
        await mongo.disconnect()
    });


    // it('should return 401 Unauthorized', async () => {
    //     // await request(server)
    //     const response = await request(app)
    //         .patch('/api/users/avatars')
    //         .set('Authorization', `Bearer ${newUser.token}p`)
    //         .attach('avatar', 'temp/1612718734058.png')
    //         .field('avatarURL', 'http://localhost:3001/images/1612718734058.png')
    //         .expect('Content-Type', /json/)
    //         .expect(401, { message: 'Not authorized' });
    // });

    test('should return 200 OK', async () => {
        // const updatedUser = await request(app)
            
        const buf = await fs.readFile('./tmp/1633528821009-avatar.png');
        const response = await request(app)
            .patch('/api/users/avatars')
            .set('Authorization', `Bearer ${token}`)
            .attach('avatar', buf,  '1633528821009-avatar.png')
            // .field('avatarURL', 'http://127.0.0.1:5500/tmp/1633528821009-avatar.png')
            // .expect('Content-Type', /json/)
            // .expect(200);
            expect(response.status).toEqual(200);
            expect(response.body).toBeDefined();
            expect(response.body.data.avatarUrl).toEqual('secure_url');

        // const response = updatedUser.body;
        // response.should.have.property('avatarURL').which.is.a.String();
        // response.should.not.have.property('password');

        // const existedUser = await userModel.findOne({ email: someEmail });

        // should.exists(existedUser.avatarURL);
    })
});