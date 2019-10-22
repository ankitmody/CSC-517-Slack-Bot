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
   
    [S1] User will request for an example to perform search in Github. 
    [S2] Bot will provide possible pre-defined options for "search": repositories, commits, code, 
         users, topics, labels, issues, pull requests
    [S3] Bot will return a curl command example to search based on query input.        
    [S4] Bot will perform search on topic.
    
 3. Subflows
    
    [S1] User writes "I want to see an example for search".
    [S2] Bot shows a list of options to perform search in the from of drop-down list and user can pick 
         any one of them. Suppose user selects Search based on Topics.
    [S3] Bot will ask the user if he wants to execute the curl command.
    
 4. Alternative Flows
   
    [E2] User does not select any criteria to perform search, the bot will wait for a fixed time interval 
         and will end the conversation.
       
</code></pre>

### Use Case 2: Example to get information about user

<pre><code>

1. Preconditions
   User must have GitHub API token in system

2. Main Flow
   User will request an example for publicly available information of a user 
   
   [S1] User will request for an example to get details of a user on Github. 
   [S2] Bot will return a curl command example to get user information on query input.        
   [S3] Bot will display the user.
   
3. Sub Flows
   
   [S1] User writes "I want to know about user XYZ".
   [S3] Bot will ask the user if he wants to execute the curl command.
   
4. Alternative Flows
   
   [E1] User does not provide any input, the bot will wait for a fixed time interval 
        and will end the conversation.

</code></pre>

### Use Case 3: Example to Edit an Issue

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
    
 2. Main Flow
    User will request an example to edit an issue "123" for repository "XYZ"
    
    [S1] User will request for an example to work with iusses in Github. 
    [S2] Bot will provide possible pre-defined options for "issues": list, get, create, edit, lock an issue.
    [S3] Bot will return a curl command example to edit an issue based on query input.        
    [S4] Bot will edit the issue.
    
 3. Subflows
    [S1] User writes "I want to work with issues".
    [S2] Bot shows a list of options to work with issues in the from of drop-down list and user can pick 
         any one of them. Suppose user selects Edit an Issue. User writes "I want to know edit an issue "123" for repository "XYZ" "
    [S3] Bot will ask the user if he wants to execute the curl command.
    
 4. Alternative Flows
   
    [E2] User does not select any criteria to work with issues, the bot will wait for a fixed time interval 
         and will end the conversation. 
         
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
   
   [S1] User writes "I want to create a repository XYZ".
   [S3] Bot will ask the user if he wants to execute the curl command.
   
4. Alternative Flows
   
   [E1] User does not provide any input, the bot will wait for a fixed time interval 
        and will end the conversation.

</code></pre>

