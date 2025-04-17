import cv2

cam = cv2.VideoCapture(0)
cv2.namedWindow("Sistema de Vigilancia")

img_counter = 0

while True:
    ret,frame = cam.read()

    if not ret:
        print("Fallo en la conexión")
        break

    cv2.imshow("Cámara de Seguridad", frame)

    k = cv2.waitKey(1)

# Presione ESCAPE para salir
    if k%256 == 27:
        print("Cerrando aplicación")
        break

# Presione ESPACIO para tomar una captura
    elif k%256 == 32:
        img_name = "captura_{}.png".format(img_counter)
        cv2.imwrite(img_name,frame)
        print("Foto tomada")
        img_counter+=1

cam.release()

cv2.destroyAllWindows()
