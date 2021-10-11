const { HttpCode } = require('../helpers/constatnts');
const guard = require('../helpers/guard');
const passport = require('passport');

describe('test guard', () => {
    const user = { token: '3132132' };
    const req = { get: jest.fn((header) => `Bearer ${user.token}`) };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
        locals: user
    };
    const next = jest.fn();
    
    test('user exist', async () => {
        passport.authenticate = jest.fn((strategy, options, cb) => () => {
            cb(null, user);
        });
        guard(req, res, next);
        expect(req.get).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
      test('token not exist', async () => {
        passport.authenticate = jest.fn((strategy, options, cb) => () => {
            cb(null, {token: ''});
        });
        guard(req, res, next);
          expect(req.get).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalled();
          expect(res.json).toHaveBeenCalled();
          expect(res.json).toHaveReturnedWith({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: "Not authorized guard"
          });
      });
          test('wrong token', async () => {
        passport.authenticate = jest.fn((strategy, options, cb) => () => {
            cb(null, {token: '11111111'});
        });
        guard(req, res, next);
          expect(req.get).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalled();
          expect(res.json).toHaveBeenCalled();
          expect(res.json).toHaveReturnedWith({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: "Not authorized guard"
          });
          });
         test('error', async () => {
        passport.authenticate = jest.fn((strategy, options, cb) => () => {
            cb(true, user);
        });
        guard(req, res, next);
          expect(req.get).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalled();
          expect(res.json).toHaveBeenCalled();
          expect(res.json).toHaveReturnedWith({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: "Not authorized guard"
          });
    });
});