# Proje Çalıştırma Kılavuzu (Beni Oku)

Bu dosyada, projenin yerel bilgisayarda nasıl kurulup çalıştırılacağını adım adım açıkladım hocam. Projede hocamızın önerdiği Node.js (Express) ve MySQL (mysql2 paketi) altyapısı kullanılmıştır. Tablolar arası ilişkiler ve yönetim ekranları MySQL Workbench üzerinden de kontrol edilebilmektedir.

---

## 1. Gerekli Programların Kurulması

Sistemi açmadan önce bilgisayarınızda şu yazılımların hazır bulunması gerekir:
*   **Node.js:** Projenin arka plan servislerini yürütmek için. (Kendi sitesinden indirip kurabilirsiniz).
*   **MySQL Server & MySQL Workbench:** Veritabanı tablolarını barındırmak ve görsel olarak incelemek için.

---

## 2. Veritabanının Workbench ile Hazırlanması

1.  **MySQL Workbench** programını açın ve yerel bağlantınıza (`Local Instance`) çift tıklayarak giriş yapın.
2.  Yukarıdaki menü araçlarından yeni bir SQL sekmesi açın (`Create a new SQL tab`).
3.  Proje klasöründe yer alan `veritabanı.sql` dosyasının içindeki kod satırlarının tamamını seçip bu sekmeye yapıştırın.
4.  Yukarıdaki **Şimşek (Execute)** butonuna basarak sorguları çalıştırın. Sol taraftaki *Schemas* kısmına `251109052_egitim_platformu` veritabanı ve 3 adet ilişkili tablo gelecektir.

---

## 3. Projenin VS Code ile Açılması ve Çalıştırılması

1.  **VS Code** programını açın.
2.  Sol üstteki menüden **File -> Open Folder...** (Klasör Aç) seçeneğine tıklayın.
3.  Proje klasörünüzü (içinde `server.js` ve `b-web-dosyalari` olan klasörü) seçip **Klasörü Seç** butonuna basın. Proje dosyaları sol tarafa gelecektir.
4.  Üstteki menüden **Terminal -> New Terminal** seçeneğine tıklayın (Ekranın altında siyah bir komut satırı penceresi açılacaktır).
5.  Açılan o alt pencereye şu kodu yapıştırıp klavyeden **Enter** tuşuna basın:
6.  
    npm install express express-session mysql2


Kurulum bittikten sonra projeyi başlatmak için yine aynı yere (terminal) aşşağıdaki komutu yazabilirsiniz.
1. node server.js


Alt tarafta `"MySQL Veritabanına başarıyla bağlanıldı."` ve `"Sunucu çalışıyor: http://localhost:3000"` yazılarını gördüyseniz sistem tıkır tıkır çalışıyor demektir!

---

## 4. Web Arayüzüne Giriş Yapılması

Sistem arka planda aktif durumdayken herhangi bir internet tarayıcısını açıp şu adresleri ziyaret edebilirsiniz:

*   **Ana Giriş Ekranı (Form Alanlı):** `http://localhost:3000`
*   **Kurs Müfredat Listesi:** `http://localhost:3000/icerik.html`
*   **Giriş ve Kayıt Sayfası:** `http://localhost:3000/giris.html`
*   **Yönetici (Admin) Paneli:** `http://localhost:3000/admin.html`

> **Giriş Notu:** Yönetim paneline erişmek için `giris.html` sayfasından sisteme tanımlı olan kullanıcı adı: `admin`, şifre: `admin123` bilgileriyle giriş yapılması zorunludur. Aksi takdirde session kontrolü devreye girerek geçişe izin vermeyecektir.
