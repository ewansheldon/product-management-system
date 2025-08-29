import Supertest from "supertest";
import { app, server } from "./app";

describe('GET /', () => {
    it('should get a 200 status', async () => {
        await Supertest(app)
            .get('/')
            .expect(200);
    });
});

afterEach(() => {
    server.close();
})