const functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore()

exports.test = functions.firestore.document('Bookings/{docid}/Requests/{id}').onCreate((snap: { data: () => any; }, context: any) => {
    console.log('Document change', snap.data());
    const dataR = snap.data();

   

        const token = dataR.cmsTokenId

        const payload = {
            notification: {
                title: 'New Booking!',
                body: `name of customer: ${dataR.customerName} TattooName   ${dataR.tattoName}`,
                icon: 'https://goo.gl/Fz9nrQ'
            }
        }

        return admin.messaging().sendToDevice(token, payload)

  
 
 

})