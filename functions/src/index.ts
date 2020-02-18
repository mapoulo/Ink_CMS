const functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore()

exports.test = functions.firestore.document('Bookings/{id}').onCreate((snap: { data: () => any; }, context: any) => {
    console.log('Document change is here', snap.data());
    const dataR = snap.data();

   

        const token = dataR.tokenId

        const payload = {
            notification: {
                title: 'New Booking!',
                body: `name of customer:  ${dataR.customerName}`
            }
        }

        return admin.messaging().sendToDevice(token, payload)


})


