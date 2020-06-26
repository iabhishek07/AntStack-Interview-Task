<h1> AntStack-Interview-Task</h1>


## Problem Statement: 
Create a one on one chat server which stores all the message history in the database as encrypted.

## Tech Stack Used:
HTML, CSS, NodeJs, Express, Firebase

## Description:
Application has a DashBoard on which there are two input fields for username & Secret Key.
After authentication, route takes user to Chat Window.
Messages could not be displayed directly from the database, they are readable only after decryption from secret key.

## Demo:
For Live Demo, Follow the link
[https://antstack-one-to-one-chat.web.app](https://antstack-one-to-one-chat.web.app)                          
<p>(Hosted app is not working properly as of now because of the directory structure, For Testing app on local machine Follow below steps!)</p>
 
## Running the app on Local Machine:
1. Clone this repository
2. Run command :```npm install (For installing dependencies)```
3. Run command : 
```node app.js```
4. Then server will start on localhost:5000.

## Working
For testing purposes, open two browser tabs with localhost:5000 and after entering similar key on both windows only, messages can be seen in chat box!
