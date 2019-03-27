const accountController = jest.requireActual('./accountController');
const Account = jest.requireActual('../model/Account');
// requires mocks
const accountService = require('../service/accountService');

let mockResponse;

beforeEach(() => {
    mockResponse = {
        sendStatus: jest.fn(),
        send: jest.fn(),
        status: jest.fn(() => ({
            send: jest.fn(),
        })),
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

describe('create account', () => {
   it('creates a valid account', async () => {
       const request = {
           body: {
               email: 'test@test.com',
               username: 'test',
               password: '.Test123',
               firstName: 'Jeff',
               middleName: 'J',
               lastName: 'Jefferson',
           }
       };

       await accountController.createAccount(request, mockResponse);

       expect(mockResponse.sendStatus.mock.calls[0][0]).toEqual(200);
       expect(accountService.saveAccount.mock.calls[0][0]).toEqual(request.body);
   });

   it('verifies valid email syntax', async () => {
       const request = {
           body: {
               email: 'test@',
               username: 'test',
               password: '.Test123',
               firstName: 'Jeff',
               middleName: 'J',
               lastName: 'Jefferson',
           }
       };

       await accountController.createAccount(request, mockResponse);
       expect(mockResponse.sendStatus.mock.calls[0][0]).toEqual(400);
   });

   it('verifies valid password syntax', async () => {
        const request = {
            body: {
                email: 'test@test.com',
                username: 'test',
                password: 'notgoodenoughforwhatsfordinner',
                firstName: 'Jeff',
                middleName: 'J',
                lastName: 'Jefferson',
            }
        };

        await accountController.createAccount(request, mockResponse);
        expect(mockResponse.sendStatus.mock.calls[0][0]).toEqual(400);
    });

   it('verifies non duplicate email', async () => {
       const request = {
           body: {
               email: 'test@test.com',
               username: 'test',
               password: '.Test123',
               firstName: 'Jeff',
               middleName: 'J',
               lastName: 'Jefferson',
           }
       };
        accountService.findByEmail.mockReturnValue(new Account());

        await accountController.createAccount(request, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toEqual(400);
    });

   it('verifies non duplicate username', async () => {
       const request = {
           body: {
               email: 'test@test.com',
               username: 'test',
               password: '.Test123',
               firstName: 'Jeff',
               middleName: 'J',
               lastName: 'Jefferson',
           }
       };
       accountService.findByUsername.mockReturnValue(new Account());

       await accountController.createAccount(request, mockResponse);
       expect(mockResponse.status.mock.calls[0][0]).toEqual(400);
   });

   // it('sends email with activation link');
});