# Web-CNSS

In this project, our objective is to convert and develop CNSS, a simulator created by Professor José Legatheaux Martins, into a web application. Usually, these network simulators are implemented in a desktop application since some of them are complex and need some computational power. For this reason, the existence of a simple network simulator implemented in a web application is almost null. The existence of this network web simulator will be highly useful in a teaching and learning context since professors can quickly prepare some sketches and demonstrate them, but students can also use and try the simulator in the same class without the need for any previous installation or setup.

In short, to implement this idea, since CNSS is implemented in Java, we need to choose a tool that allows us to convert Java bytecode to Javascript so it can run entirely on a browser without the need for an external server. Our main idea is to implement a simple but robust notebook interface where anyone can change the CNSS source code and try it, since it is the best development environment for an integrated solution. Also, to upgrade CNSS even more, we are going to enhance the textual output of the simulations by using graphs or statistics, but we are also going to develop a collaborative environment where every user can share and see real-time modifications made by a professor or colleague.

# How To Deploy Web-CNSS

This section is a ’tutorial’ on how to deploy and run the Docker container of Web-CNSS,
and as we have seen in the last section, we built a docker-compose to ease this process. So
here are the steps to do this:
• Download Docker - ’https://www.docker.com/get-started/’
• Clone the git repository of our application - Git Repository
• Run ’docker-compose up’
The application is hosted on port 3000, so you can access it by using this URL: http://localhost:3000/.

## Authors
- [Student João Vale]
- [Professor Sérgio Duarte]
