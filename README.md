# 🔐 Secure Chat ✨

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

> Uçtan uca şifreli mesajlaşma uygulaması

## 📋 Proje Hakkında

Secure Chat, mesajların uçtan uca şifrelendiği güvenli bir anlık mesajlaşma uygulamasıdır. Kullanıcılar kendi şifreleme anahtarlarını kullanarak yalnızca aynı anahtara sahip kişilerle güvenli şekilde iletişim kurabilirler.

## ✨ Özellikler

- 🔒 Uçtan uca şifreleme (CryptoJS/AES)
- 👥 Kullanıcı girişi ve çevrimiçi kullanıcı sayacı
- 💬 Gerçek zamanlı mesajlaşma
- 🔔 Kullanıcı giriş/çıkış bildirimleri
- 📱 Mobil uyumlu tasarım
- 🌐 Docker ile kolay dağıtım

## 🖼️ Ekran Görüntüleri

### Giriş Ekranı
![Login Screen](screenshots/login-screen.png)

### Sohbet Ekranı
![Chat Screen](screenshots/chat-screen.png)

## 🛠️ Teknolojiler

- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Gerçek Zamanlı İletişim**: Socket.IO
- **Şifreleme**: CryptoJS
- **Kapsayıcı**: Docker

## 🚀 Kurulum ve Çalıştırma

### Yerel Kurulum

```bash
# Depoyu klonlayın
git clone https://github.com/fastuptime/secure-chat.git
cd secure-chat

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm start
```

Uygulama http://localhost:80 adresinde çalışacaktır.

### Docker ile Kurulum

```bash
# Docker imajını oluşturun
docker build -t secure-chat .

# Konteyner çalıştırın
docker run -p 80:80 secure-chat
```

## 📖 Nasıl Kullanılır

1. Ana sayfada kullanıcı adı ve şifreleme anahtarınızı girin
2. Sohbet ekranına yönlendirileceksiniz
3. Aynı şifreleme anahtarına sahip diğer kullanıcılar ile güvenli şekilde mesajlaşın
4. Farklı anahtara sahip kişilerin mesajları şifreli kalacaktır

## 🔑 Güvenlik Bilgileri

- Tüm mesajlar istemci tarafında AES ile şifrelenir
- Şifreleme anahtarları sunucuda saklanmaz
- İletilen mesajlar şifreli formatta tutulur
- Sadece aynı şifreleme anahtarına sahip kullanıcılar mesajları görebilir

## 📝 Lisans

ISC Lisansı

---

⌨️ ile ❤️ tarafından yapıldı
