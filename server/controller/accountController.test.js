const Invitation = require('../model/Invitation');
Invitation.mockImplementation(() => ({ key: 'INVITE_KEY' }));

const accountController = jest.requireActual('./accountController');
// requires mocks
const accountService = require('../service/accountService');
const emailService = require('../service/emailService');
const Account = require('../model/Account');

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
        const request = {user: {id}};
        accountService.getAccount.mockImplementation(() => ({id: 4}));

        await accountController.getAccountById(request, mockResponse);

        expect(mockResponse.send.mock.calls[0][0].id).toEqual(4);
    });

    it('does not return hashed password', async () => {
        const id = 4;
        const request = {user: {id}};
        accountService.getAccount.mockImplementation(() => ({id: 4, password: 'password that we still dont want people to know even though its hashed'}));

        await accountController.getAccountById(request, mockResponse);

        expect(mockResponse.send.mock.calls[0][0].password).toEqual(null);
    });

    it('returns 404 if no accounts with id exist', async () => {
        const id = -1;
        const request = {user: {id}};
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
       
       const {
           email,
           username,
           firstName,
           middleName,
           lastName } = accountService.saveAccount.mock.calls[0][0];
       
       expect(email).toEqual(request.body.email);
       expect(username).toEqual(request.body.username);
       expect(firstName).toEqual(request.body.firstName);
       expect(middleName).toEqual(request.body.middleName);
       expect(lastName).toEqual(request.body.lastName);
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

   it('sends email with activation link', async () => {

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

       expect(emailService.sendInvitation.mock.calls[0][0]).toEqual(request.body.email);
       expect(emailService.sendInvitation.mock.calls[0][1]).toEqual('INVITE_KEY');
   });
});