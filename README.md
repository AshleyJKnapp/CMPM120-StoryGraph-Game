# StoryGraphTool

An exercise in building data-driven game design

## Activity Instructions

This activity gets you thinking about how to keep key aspects of your game design in data files (e.g. JSON files) rather than in code files (e.g. JavaScript files). We want to tell a simple choice-based story, but we don't want to have to create a new block of JavaScript for each location in our story world. We might want to have special logic for the start and end of the story, but most of the middle scenes of the story shoudl share the same logic. We'll put everything needed to customize different instances of this middle scene into a file called `myStory.json` and only make a edits to `rules.js`.

### Programming

Open this project in your favorite text editor and start a local web server. View `index.html` in your browser through the server you started. You should see the title of the story and the first choice, but other aspects of the game should be broken.

In your text editor, open `rules.js` and follow the `TODO` comments as a guide to repairing the code.

If your repair works, you should be able to play all the way through the end of the story.

### Authoring

With the web server running, navigate to the page called `preview.html`. You should see a graphical preview of the story world defined in `myStory.json`. Edit `myStory.json` to define your own interesting world, examining the view of `preview.html` to find problems before returning to play through your story in `index.html`.

## Engine Documentation

Build your story by defining a few subclasses of `Scene` and adding your story data to a JSON file like `myStory.json`. To begin play, call `Engine.load(firstSceneClassName, pathToStoryJson)`.

### Engine:
#### Methods:
- `setTitle(title)`: Show a large header and change the title of the webpage.
- `show(text)`: Append some text to the web page.
- `addChoice(text, [data])`: Add a button which appears to the player as `text`, supplying an optional `data` argument to customize the effects of this choice. All choice buttons are removed as soon as the player selects one of them.
- `gotoScene(sceneClass, [data])`: Transition to a new scene by provided class name, supplying an optional `data` argument to customize the scene instance.

### Scene
#### Methods:
- `create([data])`: Called when a scene is first presented to the player. The `data` argument comes from the second parameter to `gotoScene`.
- `handleChoice([data])`: Called when the player as selected a choice button. The `data` argument comes from the second parameter to `addChoice`.

#### Fields:
- `engine`: An instance of `Engine`, as documented below:
- `storyData`: The result of parsing the JSON file at `pathToStoryJson`

