# COV-APP-19

##TO START
You have to have pip and pipenv installed 
if you don't have pipenv installed read the tutorial [here](https://www.pythontutorial.net/python-basics/install-pipenv-windows/)

Once repo is cloned, navigate into folder then run the command 
`pipenv shell`

This should start a virtual environment (make sure you are navigated into the folder with the PipFile)

Install the dependencies with 
`pipenv install`

then 
`cd covidTracing`

### Before running the server
Need to do a couple things before running the server 

first run the command 
`python manage.py migrate`

then create a superuser 
`python manage.py createsuperuser`

It will then ask you for the credentials
- Email
- First name
- last name 
- password

Don't forget them as they are how to login to django admin :) 

then start start the server with 
`python manage.py runserver`

this should start the server on localhost:8000

**Currently there are no html pages, but if you are familiar with postman, you can send requests to the apis for register, login and to return the user. I can demonstrate this at our next meeting if I haven't added pages by then**
