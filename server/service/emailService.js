
class EmailService {
    sendInvitation(email, activationKey) {
        console.log(`
        =================================
        EMAIL INVITATION
        Sent to: ${email}
        Activation Key: ${activationKey}
        IMPORTANT: Please change your password upon logging in for the first time!
        =================================
        `);
    }
}

module.exports = new EmailService();