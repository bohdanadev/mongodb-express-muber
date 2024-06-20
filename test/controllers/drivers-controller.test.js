import assert from 'assert';
import request from 'supertest';
import { describe } from 'mocha';
import mongoose from 'mongoose';

import app from '../../app.js';

const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
    it('Post to /api/drivers creates a new driver', (done) => {
        Driver.countDocuments().then(count => {
            request(app)
            .post('/api/drivers')
            .send({email: 'test@test.com'})
            .end(()=> {
                Driver.countDocuments().then(newCount => {
                    assert((count + 1) === newCount);
                });
            });
        });
        done();
    });
});