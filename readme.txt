Для отправки файлов с фронтенда нужно в тег <form> прописать атрибут enctype="multipart/form-data", а в тег <input> добавить атрибут type="file", если нужно передать несколько файлов добавляем атрибут multiple.

<form action="" id="register" enctype="multipart/form-data">
  <input type="file" multiple>
<form>