// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
//const { AdaptiveCards } = require('adaptivecards');
const AreaCard = require('./resources/areaNavigateCard.json');
//const ACData = require("adaptivecards-templating");
const WATERFALL_DIALOG = 'waterfallDialog';

class AreaDialog extends ComponentDialog {
    constructor(id) {
        super(id || 'areaDialog');

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.displayCard.bind(this),
                this.finalStep.bind(this)
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async displayCard(step) {
        //Display the Adaptive Card
        // var template = new ACData.Template({ 
        //     AreaCard
        // });
        
        // var dataContext = new ACData.EvaluationContext();
        // dataContext.$root = {
        //         "areaValue": "Time",
        //         "areaLink": "https://my.springahead.com/go/Account/LogOn",
        // };
        // var card = template.expand(dataContext);
        // Render the card
        //var adaptiveCard = AdaptiveCards.parse(card);
        const areaDetails = step.options;
        if( areaDetails !== null && areaDetails !== undefined && areaDetails.areaLink !== undefined && areaDetails.areaLink !== null )
        {
            const card = CardFactory.adaptiveCard(AreaCard);
            if( card.content.body !== null && card.content.body !== undefined && card.content.body.length > 0 &&
                card.content.actions !== null && card.content.actions !== undefined && card.content.actions.length > 0 )
            {
                card.content.body[0].text = areaDetails.areaValue;
                card.content.actions[0].url = areaDetails.areaLink;
                // Now you have an AdaptiveCard ready to render! 
                await step.context.sendActivity({ attachments: [card] });
            }
        }
        return await step.next();
    }
    

    /**
     * Complete the interaction and end the dialog.
     */
    async finalStep(stepContext) {
        if (stepContext.result === true) {
            const areaDetails = stepContext.options;
            return await stepContext.endDialog(areaDetails);
        }
        return await stepContext.endDialog();
    }
}

module.exports.AreaDialog = AreaDialog;


