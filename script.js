const getSettingsButton = document.getElementById("getSettingsButton");
const getStateInstanceButton = document.getElementById("getStateInstanceButton");
const sendMessageButton = document.getElementById("sendMessageButton");
const sendFileByUrlButton = document.getElementById("sendFileByUrlButton");

const idInstanceInput = document.getElementById("idInstance");
const apiTokenInstanceInput = document.getElementById("apiTokenInstance");
const phoneNumberInput = document.getElementById("phoneNumber");
const messageInput = document.getElementById("message");
const fileUrlInput = document.getElementById("fileUrl");
const filePhoneNumberInput = document.getElementById("filePhoneNumber");

const responseField = document.getElementById("response");

const apiUrl = "https://7201.api.green-api.com";

getSettingsButton.addEventListener("click", function () {
    const idInstance = idInstanceInput.value;
    const apiTokenInstance = apiTokenInstanceInput.value;

    const url  = apiUrl
    + "/waInstance"
    + idInstance
    + "/getSettings/"
    + apiTokenInstance;

    fetch(url)
    .then(function(response)    {
        if(!response.ok) {
            throw new Error("HTTP error: " + response.status + " " + response.statusText);
        }

        return response.json();
    })
    .then(function(data) {
        responseField.value = JSON.stringify(data, null, 2);
    })
    .catch(function(error) {
        responseField.value = error.message;
    });
});

getStateInstanceButton.addEventListener("click", function () {
    const idInstance = idInstanceInput.value;
    const apiTokenInstance = apiTokenInstanceInput.value;

    const url = apiUrl
    + "/waInstance"
    + idInstance
    + "/getStateInstance/"
    + apiTokenInstance;

    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status + " " + response.statusText);
        }
        return response.json();
    })
    .then(function(data) {
        responseField.value = JSON.stringify(data, null, 2);
    })
    .catch(function(error) {
        responseField.value = error.message;
    });
});

sendMessageButton.addEventListener("click", function() {
    const idInstance = idInstanceInput.value;
    const apiTokenInstance = apiTokenInstanceInput.value;
    const phoneNumber = phoneNumberInput.value;
    const message = messageInput.value;

    const chatId = phoneNumber + "@c.us";

    const url = apiUrl
        + "/waInstance"
        + idInstance
        + "/sendMessage/"
        + apiTokenInstance;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chatId: chatId,
            message: message
        })
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status + " " + response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            responseField.value = JSON.stringify(data, null, 2);
        })
        .catch(function(error) {
            responseField.value = error.message;
        });
});

sendFileByUrlButton.addEventListener("click", function() {
    const idInstance = idInstanceInput.value;
    const apiTokenInstance = apiTokenInstanceInput.value;

    const phoneNumber = filePhoneNumberInput.value;
    const fileUrl = fileUrlInput.value;

    const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

    const chatId = phoneNumber + "@c.us";

    const url = apiUrl
        + "/waInstance"
        + idInstance
        + "/sendFileByUrl/"
        + apiTokenInstance;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chatId: chatId,
            urlFile: fileUrl,
            fileName: fileName
        })
    })
    .then(function(response) {
        if(!response.ok) {
            throw new Error("HTTP error: " + response.status + " " + response.statusText);
        }
        return response.json();
    })
    .then(function(data) {
        responseField.value = JSON.stringify(data, null, 2);
    })
    .catch(function(error) {
        responseField.value = error.message;
    });
});
