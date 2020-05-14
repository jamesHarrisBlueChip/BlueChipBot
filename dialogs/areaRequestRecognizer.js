// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { LuisRecognizer } = require('botbuilder-ai');

class AreaRequestRecognizer {
    constructor(config) {
        const luisIsConfigured = config && config.applicationId && config.endpointKey && config.endpoint;
        if (luisIsConfigured) {
            // Set the recognizer options depending on which endpoint version you want to use e.g v2 or v3.
            // More details can be found in https://docs.microsoft.com/en-gb/azure/cognitive-services/luis/luis-migration-api-v3
            const recognizerOptions = {
                apiVersion: 'v3'
            };

            this.recognizer = new LuisRecognizer(config, recognizerOptions);
        }
    }

    get isConfigured() {
        return (this.recognizer !== undefined);
    }

    /**
     * Returns an object with preformatted LUIS results for the bot's dialogs to consume.
     * @param {TurnContext} context
     */
    async executeLuisQuery(context) {
        return await this.recognizer.recognize(context);
    }

    getAreaLink(result) {
        let areaValue = null;
        let areaLink = null;
        if (result.entities.$instance.TimeEntry && result.entities.$instance.TimeEntry.length > 0 ) {
            // this is a time entry request
            areaValue = "SpringAhead Area";
            areaLink = "https://my.springahead.com/go/Account/LogOn";
        }
        if (result.entities.$instance.Expenses && result.entities.$instance.Expenses.length > 0 ) {
            // this is a time entry request
            areaValue = "Travel and Expenses";
            areaLink = "https://www.concursolutions.com/UI/SSO/p0084560m3nw";
        }
        return { areaValue: areaValue, areaLink: areaLink };
    }

}

module.exports.AreaRequestRecognizer = AreaRequestRecognizer;
