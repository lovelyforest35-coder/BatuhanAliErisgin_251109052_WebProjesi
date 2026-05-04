Online Kurs / Eğitim Platformu Web Projesi

Bu proje, Web Programlama dersi kapsamında geliştirilmiş dinamik bir eğitim platformudur. Backend tarafında Node.js (Express), veritabanı olarak MySQL kullanılmıştır. Projede kullanıcı giriş/kayıt sistemi, yetkilendirme (session), CRUD işlemleri ve özel CSS/HTML yapısı bulunmaktadır.

Geliştirici Bilgileri
Adı Soyadı:** Batuhan Ali Erişgin
Öğrenci Numarası: 251109052

Proje Kurulumu ve Çalıştırılması

Projeyi bilgisayarınızda yerel ortamda (localhost) çalıştırmak için aşağıdaki adımları sırasıyla takip ediniz:

1. Gereksinimler
* Bilgisayarınızda Node.js yüklü olmalıdır.
* Bilgisayarınızda MySQL veritabanı sunucusu çalışır durumda olmalıdır (XAMPP, WAMP veya bağımsız MySQL kurulumu kullanılabilir).

2. Veritabanının Kurulumu
1. MySQL yönetim aracınızı açın.
2. Proje dosyaları içerisinde bulunan `veritabani.sql` dosyasının içindeki SQL kodlarını kopyalayın ve çalıştırın.
3. Bu işlem sonucunda `egitim_db` adında bir veritabanı ve `251109052` ön ekine sahip ilgili tablolar (kullanıcılar, kurslar, kategoriler) örnek verileriyle birlikte oluşturulacaktır.

3. Veritabanı Bağlantı Ayarları
1. Proje dizinindeki `server.js` dosyasını bir kod editörü ile açın.
2. `mysql.createConnection` bloğundaki `user` (kullanıcı adı) ve `password` (şifre) alanlarını, kendi yerel MySQL sunucu bilgilerinize göre güncelleyin.

4. Gerekli Node.js Modüllerinin Yüklenmesi
Projenin kök dizininde (server.js dosyasının bulunduğu yerde) terminal veya komut istemcisini açıp aşağıdaki komutu çalıştırarak gerekli paketleri indirin:

bash

npm install
