
class EmailService {
    sendInvitation(email, activationKey) {
        console.log(`
        =================================
        EMAIL INVITATION
        Sent to: ${email}
        Activation Key: ${activationKey}
        =================================
        `);
    }
}

module.exports = new EmailService();