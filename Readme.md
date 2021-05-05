
<h1 align="center"> SHEROES</h1>

<h2 align="center">Team #3</h2>

<p align= "center">
  <a href="https://github.com/underhood31">Manavjeet Singh</a>,
  <a href="https://github.com/navneet-ag">Navneet Agarwal</a>,
  <a href="https://github.com/itissandeep98">Sandeep Kumar Singh</a>,
  <a href="https://github.com/sarthak144">Sarthak Arora</a>
</p>

# Usage

- Visit the website [here](https://sheroes.pages.dev).
- Login/Register into the portal.
- Once you register you also get a notification via email.
- You can ask an admin to make you a form creator.
- Now, you can view all the previous forms and have the option to create new form.
- Clicking on any of the old forms or clicking on the option to create a new form lands the user on the form editing page.
- On the form editing page, you have the following options:
  - Add/update banner to the form.
  - Change form name and description.
  - Add/modify/delete sections.
  - Add/modify/delete questions to different sections.
  - Change or Toggle Consent form.
  - Toggle accepting response.
  - Delete Form
  - Preview Form
  - Copy Preview Link
  - View Responses

# Deployment

## Frontend <https://sheroes.pages.dev/>

- URL of the website needs to be updated in ```src/Store/URl.js``` file as well as in ```package.json```
- Run ```npm run build``` to create the build folder
- This build folder can then be deployed on any static hosting website

## Backend: <https://sheroes-form.herokuapp.com/>

# Development

## Frontend

```
- cd frontend/
- npm install
- npm run start
```

## Backend
Please make sure you have a Sendgrid account and have obtained SENDGRID_API_KEY from them.
You also need to update the sender email in post function of class RegisterAPI in ./backend/accounts/views.py

```
- cd backend/
- pipenv shell
- pipenv install
- echo "export SENDGRID_API_KEY=<Your send grid key>" > sendgrid.env
- source ./sendgrid.env
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver
```

# Documentation

- Frontend: <https://sheroes-docs.netlify.app/>
- Backend: https://sheroes-form.herokuapp.com/admin/doc/

# Glimpses
![image](https://user-images.githubusercontent.com/44255731/115881844-ca733000-a469-11eb-88c3-d0e65b41416b.png)

![image](https://user-images.githubusercontent.com/44255731/115882057-027a7300-a46a-11eb-8801-13523cda87b8.png)

![image](https://user-images.githubusercontent.com/44255731/115882200-2a69d680-a46a-11eb-90e7-3746fe00f201.png)

![image](https://user-images.githubusercontent.com/44255731/115882479-69982780-a46a-11eb-8f66-7a62f662bfac.png)
