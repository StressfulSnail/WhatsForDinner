
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

    sendRecovery(email, password) {
        console.log(`
        =================================
        EMAIL RECOVERY
        Sent to: ${email}
        Temp Password: ${password}
        "Change password as soon as possible!"
        =================================
        `);
    }
}

module.exports = new EmailService();