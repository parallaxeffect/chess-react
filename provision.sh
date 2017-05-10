apt-get update
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_6.x | sh
apt-get install -y nodejs
	
mkdir node_modules
cd /vagrant
ln -nsf /home/vagrant/node_modules node_modules
	

npm install

npm i -g webpack
npm i -g babel-cli
	
webpack
babel-node app.js
