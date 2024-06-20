import { before, beforeEach } from "mocha";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

before(done => {
    mongoose.connect(process.env.MONGODB_URL_TEST);
    mongoose.connection
    .once('open', () => done())
    .on('error', err => {
        console.warn('Warning', err);
    });
});

beforeEach(done => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
    .then(() => done())
    .catch(() => done());
});