<h1>Example Bot</h1> 

#### This is a Slack based Chat-bot developed as a project requirement for the coursework of 'CSC-510' under the guidance of Professor Dr. Christopher Parnin.

## Team Info

 Team Members:
1. Abhilasha Lokannavar; alokann@ncsu.edu 
2. Ankit Mody; amody@ncsu.edu 
3. Juhi Madhwani; jhmadhwa@ncsu.edu 
4. Sourabh Sandanshi; ssandan@ncsu.edu 

## Important Links
* Milestone 1: [DESIGN](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/DESIGN.md) 
* Milestone 2: [BOT](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/BOT.md) 
* Milestone 3: [PROCESS](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/PROCESS.md) 
* Milestone 4: [DEPLOY](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/DEPLOY.md) 
* Milestone 5: [REPORT](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/REPORT.md)

## Project Presentation
[Screencast](https://drive.google.com/file/d/1qydGR8Ud_nOV2_7krKXkIE9X32Gtf9lS/view)

# REPORT

## 1. The problem your bot solved

GitHub has provided an amazing interface for developers who want to develop applications targeting GitHub, known as GitHub REST API. For instance, we can build an application with better functionalities and presentation layer on top of the API. To access GitHub API, it provides various endpoints to carry out specific tasks. But for a beginner, the whole process could be quite overwhelming and involves going through the GitHub documentation a number of times before he could successfully develop his application. Imagine the level of convenience and swiftness the developer would experience, if the user could interact with a chat bot to get the customized example based on user inputs instead of spending valuable time searching for the relevant information from the documentation. On accessing the documentation and online resources, user always gets generic examples which he needs to modify as per his requirements. Even on getting the correct required example, user has to spend more time in learning how to use it to achieve his goal. We plan to save developers the hassle of referring the GitHub documentation or other online resources to seek help on accessing endpoints with the help of our GitHubYodaBot.

## How does bot solve the problem?

The bot will provide a platform for users to get customized examples which will populate fields in API requests based on user inputs, without going through the trouble of looking back and forth in the GitHub documentation. 

The bot will provide curl commands to the user which he can execute on his terminal. The bot will also give an option to execute the command on his behalf. In this way, it not only provides developers a quick way to find the examples but also gives an up-to-date API request example in case GitHub updates the API endpoints. Thus, the bot would save a lot of time of developers to search for the correct content and reduces significant development time. The bot would be embedded on Slack which is used by majority of the developers and will make it easy for them to communicate with the bot. Also, deploying the bot on Slack can help multiple developers use the bot to carry out different functionalities. The bot in this scenario not only helps to get the correct answers for the developers but also allows ease of usage. We plan to cover all endpoints offered by GitHub APIs.

## 2. Primary Features

The bot has three main features:
1. Gives examples on how to use GitHub API endpoints. 
2. Gives a customized example endpoint based on user inputs in the form of a curl command. 
3. Provides an option to execute the curl command.

## Screenshots

# Screenshot-1
![Task 1](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/Screenshots/Report_Task1.png)

# Screenshot-2
![Task 2](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/Screenshots/Report_Task2.png)

# Screenshot-3
![Task 3](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/Screenshots/Report_Task3.png)

# Screenshot-4
![Task 4](https://github.ncsu.edu/csc510-fall2019/CSC510-17/blob/master/Screenshots/Report_Task4.png)

## 3. Our reflection on the bot development process 

For the course requirement of Software Engineering, we needed to build a chat bot to address a Software Engineering issue. During this project, we got to learn many new tools and technologies along with improving our Software Engineering skills (Requirement Gathering, Design, Development, Testing and Deployment). Slack is a tool that is becoming immpensely popular in Tech companies to communicate and share media which motivated us to create our bot on Slack platform. GitHub is another popular platform that allows software development using version control and git along with its own features. This platform is used by almost all Tech companies today to colborately work on a product which is why it is very important to learn how to make the most of this platform. Thus, we chose the GitHub API to provide examples on how to use this API and its enpoints using our bot.

The project was divided into various milestones starting from design which included the identification of a software engineering problem and its possible solution by developing a slack bot application. After initially brainstorming sessions and discussions with professor,  we decided to build Slack based interactive conversational bot which simplifies our job of learning an API with the help of examples provided by our bot and also a provision to use and execute that example directly to achieve some functionality.

#### Milestone 1 (DESIGN): 
We first described the problem statement for our bot along with the architecture design and the internal working  that we were planning to use for the development process. The most challenging task was to decide what kind of design pattern can be utilized for this project as the bot was going to be developed following that pattern. We chose Pipe and Filter Architecture pattern for our bot since our data flows from GitHub Documentation to Slack via Database and several components work in between and simulate stream processing of data which made this pattern the most suitable one. After this, we decided the technology stack which will allow us to implement our bot features and make it a working bot.

During this phase of the milestone, we learnt how to approach and solve a problem when you first encounter it and it involved learning of various Software Engineering phases namely requirement gathering for designing a bot, understanding the problem statement and coming up with design patterns for the development of the bot.

#### Milestone 2 (IMPLEMENTATION): 
To achieve the goals for this milestone, we came up with the implementation logic for bot where we used Nodejs for writing the business logic of the application and created mock json file to render mock data consisting of possible user inputs. To store the data in our database, we created a web scraper that scrapes the GitHub API pages and creates key-value pairs.

#### Milestone 3 (PROCESS): 
This phase of bot required us to learn how to plan and collaborate people in a team and work while managing tasks and delegate them according to their skills and work load in order to achieve our project goals on scheduled time. We divided our software development process in different sprints, each one having a partivular goal to be achieved. At the beginning of first sprint, we divided our use cases into stories with their points (the amount of time that will be required to complete that story) after which these stories were further divided into tasks. We decided the sprint for each task (sprint 1, sprint 2, etc.) and created a Kanban board with tasks and their corresponding status. We also assigned the responsible team member for each task. Then we maintained their progress, and marked them done as they were completing. This phase allowed us to learn the most famous Agile Software Development process called Scrumban.

#### Milestone 4 (DEPLOYMENT):
For deployment of the bot created, we used Ansible playbooks which automatically deployes the backend of our bot to AWS EC2 console by creating EC2 instances and also put the bot on Slack app such that anyone can intergrate the bot easily.

For all four of us, it was great journey with lots of opportunities to learn during each of the milestones of project. Throughout this project, we made use of agile methodology to understand the requirement at early stages and frequent meetings helped us in reducing the errors and defects which might have impacted the project milestones at later stages. Apart from that, we used pair programming during the coding phase of our project which was a successful experiment since it helped us in improving the quality of the code and eleiminating the bugs/defects which might have got neglected had there been only one developer working on that task. It also helped us in identifying the strong and weak points of the team members that made us easy to rotate the work after every milestone. We also had an opportunity to rotate roles and experience a developments process in every perspective.

## 4.  Limitations and future work

1. In our current implementation of bot, only ine GitHub account can be created among all the team members for working with GitHub as we are not creating as well as storing the tokens for individual users.
2. The above limitation can be considered for future extension by designing a Token Manager that stores and manages token for every user so that they can work on their individual GitHub accounts.
3. After execution of curl command in our current implementation, we are just displaying the user about success or failure of the execution. We can extend this by displaying the logs in proper format about how are the things working after running curl command.
4. Curl command seems to be a good option to build customized example for users to run it. But we can also make use of builder pattern and generate the user request from their inputs.
5. Currently, the user messages are extracted using the regular expressions and then the necessary actions are decided. In future, we can integrate the natural language processing apis like Wit.ai to make our bot more robust.
