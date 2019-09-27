# GitHubYodaBOT

## 1. Problem Statement

GitHub has provided an amazing interface for developers who want to develop applications targeting GitHub, known as GitHub REST API. For instance, we can build an application with better functionalities and presentation layer on top of the API. To access GitHub API, it provides various endpoints to carry out specific tasks. But for a beginner, the whole process could be quite overwhelming and involves going through the GitHub documentation a number of times before he could successfully develop his application. Imagine the level of convenience and swiftness the developer would experience, if the user could interact with a chat bot to get the customized example based on user inputs instead of spending valuable time searching for the relevant information from the documentation. On accessing the documentation and online resources, user always gets generic examples which he needs to modify as per his requirements. Even on getting the correct required example, user has to spend more time in learning how to use it to achieve his goal. We plan to save developers the hassle of referring the GitHub documentation or other online resources to seek help on accessing endpoints with the help of our GitHubYodaBot. 

 
## 2. Bot Description

We plan to propose a GitHubYodaBot which can solve the problem faced by all the beginners who aim to use GitHub API and need some resources for their development. This chat bot will provide a platform for users to get customized examples which will populate fields in API requests based on user inputs, without going through the trouble of looking back and forth in the GitHub documentation.As this bot facilitates user interaction, it can be considered as a Chat Bot and fits best into the category of Documentation Bot.

The bot will provide curl commands to the user which he can execute on his terminal. The bot will also give an option to execute the command on his behalf. In this way, it not only provides developers a quick way to find the examples but also gives an up-to-date API request example in case GitHub updates the API endpoints. Thus, the bot would save a lot of time of developers to search for the correct content and reduces significant development time. The bot would be embedded on Slack which is used by majority of the developers and will make it easy for them to communicate with the bot. Also, deploying the bot on Slack can help multiple developers use the bot to carry out different functionalities. The bot in this scenario not only helps to get the correct answers for the developers but also allows ease of usage.

### Tagline:

*Serving API Examples. Expediting Learning. Streamlining Development*

## 3. Use Cases

### Use Case 1: Example to Create a Repo

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
 2. Main Flow
    User will request an example to create a new repository with name "XYZ"
 3. Subflows
    [S1] User provides repository name. 
    [S2] Bot will return a curl command example to create a new repository.
         Asks the user if he wants it to execute the curl command. 
    [S3] Bot will create a new repository.
</code></pre>

### Use Case 2: Example to Edit an Issue

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
 2. Main Flow
    User will request an example to edit an issue "123" for repository "XYZ"
 3. Subflows
    [S1] User provides repository name. User provides issue ID.
    [S2] Bot will return a curl command example to edit an issue. 
         Asks the user if he wants it to execute the curl command.
    [S3] Bot will allow the user to edit an issue with given issue ID and repository name.
</code></pre>

### Use Case 3: Example to List events for an Issue

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
 2. Main Flow
    User will request an example to list all events for an issue "123" and for repository "XYZ"
 3. Subflows
    [S1] User provides repository name. User provides issue ID.
    [S2] Bot will return a curl command example to list all events for an issue. 
         Asks the user if he wants it to execute thecurl command. 
    [S3] Bot will list all the events related to the issue "123" and repository "XYZ".
</code></pre>

### Use Case 4: Example to Delete a Repository

<pre><code>
 1. Preconditions
    User must have GitHub API token in system
 2. Main Flow
    User will request an example to delete a repository with name "XYZ"
 3. Subflows
    [S1] User provides repository name.
    [S2] Bot will return a curl command example to delete a repository. 
         Asks the user if he wants it to execute the curlcommand. 
    [S3] Bot will delete the repository with name "XYZ"
</code></pre>

## Design Sketches

### Storyboard

![](/Storyboard1.png)
![](/Storyboard2.png)

### Wireframe 1: Create a repo

<img src="Wireframe1.gif" align="center">

### Wireframe 2: Edit an issue

<img src="Wireframe2.gif" align="center">

## Architecture Design

### Architecture Design Diagram



![Architecture Diagram](/ArchitectureDiagram.png)

![BOTEngine](/BOTEngine.png)


### Architecture Components

We will be using Slack Server to deploy the GitHubYodaBot. The main components of our GitHubYodaBot architectureare as follows:

**1.Slack:** Slack user interface is a platform where the user interacts with the chat bot. User can input the commands in a natural conversational language.

**2.GitHub Documentation:** We will use GitHub Documentation for the examples. Available GitHub endpoints and relevant parameters are freely available on the documentation. Our Bot will make use of the GitHub Documentation in order to help users with customized API requests. The documentation is filled with generic request examples for all endpoints as well.

**3.Web Crawler:** We will be using a web crawler that will systematically browse the GitHub documentation. The job of our crawler is to check for the freshness of the data in database and update it accordingly. 

**4.Bot Engine:** Bot Engine is an intelligent engine that interprets user inputs and interacts with the database as well as the web crawler to get the required response and sends the response to the user.

**5.Database:** This database is a document based database consisting of all the generic examples that the bot will send as a response to user requests. Also, this database will be populated with the results obtained from the Web Crawler.

### Guideline

### Constraints

### Design Pattern

## Additional Patterns
