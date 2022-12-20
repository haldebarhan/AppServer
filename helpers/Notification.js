const    formatDate  = require("./dateFormat")

 const welcomeMessage = () => {
    return "Inscription reussie penssez a mettre vos informations a jour"
}


 const InfoMessage = () => {
    return "Vos données ont été modifiées"
}

const getNotification = (type) => {
    let message
    if (type == 'Info')
        message = InfoMessage()
    else message = welcomeMessage()
    const notification = {
        from: 'Admin',
        type: type,
        read: false,
        content: message,
        created_at: formatDate(new Date())
    }
    return notification
}

module.exports = getNotification