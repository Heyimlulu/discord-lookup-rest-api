import LoggingController from "./logging";

describe("LoggingController", () => {
    describe("getTodayLogs", () => {
        it("should return a valid logs", async () => {
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