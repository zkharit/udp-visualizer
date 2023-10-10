# udp-visualizer
A web application that imitates flanker applications to demonstrate traffic flowing through a data diode.

## Description
udp-visualizer is intended to be run on 2 separate systems as two separate instances containing of a source side and a destination side with a data diode in-bnetween the two, although it will work on any system(s) that can comminicate with each other and have access to send/receive traffic to/from the ip address/ports that are specified. A diagram of the intended usage is as follows:

![udp-visualizer-system](https://github.com/zkharit/udp-visualizer/assets/43216427/d8d97ab2-1927-4d05-a27c-2fb26b241386)

udp-visualizer constists of 2 applications, front-end and back-end, each with a source and destination component. The front-end contains a web interface for the user to send (source) custom text as udp traffic to a specified ip address/port. The front-end also provides an interface for initiating receiving (destination) for udp traffic on a specified port. The back-end sets up a web server that listens for http requests from the front-end. The requets can send (source) udp traffic to a specified ip address/port or open a udp socket to receive (destination) udp traffic on a specified port. A diagram of the components of udp-visualizer is as follows:

![udp-visualizer-component](https://github.com/zkharit/udp-visualizer/assets/43216427/b29de03b-87f8-4aa7-8934-d4c135e973c2)

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
The configuration values and data used here are for example purposes.

The udp-visualizer homepage:
![image](https://github.com/zkharit/udp-visualizer/assets/43216427/def597ad-947a-44ce-a81a-ae98836c5426)

The udp-visualizer source configuration page:
![image](https://github.com/zkharit/udp-visualizer/assets/43216427/6bad0f0c-2e51-48fc-8d01-461a5c55d76e)

The udp-visualizer source send data page:
![image](https://github.com/zkharit/udp-visualizer/assets/43216427/f22c1518-fc29-49b8-872c-ae5045ddfb76)

The udp-visualizer destination configuration page:
![image](https://github.com/zkharit/udp-visualizer/assets/43216427/3da78421-31b8-475a-82d8-a426dfd74b41)

The udp-visualizer destination receivie data page:
(before receiving data)
![image](https://github.com/zkharit/udp-visualizer/assets/43216427/b53a336d-5365-41b7-a3c0-8e67e6a9d540)
(after receiving data)
![image](https://github.com/zkharit/udp-visualizer/assets/43216427/5a44e208-d236-4bb3-87ec-9c135f8d9d74)



