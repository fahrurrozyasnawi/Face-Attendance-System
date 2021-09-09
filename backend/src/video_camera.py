from datetime import datetime
#from app import courseid
import cv2
import face_recognition
import os
import numpy as np


class VideoCamera(object):
    #courseid=''
    def __init__(self):

        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    path = 'D:/TMJ 17/Tugas Akhir/Project/Face-Attendance-System/backend/src/mahasiswaImage'
    images = []

    classNames = []
    myList = os.listdir(path)
    # print(myList)
    for cl in myList:
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        classNames.append(os.path.splitext(cl)[0])
    print(classNames)

    def findEncodings(images):
        encodeList = []

        for img in images:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            encode = face_recognition.face_encodings(img)[0]
            encodeList.append(encode)
        return encodeList

    encodeListKnown = findEncodings(images)

    def get_frame(self):
        success, image = self.video.read()
        image=cv2.resize(image,None,fx=ds_factor,fy=ds_factor,interpolation=cv2.INTER_AREA)
        gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        face_rects=face_cascade.detectMultiScale(gray,1.3,5)

        imgS = cv2.resize(image, (0, 0), None, 0.25, 0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            matches = face_recognition.compare_faces(VideoCamera.encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(VideoCamera.encodeListKnown, encodeFace)
            print(faceDis)
            matchIndex = np.argmin(faceDis)

            if matches[matchIndex]:
                name = VideoCamera.classNames[matchIndex].upper()
                print(name)
                for (x,y,w,h) in face_rects:
                    cv2.rectangle(image,(x,y),(x+w,y+h),(0,255,0),2)
                    cv2.putText(image, name, (x + 6, (y+h) - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                    break
                markAttendance(name)
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

def markAttendance(name):
    #csv.DictWriter(result.csv, )
    global filename
    print(filename)
    with open('C:/xampp/htdocs/attendance/'+filename, 'r+') as f:
        dataList = f.readlines()
        nameList = []

        for line in dataList:
            entry = line.split(',')
            nameList.append(entry[0])
            print(nameList)
        if name not in nameList:
            now = datetime.now()
            dt = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dt}')