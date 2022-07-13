App for extracting text from images from the Internet.

Container usage:
1) Clone github.com/romulorm/image-to-ocr repository
2) Enter created project directory in terminal
3) Build image container: docker build -t localhost/image-to-ocr .
4) Run image container: docker run -d -p 3000:3000 localhost/image-to-ocr
5) Navigate to http://localhost:3000 in your Internet browser