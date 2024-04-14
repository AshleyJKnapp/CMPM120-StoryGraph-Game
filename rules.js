// Notes to self: working mostly with rules.js, myStory.json, engine.js
var suit_on = false;
var task_complete = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // DONE // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // DONE // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        console.log("Suit_on: "+suit_on+"\nTask_complete: "+task_complete);
        let locationData = key; // use `key` to get the data object for the current story location

        this.engine.show(this.engine.storyData.Locations[locationData].Body); // Body of the location data
        
        // If the Location contains a change for Task, change it 
        if (this.engine.storyData.Locations[locationData].Task){
            task_complete = true; // this is a one time toggle, so no need to 
        }
        // If the Location contains a change for Suit, change it 
        if (this.engine.storyData.Locations[locationData].Suit){
            if (this.engine.storyData.Locations[locationData].Suit === "true"){
                suit_on = true;
            }
        }


        // Check if locked
        // Display the Locked choices
        if (!suit_on && this.engine.storyData.Locations[locationData].LockedChoices) {
            // loop over the location's LockedChoices
            for (let choice of this.engine.storyData.Locations[locationData].LockedChoices) {
                this.engine.addChoice(choice.Text, choice); // use the Text of the choice
            }

        } else if (task_complete && this.engine.storyData.Locations[locationData].EndChoices) {
        // Check if game is finished and display the correct ending Location if moving to the ending room
        // (There are two endings which happen in the same room, but are different Locations in the code)
           
            if (suit_on && this.engine.storyData.Locations[locationData].EndChoices) {
                // Display SecretEndCmd
                let choice = this.engine.storyData.Locations[locationData].EndChoices[0];
                this.engine.addChoice(choice.Text, choice); // use the Text of the choice
                this.engine.addChoice(this.engine.storyData.Locations[locationData].EndChoices[2].Text, this.engine.storyData.Locations[locationData].EndChoices[2]); // display the back option (hardcoded at the moment)
            }

            // Display EndCmd
            let choice = this.engine.storyData.Locations[locationData].EndChoices[1];
            this.engine.addChoice(choice.Text, choice);
            this.engine.addChoice(this.engine.storyData.Locations[locationData].EndChoices[2].Text, this.engine.storyData.Locations[locationData].EndChoices[2]); // display the back option (hardcoded at the moment)

        } else if (this.engine.storyData.Locations[locationData].Choices) {
        // Check if the location has any Choices
        // Display Normal Choices
            for (let choice of this.engine.storyData.Locations[locationData].Choices) { // loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // use the Text of the choice
            }

        } else {
            // End the game
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');