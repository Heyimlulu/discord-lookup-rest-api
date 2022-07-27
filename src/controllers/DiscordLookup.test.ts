import DiscordLookupController from "./DiscordLookup";
import mock from 'xhr-mock';
import * as U from '../mocks/';

describe('DiscordLookupController', () => {
    describe("getUserByID", () => {

        // replace the real XHR object with the mock XHR object before each test
        beforeEach(() => mock.setup());

        // put the real XHR object back and clear the mocks after each test
        afterEach(() => mock.teardown());

        it("should return a valid Discord user", async () => {
            // setup mock response
            mock.get('/api/user/265896171384340480', { body: U.USER_FOUND });

            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('265896171384340480');
    
            expect(response.success).toBe(true);
            expect(response.message).toBe("User found");
            expect(response.data).toBeDefined();
        });

        it("should return an error if the user doesn't exist", async () => {
            // setup mock response
            mock.get('/api/user/112233445566778899', { body: U.USER_NOT_FOUND });

            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('112233445566778899');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe("User not found");
        });

        it('should return an error if there is no query', async () => {
            // setup mock response
            mock.get('/api/user/', { body: U.NO_QUERY });

            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe('No query provided');
        });

        it('should return an error if the query is less than 15 characters', async () => {
            // setup mock response
            mock.get('/api/user/123456789012345', { body: U.QUERY_TOO_SHORT });

            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('1234567890123');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe("ID must be 15 characters long");
        });

        it('should return an error if the query is not a number', async () => {
            // setup mock response
            mock.get('/api/user/abcdefghijklmnop', { body: U.QUERY_NOT_NUMBER });

            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('abcdefghijklmnopqrstuvwxyz');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe("ID must be a number");
        });
    });
}); 