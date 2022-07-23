import DiscordLookupController from "./DiscordLookup";

describe('DiscordLookupController', () => {
    describe("getUserByID", () => {
        it("should return a valid Discord user", async () => {
            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('265896171384340480');
    
            expect(response.success).toBe(true);
            expect(response.message).toBe("User found");
            expect(response.data).toBeDefined();
        });

        it("should return an error if the user doesn't exist", async () => {
            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('112233445566778899');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe("User not found");
        });

        it('should return an error if there is no query', async () => {
            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('');
    
            expect(response.message).toBe('No query provided');
        });

        it('should return an error if the query is less than 15 characters', async () => {
            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('1234567890123');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe("ID must be 15 characters long");
            expect(response.data).toBeNull();
        });

        it('should return an error if the query is not a number', async () => {
            // create a new DiscordLookupController
            const controller = new DiscordLookupController();
    
            // call the getUserByID method
            const response = await controller.getUserByID('abcdefghijklmnopqrstuvwxyz');
    
            expect(response.success).toBe(false);
            expect(response.message).toBe("ID must be a number");
            expect(response.data).toBeNull();
        });
    });
}); 