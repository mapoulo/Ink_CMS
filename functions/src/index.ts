const functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore()

exports.test = functions.firestore.document('Requests/{docid}').onCreate((snap: { data: () => any; }, context: any) => {
    console.log('Document change', snap.data());
    const dataR = snap.data();

    const token ='fUGK-VG9KexYl2uLJ0vrIY:APA91bGlW0kXsgpdgInPvaaQ-Hj_bjLM99NGwnglOhMm5FCm7-XnEKH03RF3Kj7uf9XXMQzdO8UoTuFq-Lg_An9WBQyR96aM7yLCHwxWBk5MR1NqGNPsXfd33_TbBAwXH0y4TOY2WJZu'
    const payload = {
        notification: {
            title: 'New Booking!',
            body: `name of customer: ${dataR.customerName} TattooName   ${dataR.tattoName}`,
            icon: 'https://goo.gl/Fz9nrQ'
        }
    }
    return admin.messaging().sendToDevice(token, payload)

})