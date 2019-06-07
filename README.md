# leaf-assignment
Assignment for Leaf Tech

Please use the following steps to start the application

* Clone the code
* Run 'npm install' to install all dependencies
* Install pm2 globally by runnning 'npm i pm2 -g'
* Before running the application please enter the MONGODB_URI,GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the ecosystem.config.js file in both dev and prod .
* Run the application using 'pm2 start ecosystem.config.js --env production'
* By default app runs on all cores to reduce the number of cores change the instances in ecosystem.confg.js file from  max to the number of cores required.
* The app runs on localhost:3000. After logging in with your Google ID please use the APIKEY provided and send the request from POSTMAN adding the Authorization header with value = APIKEY
* Use the POSTMAN collection as a reference.