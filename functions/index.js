const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const SENDGRID_API_KEY = firebaseConfig.sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
    .document('users/{userId}/followers/{followerId}')
    .onCreate(event => {

        const userId = event.params.userId;

        const db = admin.firestore()

        return db.collection('users').doc(userId)
                 .get()
                 .then(doc => {

                    const user = doc.data()

                    const msg = {
                        to: user.email,
                        from: 'hello@angularfirebase.com',
                        subject:  'New Follower',
                        // text: `Hey ${toName}. You have a new follower!!! `,
                        // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            
                        // custom templates
                        templateId: 'your-template-id-1234',
                        substitutionWrappers: ['{{', '}}'],
                        substitutions: {
                          name: user.displayName
                          // and other custom properties here
                        }
                    };

                    return sgMail.send(msg)
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     

});