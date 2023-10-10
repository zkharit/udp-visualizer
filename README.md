# udp-visualizer
A web application that imitates flanker applications to demonstrate traffic flowing through a data diode.

## Description
udp-visualizer is intended to be run on 2 separate systems a source side and a destination side with a data diode in-bnetween the two, although it will work on any system(s) that can comminicate with each other and have access to send/receive traffic to/from the ip address/ports that are specified. A diagram of the intended usage is as follows:

![udp-visualizer-system](https://github.com/zkharit/udp-visualizer/assets/43216427/d8d97ab2-1927-4d05-a27c-2fb26b241386)

udp-visualizer constists of 2 applications, front-end and back-end, each with a source and destination component. The front-end contains a web interface for the user to send (source) custom text as udp traffic to a specified ip address/port. The front-end also provides an interface for initiating receiving (destination) for udp traffic on a specified port. The back-end sets up a web server that listens for http requests from the front-end. The requets can send (source) udp traffic to a specified ip address/port or open a udp socket to receive (destination) udp traffic on a specified port. A diagram of the components of udp-visualizer is as follows:



## Usage
These instructions will inform you how to start the two applications in development mode which will give the developer the ability to make changes to the application, save, and then view the changes in real time through hot-reloading without having to restart either application. Instructions for production mode coming soon!
The following environment variables need to be configured. The default values found in the .env files within each respective component (front-end/back-end) should suffice.

| environment variable name  | default values | description |
| ------------- | ------------- | ------------- |
| UDP_VISUALIZER_BACKEND_PORT  | 3001  | Denotes what port the web server should lsiten to http requests from the front-end on |
| REACT_APP_UDP_VISUALIZER_BACKEND_HOST  | localhost  | Denotes the hostname of the back-end server the front-end should send http requests to |
| REACT_APP_UDP_VISUALIZER_BACKEND_PORT | 3001 | Denotes the port of the back-end server the front-end should send http requests to |

### back-end
To start the back-end in development mode run the following commands:

- `cd back-end`
- `npm run dev`

### front-end
To tart the front-end in developmeent mode run the following commands:

- `cd front-end`
- `npm start`

## Gallery


