const { registerPartner, getPartnerProfile, updatePartnerProfile, deletePartnerProfile } = require('./index');

describe('registerPartner function', () => {
    it('should return 201 when provided with valid input', async () => {
        // Mock event object
        const event = {
            httpMethod: 'POST',
            body: JSON.stringify({ name: 'Test', phone_no: '1234567890' })
        };

        // Call the registerPartner function with the mock event
        const response = await registerPartner(event);

        // Check if the response status code is 201
        expect(response.statusCode).toBe(201);
    });
});

describe('getPartnerProfile function', () => {
    it('should return 200 with partner profile data when provided with a valid partner ID', async () => {
        // Mock event object with a valid partner ID
        const event = {
            httpMethod: 'GET',
            queryStringParameters: { id: 'valid_partner_id' }
        };

        // Call the getPartnerProfile function with the mock event
        const response = await getPartnerProfile(event);

        // Check if the response status code is 200
        expect(response.statusCode).toBe(200);
    });
});

describe('updatePartnerProfile function', () => {
    it('should return 200 when provided with valid input', async () => {
        // Mock event object with a valid partner ID and updated data
        const event = {
            httpMethod: 'PUT',
            pathParameters: { id: 'valid_partner_id' },
            body: JSON.stringify({ name: 'Updated Test', phone_no: '9876543210' })
        };

        // Call the updatePartnerProfile function with the mock event
        const response = await updatePartnerProfile(event);

        // Check if the response status code is 200
        expect(response.statusCode).toBe(200);
    });
});

describe('deletePartnerProfile function', () => {
    it('should return 200 when provided with a valid partner ID', async () => {
        // Mock event object with a valid partner ID
        const event = {
            httpMethod: 'DELETE',
            pathParameters: { id: 'valid_partner_id' }
        };

        // Call the deletePartnerProfile function with the mock event
        const response = await deletePartnerProfile(event);

        // Check if the response status code is 200
        expect(response.statusCode).toBe(200);
    });
});
