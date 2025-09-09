# Kanalytics DVR Dashboard 📺

An internal dashboard built for monitoring DVR slot data in real time.  
This app was developed to save time for employees and managers by automating the manual process of checking whether slot data has been downloaded, its file size, and whether it is corrupted.

---

## 🚀 Features
- **Live File Monitoring**: Scans local DVR server every 5 minutes using Node + SMB2.  
- **Real-Time Updates**: WebSocket connection updates the dashboard instantly.  
- **Corrupted File Detection**: Quickly identify bad or incomplete slot files.  
- **Slot Overview**: Organized table view of all DVR slots (12 slots per day) with color-coded styling.  
- **User-Friendly Interface**: Built with React + TailwindCSS for modern, responsive UI.  
- **Decision Support**: Helps employees and managers make faster decisions with clear visibility.

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express, WebSockets  
- **Database:** MongoDB + Mongoose  
- **File Access:** SMB2 (for reading DVR server metadata)  

---

## 📸 Screenshots
_Add screenshots here after pushing your code._  
For example:
![Dashboard Screenshot](docs/dashboard-screenshot.png)

---
Notes :
This project was originally built for internal company use, but serves as a showcase of my ability to build full-stack apps with React, Node, and MongoDB.
It demonstrates real-world problem solving: automating a repetitive task, saving time for employees, and giving managers better visibility into data.
