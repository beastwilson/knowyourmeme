/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const nodeyourmeme = require('nodeyourmeme');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'Know Your Meme',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'Say, what is, and then a meme name to get information about a meme',
            HELP_REPROMPT: ' What else can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            FAILED_MESSAGE: 'Sorry, but I couldn\'t find any information on that meme.'
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'meme': function () {
        const tell = (text) => {
		
            this.emit(':ask', text + this.t('HELP_REPROMPT'));
        };

        const meme = this.event.request.intent.slots.meme_string.value;

        nodeyourmeme.search(meme)
            .then(about => {
                tell(about);
            })
            .catch(e => {
                tell(this.t('FAILED_MESSAGE'))
            });
    },
    'random': function () {
        const tell = (text) => {

            this.emit(':ask', text + this.t('HELP_REPROMPT'));
        };

        nodeyourmeme.random()
            .then(about => {
                tell(about);
            })
            .catch(e => {
                tell(this.t('FAILED_MESSAGE'))
            });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
