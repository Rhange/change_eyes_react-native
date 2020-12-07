# React-Native Camera App v1

### Error Report
#### 1.
**npm start 시작시에 아래와 같은 에러가 뜨면** 
- Error: ENOSPC: System limit for number of file watchers reached, 

**콘솔에 다음과 같은 명령어 입력.**
- echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
