const accountController = jest.requireActual('./accountController');
// requires mocks
const accountService = require('../service/accountService');

let mockResponse;

beforeEach(() => {
    mockResponse = {
        sendStatus: jest.fn(),
        send: jest.fn(),
    }
});

describe('get account by id', () => {
    it('finds accounts by id', async () => {
        const id = 4;
        const request = {params: {accountId: id}};
        accountService.getAccount.mockImplementation(() => ({id: 4}));

        await accountController.getAccountById(request, mockResponse);

        expect(mockResponse.send.mock.calls[0][0].id).toEqual(4);
    });

    it('does not return hashed password', async () => {
        const id = 4;
        const request = {params: {accountId: id}};
        accountService.getAccount.mockImplementation(() => ({id: 4, password: 'password that we still dont want people to know even though its hashed'}));

        await accountController.getAccountById(request, mockResponse);

        expect(mockResponse.send.mock.calls[0][0].password).toEqual(null);
    });

    it('returns 404 if no accounts with id exist', async () => {
        const id = -1;
        const request = {params: {accountId: id}};
        accountService.getAccount.mockImplementation(() => null);

        await accountController.getAccountById(request, mockResponse);

        expect(mockResponse.sendStatus.mock.calls[0][0]).toEqual(404);
    });
});