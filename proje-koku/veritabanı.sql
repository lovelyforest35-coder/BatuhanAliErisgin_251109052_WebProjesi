CREATE DATABASE IF NOT EXISTS 251109052_egitim_platformu;
USE 251109052_egitim_platformu;

CREATE TABLE 251109052_kullanicilar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    b_kullanici_adi VARCHAR(50) NOT NULL UNIQUE,
    b_sifre VARCHAR(100) NOT NULL,
    b_rol VARCHAR(20) DEFAULT 'ogrenci'
);

CREATE TABLE 251109052_kurslar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    b_kurs_adi VARCHAR(100) NOT NULL,
    b_egitmen VARCHAR(50) NOT NULL,
    b_fiyat DECIMAL(10,2) NOT NULL,
    b_ekleyen_id INT DEFAULT 1,
    FOREIGN KEY (b_ekleyen_id) REFERENCES 251109052_kullanicilar(id) ON DELETE SET NULL
);

CREATE TABLE 251109052_mesajlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    b_ad_soyad VARCHAR(50) NOT NULL,
    b_eposta VARCHAR(50) NOT NULL,
    b_konu_alani VARCHAR(50) NOT NULL,
    b_mesaj_metni TEXT NOT NULL,
    b_abone_durumu VARCHAR(10) NOT NULL
);

INSERT INTO 251109052_kullanicilar (b_kullanici_adi, b_sifre, b_rol) VALUES 
('admin', 'admin123', 'admin'),
('ahmet', 'ahmet123', 'ogrenci');

INSERT INTO 251109052_kurslar (b_kurs_adi, b_egitmen, b_fiyat, b_ekleyen_id) VALUES 
('Sıfırdan Node.js Eğitimi', 'Batuhan Ali Erişgin', 450.00, 1),
('Komple Web Geliştirme', 'Eser Rüzgar Altunok', 600.00, 1),
('MySQL Veritabanı Yönetimi', 'Taha Yağız', 350.00, 1);
