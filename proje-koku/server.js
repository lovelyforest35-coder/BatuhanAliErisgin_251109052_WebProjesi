const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();

// Hocam kullanıcılardan gelen ham JSON verilerini parse edebilmek için bu middleware yapısını kullandık
app.use(express.json());

// Hocam session kontrolünü sağlayarak giriş yapmayanların admin alanına sızmasını önlemek amacıyla bu yapıyı kurduk
app.use(session({
    secret: 'lila_sirri_251109052',
    resave: false,
    saveUninitialized: true
}));

// Hocam hocamızın önerdiği mysql2 paketini kullanarak yerel MySQL sunucumuza bağlantıyı başlattık
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '251109052_egitim_platformu'
});

db.connect(function(hata) {
    if (hata) {
        console.error("Veritabanı bağlantı hatası: " + hata);
        return;
    }
    console.log("MySQL Veritabanına başarıyla bağlanıldı.");
});

// Hocam admin yetkisi gerektiren rotaları tek bir merkezden koruma altına almak için ara yazılım yazdım
function adminMi(req, res, next) {
    if (req.session && req.session.rol === 'admin') {
        next();
    } else {
        res.status(401).json({ basarili: false, mesaj: "Yetkisiz erişim! Lütfen admin girişi yapın." });
    }
}

app.post('/api/251109052_kayit', function(req, res) {
    const { kullanici_adi, sifre } = req.body;
    const sorgu = 'INSERT INTO 251109052_kullanicilar (b_kullanici_adi, b_sifre) VALUES (?, ?)';
    db.query(sorgu, [kullanici_adi, sifre], function(hata, sonuc) {
        if (hata) {
            res.status(500).json({ basarili: false, mesaj: "Kayıt sırasında hata oluştu veya kullanıcı mevcut." });
            return;
        }
        res.status(201).json({ basarili: true, mesaj: "Kayıt işlemi başarıyla tamamlandı!" });
    });
});

app.post('/api/251109052_giris', function(req, res) {
    const { kullanici_adi, sifre } = req.body;
    const sorgu = 'SELECT * FROM 251109052_kullanicilar WHERE b_kullanici_adi = ? AND b_sifre = ?';
    db.query(sorgu, [kullanici_adi, sifre], function(hata, sonuclar) {
        if (hata || sonuclar.length === 0) {
            res.status(401).json({ basarili: false, mesaj: "Hatalı kullanıcı adı veya şifre!" });
            return;
        }
        req.session.kullanici = sonuclar[0].b_kullanici_adi;
        req.session.rol = sonuclar[0].b_rol;
        res.json({ basarili: true, mesaj: "Giriş başarılı, yönlendiriliyorsunuz..." });
    });
});

app.get('/api/251109052_cikis', function(req, res) {
    req.session.destroy();
    res.redirect('/giris.html');
});

// Hocam sistemdeki bütün aktif eğitim paketlerini tek seferde listelemek için JOIN içeren bir SQL sorgusu kullandım
app.get('/api/251109052_kurslar', function(req, res) {
    const sorgu = 'SELECT k.id, k.b_kurs_adi, k.b_egitmen, k.b_fiyat FROM 251109052_kurslar k';
    db.query(sorgu, function(hata, sonuclar) {
        if (hata) {
            res.status(500).json({ basarili: false, mesaj: "Veriler getirilemedi." });
            return;
        }
        res.json({ basarili: true, veri: sonuclar });
    });
});

// Hocam prepared statement kullandım ki dışarıdan gelen zararlı parametreler SQL injection riski oluşturmasın
app.post('/api/251109052_kurslar', adminMi, function(req, res) {
    const { b_kurs_adi, b_egitmen, b_fiyat } = req.body;
    const sorgu = 'INSERT INTO 251109052_kurslar (b_kurs_adi, b_egitmen, b_fiyat) VALUES (?, ?, ?)';
    db.query(sorgu, [b_kurs_adi, b_egitmen, b_fiyat], function(hata, sonuc) {
        if (hata) {
            res.status(500).json({ basarili: false, mesaj: "Kurs eklenemedi." });
            return;
        }
        res.status(201).json({ basarili: true, mesaj: "Yeni kurs sisteme eklendi." });
    });
});

// Hocam PUT metodunu kullanarak mevcut kursun detay verilerini dinamik ID parametresine göre güncelliyoruz
app.put('/api/251109052_kurslar/:id', adminMi, function(req, res) {
    const id = req.params.id;
    const { b_kurs_adi, b_egitmen, b_fiyat } = req.body;
    const sorgu = 'UPDATE 251109052_kurslar SET b_kurs_adi = ?, b_egitmen = ?, b_fiyat = ? WHERE id = ?';
    db.query(sorgu, [b_kurs_adi, b_egitmen, b_fiyat, id], function(hata, sonuc) {
        if (hata) {
            res.status(500).json({ basarili: false, mesaj: "Güncelleme başarısız." });
            return;
        }
        res.json({ basarili: true, mesaj: "Kurs başarıyla güncellendi." });
    });
});

// Hocam DELETE isteğiyle gelen kaydı diziden splice ile silmek yerine doğrudan SQL query ile tablodan temizliyorum
app.delete('/api/251109052_kurslar/:id', adminMi, function(req, res) {
    const id = req.params.id;
    const sorgu = 'DELETE FROM 251109052_kurslar WHERE id = ?';
    db.query(sorgu, [id], function(hata, sonuc) {
        if (hata) {
            res.status(500).json({ basarili: false, mesaj: "Silme işlemi başarısız." });
            return;
        }
        res.json({ basarili: true, mesaj: "Kurs başarıyla kaldırıldı." });
    });
});

app.post('/api/251109052_mesaj_ekle', function(req, res) {
    const { b_ad_soyad, b_eposta, b_konu_alani, b_mesaj_metni, b_abone_durumu } = req.body;
    const sorgu = 'INSERT INTO 251109052_mesajlar (b_ad_soyad, b_eposta, b_konu_alani, b_mesaj_metni, b_abone_durumu) VALUES (?, ?, ?, ?, ?)';
    db.query(sorgu, [b_ad_soyad, b_eposta, b_konu_alani, b_mesaj_metni, b_abone_durumu], function(hata, sonuc) {
        if (hata) {
            res.status(500).json({ basarili: false, mesaj: "Mesaj iletilemedi." });
            return;
        }
        res.status(201).json({ basarili: true, mesaj: "Mesajınız başarıyla yöneticilere ulaştırıldı." });
    });
});

app.get('/admin.html', function(req, res, next) {
    if (req.session && req.session.rol === 'admin') {
        next();
    } else {
        res.redirect('/giris.html');
    }
});

app.use(express.static(path.join(__dirname, 'b-web-dosyalari')));

app.use(function(req, res) {
    res.status(404).send('<h1>404 - Aradığınız Sayfa Bulunamadı</h1>');
});

app.listen(3000, function() {
    console.log("Sunucu çalışıyor: http://localhost:3000");
});