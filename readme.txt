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

# Local Dev setup
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install 8.9.4
npm install #Run this on root dir
####### TO DO
0. Crate the structure of json question and response storing
1. Show Survey question from json database (follow section 3 in udemy)
2. Admin Login (follow section 9 in udemy)
3. export json database to excel
4. Populate json database with surveys and questions
