const Invitation = jest.requireActual('./Invitation');

const uuidv4 = require('uuid/v4');

it('gets created with a uuid', () => {
    uuidv4.mockReturnValue('TEST-UUID');
    const invitation = new Invitation();

    expect(invitation.key).toEqual('TEST-UUID');
});