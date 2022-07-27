import LoggingController from "./logging";
import mock from 'xhr-mock';
import * as L from '../mocks/';

describe("LoggingController", () => {
    describe("getTodayLogs", () => {

        // replace the real XHR object with the mock XHR object before each test
        beforeEach(() => mock.setup());

        // put the real XHR object back and clear the mocks after each test
        afterEach(() => mock.teardown());

        it("should return a valid logs", async () => {
            // setup mock response
            mock.get('/api/logs/today', { body: L.TODAY_LOGS });

            // create a new LoggingController
            const controller = new LoggingController();

            // call the getTodayLogs method
            const response = await controller.getTodayLogs();

            expect(response.success).toBe(true);
            expect(response.message).toBe("Successfully retrieved today logs");
            expect(response.data).toBeDefined();
        });
    });
});