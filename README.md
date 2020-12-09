# nkw-frontend

A React/Redux application that lets users create and share classified ads for sales. Users can also set postings as favorites, so they can find them later easily.
This is the front-end portion of the application. In order for it to work, it needs to be connected to a backend.

## Backend repository
You can find the repository for the backend server software for this application [HERE](https://github.com/ivanid22/nkw-backend)

![index](./capture-1.PNG)

![detail](./capture-2.PNG)

## Live version

- [Live version](https://nkw-frontend.netlify.app/)
  
## Running the app locally
You can always run the app through the live version linked on a previous section. But if you'd like to run it locally, follow the instructions below:

### Getting the files
First, you need to have the files on your computer. You can get them by either cloning this repository, or downloading its contents directly

To clone the repository, go on the project's Github page, click on "Clone or download", copy the contents of the text box, and then run git clone "repo" on the command line, where "repo" is the text you just copied.
If you want to download it directly instead, go on the project's Github page, click on "Clone or download", and then on "Download ZIP". After this, you need to extract the contents of the zip file on your computer.

### Installing dependencies
Now you need to open a terminal and navigate to the project's directory. Once there, run the command `npm install`. This is going to fetch and install all the dependencies for the app.

### Environment variables
The application requires an environment variable to be set at build time:

- REACT_APP_API_URL=(url to the application backend)

You can either initialize this environment variable manually by using the `export` command in your command-line:

- `export REACT_APP_API_URL=(url to the application backend)`

Or you can create a `.env` file in the base folder of the application, with the following content:

REACT_APP_API_URL=(url to the application backend)

### Running the app
Once that's done, run the command `npm start`. That should open a new browser window with the app. If the browser does not open, do it manually, paste this on the url box: localhost:3000, and press enter.

### Getting a local backend server running
Refer to [this repository](https://github.com/ivanid22/nkw-backend) for instructions on how to get a local backend server for this application running.

## Built With
  - create-react-app
  - React
  - Redux

## Author

👤 **Ivan Diaz**

  - Github: [@ivanid22](https://github.com/ivanid22)
  - Twitter: [@ivanid22](https://twitter.com/ivanid22)
  - Linkedin: [Ivan Diaz](www.linkedin.com/in/ivanid22)


## 🤝 Contributing

  - Contributions, issues and feature requests are welcome!

  - Feel free to check the [issues page](./issues).

## Show your support

  - Give a ⭐️ if you like this project!
  