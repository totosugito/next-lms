## LMS Platform

This repository contains a faithful copy and enhancement of the LMS platform created by CodeWithAntonio in the tutorial Learn Next & React and get Hired!: https://www.youtube.com/watch?v=Big_aFLmekI.

**Key Features:**
* Browse and filter courses
* Purchase courses using Stripe
* Mark chapters as completed or uncompleted
* Progress calculation of each course
* Student dashboard
* Teacher mode
* Create new courses
* Create new chapters
* Easily reorder chapter position with drag and drop
* Upload thumbnails, attachments, and videos using UploadThing
* Video processing using Mux
* HLS Video player using Mux
* Rich text editor for chapter description
* Authentication using Clerk
* ORM using Prisma
* MySQL database using Planetscale

**Enhancements:**

* Added a search function to the courses page
* Improved the user interface of the student and teacher dashboards

**Planned Enhancement:**
Integrate Elliot Chong's Quizmify into this.

**Requirements :**
1. Mux https://mux.com - for Videos storage.
2. Clerk https://clerk.com for authentication 
3. UploadThing https://uploadthing.com/ for serverless upload storage.

### DOCKER DATABASE
**Create mongodb docker**
Please check this link [https://dev.to](https://dev.to/renzhamin/setup-mongodb-replica-set-locally-in-docker-or-with-atlas-for-prisma-orm-54gp)

Copy docker image
```
docker pull prismagraphql/mongo-single-replica:5.0.3
```
Create the docker container
```
docker run --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME="monty" -e MONGO_INITDB_ROOT_PASSWORD="pass" -d prismagraphql/mongo-single-replica:5.0.3
```
add to the *.env* file
```
DATABASE_URL="mongodb://admin:admin@localhost:27019/next-lms?authSource=admin&directConnection=true"
```

### INIT DATABASE
**Init the database**
```
npm run postinstall
node scripts/seed.ts
```
**To reset the database**
```
npx prisma migrate reset
npx prisma db push
```