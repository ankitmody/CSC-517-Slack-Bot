# GitHubYodaBOT

## BOT IMPLEMENTATION

Following primary tasks were performed for the purpose of Bot implementation:

- To develop a fully operational platform, we chose Slack platform and created an App within it.
- To further achieve the purpose, a Bot was created inside the Slack app.
- We have implemented the basic conversation/interaction with Bot along the lines of our use case and the code for the same can be found under ____ folder.

## USE CASE REFINEMENT

### Feedback given by professor:

(i) Generalizability of Use cases

### Improvements done in this milestone

We will be handling all available Github API endpoints and will be dealing with all the methods such as:

- GET : Few examples include "List events for a repository", "List all the emojis available to use on GitHub", "List user projects", etc.
- POST : Few examples include "Create a pull request", "Create a project card", Create a milestone", etc.
- PUT : Few examples include "Star a gist", "Follow a user", "Watch a repository (LEGACY)", etc.
- PATCH : Few examples include "Mark a thread as read", "Update a reference", "Edit a comment", etc.
- DELETE : Few examples include "Unblock a user", "Delete a thread subscription", "Delete a reaction", etc.

### Use Case 1: Example to Search Topics

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
    
 2. Main Flow
    User will request an example for "search"
   
    [S1] User will request for an example to perform search a Topic in GitHub.
    [S2] Bot will return a curl command example to search based on query input.        
    [S3] Bot will perform search on topic.
    
 3. Subflows
    
    [S1] User writes "I want to see an example for search of a Topic".
    [S2] Bot asks the user to enter qualifier q. 
    [S3] Bot will ask the user if he wants to execute the curl command.
    
 4. Alternative Flows
   
    [E2] User enters an integer value when Bot asks for query as string for input in which case 
         the bot will ask for user input again with a message "I think you entered an Integer. 
         Try giving a string".
    [E3] User does not provide any input when Bot asks the user if he wants to execute the command
         in which case the bot will wait for a fixed time interval and will end the conversation with the
         message "You took longer than I expected".     
       
</code></pre>

### Use Case 2: Example to get information about user

<pre><code>

1. Preconditions
   User must have GitHub API token in system

2. Main Flow
   User will request an example for publicly available information of a user 
   
   [S1] User will request for an example to get details of a user on GitHub. 
   [S2] Bot will return a curl command example to get user information on query input.        
   [S3] Bot will display the user.
   
3. Sub Flows
   
   [S1] User writes "I want to know about user XYZ".
   [s2] Bot asks the user to enter username.
   [S3] Bot will ask the user if he wants to execute the curl command.
   
4. Alternative Flows
   
   [E2] User enters an integer value when Bot asks for username as string for input in which case 
        the bot will ask for user input again with a message "I think you entered an Integer. 
        Try giving a string".
   [E3] User does not provide any input when Bot asks the user if he wants to execute the command
        in which case the bot will wait for a fixed time interval and will end the conversation with the
        message "You took longer than I expected".       

</code></pre>

### Use Case 3: Example to Edit an Issue

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
    
 2. Main Flow
    User will request an example to edit an issue "123" for repository "XYZ"
    
    [S1] User will request for an example to edit an issue on GitHub. 
    [S2] Bot will return a curl command example to edit an issue based on query input.        
    [S3] Bot will edit the issue.
    
 3. Subflows
    [S1] User writes "I want to see how to edit an issue".
    [S2] Bot asks the user to enter owner, repository name and issue ID.
    [S3] Bot will ask the user if he wants to execute the curl command.
    
 4. Alternative Flows
   
    [E2] User enters a String value when Bot asks for issue ID as integer for input in which case 
         the bot will ask for user input again with a message "I think you entered a String. 
         Try giving an Integer".
    [E3] User does not provide any input when Bot asks the user if he wants to execute the command
         in which case the bot will wait for a fixed time interval and will end the conversation with the
         message "You took longer than I expected".        
             
</code></pre>

### Use Case 4: Example to Create a Respository

<pre><code>

1. Preconditions
   User must have GitHub API token in system

2. Main Flow
   User will request an example to create a repository
   
   [S1] User will request for an example to create a repository on Github. 
   [S2] Bot will return a curl command example to create a repository based on query input.        
   [S3] Bot will create a repository.
   
3. Sub Flows
   
   [S1] User writes "I want an example on how to create a repository".
   [S2] Bot asks the user to enter a repository name.
   [S3] Bot will ask the user if he wants to execute the curl command.
   
4. Alternative Flows
   
   [E3] User does not provide any input when Bot asks the user if he wants to execute the command
   in which case the bot will wait for a fixed time interval and will end the conversation with the
   message "You took longer than I expected".

</code></pre>

## SELENIUM TESTING

We have tested at least one "happy path" and at least one "alternative path" using Puppeteer for automation testing
and the code for the same is available in -------.

## MOCKING SERVICE COMPONENT

* To implement mock services and data to support service integration, we have mocked the API calls' return JSON responses to .json files in our project which can be seen in the request_mock.json.
* The intent.json file consists of examples various user intents which the bot uses to reply to user. 

