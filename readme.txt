# Youth survey

#initial heroku deployment
npm install -g create-react-app
create-react-app my-app
cd my-app
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "v1"
git push heroku master
heroku open

# update to heroku deployment

git add .
git commmit -m "v2"
git push heroku master
heroku open
