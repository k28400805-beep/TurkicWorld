
/* =========================================================
   TÜRK TARİHİ ATLASI
   Ana uygulama, tarih veri tabanı ve strateji motoru
   ========================================================= */

"use strict";

/* =========================================================
   1. TÜRK DEVLETLERİ VERİ TABANI
   Tarihler yaklaşık kuruluş ve sona eriş tarihleridir.
   Tartışmalı dönemler tarihî notlarla değerlendirilmelidir.
   ========================================================= */

const STATES = [

  // İLK TÜRK DEVLETLERİ

  {
    id: "asya-hun",
    name: "Asya Hun Devleti",
    period: "ancient",
    start: -220,
    end: 216,
    date: "MÖ 220 – MS 216",
    founder: "Teoman",
    famous: "Mete Han",
    capital: "Ötüken",
    region: "Orta Asya",
    symbol: "𐰴",
    description: "Orta Asya'da güçlü bir siyasi birlik kuran ve Türk tarihinin erken dönemindeki önemli devletlerden biri kabul edilen Hun siyasi teşkilatı.",
    history: "Asya Hun Devleti, bozkır coğrafyasında güçlü bir siyasi teşkilat oluşturdu. Mete Han döneminde askerî ve siyasi gücü arttı. Çin ile ilişkiler, bozkır hâkimiyeti ve İpek Yolu üzerindeki mücadeleler devletin tarihinde önemli yer tuttu.",
    government: "Kağanlık",
    economy: "Hayvancılık, ticaret ve savaş ganimetleri",
    neighbors: "Han Hanedanı, çeşitli bozkır toplulukları",
    playable: true,
    money: 120,
    army: 85,
    stability: 75,
    economyValue: 65,
    color: "#b58a4a",
    map: { x: 65, y: 35 }
  },

  {
    id: "avrupa-hun",
    name: "Avrupa Hun Devleti",
    period: "ancient",
    start: 370,
    end: 469,
    date: "370 – 469",
    founder: "Balamir",
    famous: "Attila",
    capital: "Orta Avrupa'daki merkezler",
    region: "Orta ve Doğu Avrupa",
    symbol: "♜",
    description: "Avrupa'da etkili olmuş, Attila döneminde gücünün zirvesine ulaşmış Hun devleti.",
    history: "Avrupa Hunları, Kavimler Göçü sürecinde Avrupa'nın siyasi yapısını etkiledi. Attila döneminde Doğu ve Batı Roma ile önemli mücadeleler ve diplomatik ilişkiler yürütüldü.",
    government: "Kağanlık",
    economy: "Hayvancılık, ticaret ve vergi",
    neighbors: "Doğu Roma, Batı Roma, Germen toplulukları",
    playable: true,
    money: 100,
    army: 90,
    stability: 70,
    economyValue: 60,
    color: "#a76e54",
    map: { x: 46, y: 32 }
  },

  {
    id: "gokturk",
    name: "Göktürk Kağanlığı",
    period: "ancient",
    start: 552,
    end: 744,
    date: "552 – 744",
    founder: "Bumin Kağan",
    famous: "Bilge Kağan",
    capital: "Ötüken",
    region: "Orta Asya",
    symbol: "𐰜",
    description: "Türk adını devlet adı olarak kullanan ilk siyasi teşkilat.",
    history: "Göktürk Kağanlığı, Bumin Kağan tarafından kuruldu. İstemi Yabgu batı yönündeki ilişkilerde önemli rol oynadı. Orhun Yazıtları, Göktürk tarihinin en önemli yazılı kaynakları arasındadır.",
    government: "Kağanlık",
    economy: "Hayvancılık, demircilik ve İpek Yolu ticareti",
    neighbors: "Çin hanedanları, Sasani Devleti, Bizans",
    playable: true,
    money: 135,
    army: 90,
    stability: 80,
    economyValue: 75,
    color: "#4c8b9a",
    map: { x: 66, y: 38 }
  },

  {
    id: "ikinci-gokturk",
    name: "II. Göktürk Kağanlığı",
    period: "ancient",
    start: 682,
    end: 744,
    date: "682 – 744",
    founder: "Kutluk Kağan",
    famous: "Bilge Kağan",
    capital: "Ötüken",
    region: "Orta Asya",
    symbol: "𐱅",
    description: "Göktürk siyasi birliğini yeniden kuran ikinci dönem kağanlığı.",
    history: "Kutluk Kağan, Çin hâkimiyetine karşı mücadele ederek bağımsızlığı yeniden sağladı. Tonyukuk, Bilge Kağan ve Kül Tigin dönemin öne çıkan isimleridir.",
    government: "Kağanlık",
    economy: "Hayvancılık ve ticaret",
    neighbors: "Tang Hanedanı, Uygurlar",
    playable: true,
    money: 100,
    army: 85,
    stability: 75,
    economyValue: 65,
    color: "#4c8b9a",
    map: { x: 66, y: 38 }
  },

  {
    id: "uygur",
    name: "Uygur Kağanlığı",
    period: "ancient",
    start: 744,
    end: 840,
    date: "744 – 840",
    founder: "Kutluk Bilge Kül Kağan",
    famous: "Moyun Çor",
    capital: "Ordu-Balık",
    region: "Moğolistan ve Orta Asya",
    symbol: "𐰇",
    description: "Yerleşik hayat, şehirleşme, ticaret ve kültür alanlarında önemli gelişmeler gösteren Türk devleti.",
    history: "Uygurlar döneminde şehirleşme, yazı, sanat ve ticaret gelişti. Maniheizm devletin kültürel hayatını etkiledi. 840 yılında Kırgız saldırısı sonucunda kağanlık sona erdi.",
    government: "Kağanlık",
    economy: "Tarım, hayvancılık, el sanatları ve ticaret",
    neighbors: "Kırgızlar, Tang Hanedanı",
    playable: true,
    money: 145,
    army: 65,
    stability: 80,
    economyValue: 90,
    color: "#b28b53",
    map: { x: 68, y: 39 }
  },

  {
    id: "hazar",
    name: "Hazar Kağanlığı",
    period: "ancient",
    start: 650,
    end: 969,
    date: "7. – 10. yüzyıllar",
    founder: "Hazar hanedanı",
    famous: "Bulan Kağan",
    capital: "İtil",
    region: "Hazar Denizi çevresi",
    symbol: "◈",
    description: "Doğu Avrupa ve Kafkasya'da ticaret yolları üzerinde etkili olan Türk kağanlığı.",
    history: "Hazar Kağanlığı, Karadeniz'in kuzeyi ile Hazar Denizi çevresinde siyasi ve ekonomik güç oluşturdu. Bizans ve Arap devletleriyle ilişkiler kurdu.",
    government: "Kağanlık",
    economy: "Ticaret, gümrük gelirleri ve hayvancılık",
    neighbors: "Bizans, Arap devletleri, Slav toplulukları",
    playable: true,
    money: 150,
    army: 70,
    stability: 80,
    economyValue: 85,
    color: "#9a8655",
    map: { x: 53, y: 39 }
  },

  {
    id: "avar",
    name: "Avar Kağanlığı",
    period: "ancient",
    start: 567,
    end: 822,
    date: "567 – 822",
    founder: "Bayan Kağan",
    famous: "Bayan Kağan",
    capital: "Orta Avrupa merkezleri",
    region: "Orta Avrupa",
    symbol: "♜",
    description: "Avrupa tarihinde etkili olmuş, Orta Avrupa'da siyasi güç kurmuş kağanlık.",
    history: "Avarlar, Orta Avrupa'da uzun süre etkili oldu. Bizans ile mücadeleler yürüttüler ve Slav topluluklarının siyasi tarihini etkilediler.",
    government: "Kağanlık",
    economy: "Hayvancılık ve ticaret",
    neighbors: "Bizans, Franklar, Slav toplulukları",
    playable: true,
    money: 100,
    army: 80,
    stability: 70,
    economyValue: 65,
    color: "#92704c",
    map: { x: 47, y: 33 }
  },

  {
    id: "bulgar",
    name: "Büyük Bulgar Devleti",
    period: "ancient",
    start: 632,
    end: 668,
    date: "632 – 668",
    founder: "Kubrat Han",
    famous: "Kubrat Han",
    capital: "Phanagoria",
    region: "Karadeniz'in kuzeyi",
    symbol: "✥",
    description: "Karadeniz'in kuzeyinde Kubrat Han tarafından kurulan Bulgar siyasi birliği.",
    history: "Kubrat Han'ın ölümünden sonra devletin siyasi birliği zayıfladı. Bulgar toplulukları farklı bölgelere yayılarak yeni siyasi yapılar oluşturdu.",
    government: "Hanlık",
    economy: "Hayvancılık ve ticaret",
    neighbors: "Hazarlar, Bizans",
    playable: true,
    money: 95,
    army: 70,
    stability: 65,
    economyValue: 60,
    color: "#a77a52",
    map: { x: 49, y: 38 }
  },

  {
    id: "kirgiz",
    name: "Kırgız Kağanlığı",
    period: "ancient",
    start: 840,
    end: 1207,
    date: "840 – 1207",
    founder: "Kırgız hükümdarları",
    famous: "Bars Bek",
    capital: "Yenisey bölgesi",
    region: "Yenisey ve Orta Asya",
    symbol: "✥",
    description: "Yenisey çevresinde gelişen ve Uygur Kağanlığı'nın yıkılmasında etkili olan Türk siyasi teşkilatı.",
    history: "Kırgızlar, Yenisey bölgesinde güçlü bir siyasi yapı oluşturdu. 840 yılında Uygur Kağanlığı'nın merkezini ele geçirdiler.",
    government: "Kağanlık",
    economy: "Hayvancılık ve ticaret",
    neighbors: "Uygurlar, Moğol toplulukları",
    playable: true,
    money: 100,
    army: 75,
    stability: 70,
    economyValue: 65,
    color: "#7b9c9c",
    map: { x: 70, y: 32 }
  },

  // TÜRK-İSLAM DEVLETLERİ

  {
    id: "karahanli",
    name: "Karahanlı Devleti",
    period: "medieval",
    start: 840,
    end: 1212,
    date: "840 – 1212",
    founder: "Bilinen ilk hükümdarları farklı kaynaklarda değişir",
    famous: "Satuk Buğra Han",
    capital: "Balasagun ve Kaşgar",
    region: "Türkistan",
    symbol: "✥",
    description: "Türk tarihinde İslamiyet'i kabul eden ilk büyük Türk hanedanlarından biri.",
    history: "Karahanlılar döneminde Türk dili ve kültürü gelişti. Yusuf Has Hacib'in Kutadgu Bilig'i ve Kaşgarlı Mahmud'un Divânu Lugâti't-Türk'ü bu kültür çevresinin önemli eserleridir.",
    government: "Hanlık",
    economy: "Tarım, ticaret ve zanaat",
    neighbors: "Gazneliler, Büyük Selçuklular",
    playable: true,
    money: 120,
    army: 70,
    stability: 80,
    economyValue: 80,
    color: "#8e9b70",
    map: { x: 68, y: 45 }
  },

  {
    id: "gazneli",
    name: "Gazneli Devleti",
    period: "medieval",
    start: 963,
    end: 1186,
    date: "963 – 1186",
    founder: "Alp Tigin",
    famous: "Gazneli Mahmud",
    capital: "Gazne",
    region: "Afganistan ve Kuzey Hindistan",
    symbol: "✥",
    description: "Güney Asya ve İran coğrafyasında etkili olan Türk-İslam devleti.",
    history: "Gazneliler, Gazne merkezli güçlü bir devlet kurdu. Sultan Mahmud döneminde Hindistan seferleri ve kültürel faaliyetler öne çıktı.",
    government: "Sultanlık",
    economy: "Tarım, ticaret ve vergi",
    neighbors: "Karahanlılar, Selçuklular, Hint devletleri",
    playable: true,
    money: 135,
    army: 85,
    stability: 75,
    economyValue: 75,
    color: "#78966c",
    map: { x: 69, y: 55 }
  },

  {
    id: "buyuk-selcuklu",
    name: "Büyük Selçuklu Devleti",
    period: "medieval",
    start: 1040,
    end: 1157,
    date: "1040 – 1157",
    founder: "Tuğrul Bey",
    famous: "Alp Arslan ve Melikşah",
    capital: "İsfahan",
    region: "İran, Irak ve Orta Asya",
    symbol: "✥",
    description: "Orta Doğu ve Türk-İslam tarihinde büyük siyasi ve kültürel etki oluşturan imparatorluk.",
    history: "Dandanakan Savaşı sonrasında güçlenen Selçuklular, Alp Arslan döneminde Malazgirt Zaferi'ni kazandı. Melikşah döneminde devlet en geniş ve güçlü dönemlerinden birini yaşadı.",
    government: "Sultanlık",
    economy: "Tarım, ticaret, vergi ve zanaat",
    neighbors: "Bizans, Karahanlılar, Gazneliler, Fatımiler",
    playable: true,
    money: 180,
    army: 95,
    stability: 85,
    economyValue: 90,
    color: "#9d8b52",
    map: { x: 59, y: 52 }
  },

  {
    id: "anadolu-selcuklu",
    name: "Anadolu Selçuklu Devleti",
    period: "medieval",
    start: 1077,
    end: 1308,
    date: "1077 – 1308",
    founder: "Kutalmışoğlu Süleyman Şah",
    famous: "I. Alaeddin Keykubad",
    capital: "Konya",
    region: "Anadolu",
    symbol: "✥",
    description: "Anadolu'da Türk siyasi ve kültürel varlığının gelişmesinde önemli rol oynayan devlet.",
    history: "Anadolu Selçukluları döneminde ticaret yolları, kervansaraylar, medreseler ve şehirler gelişti. 1243 Kösedağ Savaşı sonrasında Moğol baskısı arttı.",
    government: "Sultanlık",
    economy: "Tarım, ticaret, zanaat",
    neighbors: "Bizans, Trabzon Rum Devleti, Moğollar",
    playable: true,
    money: 150,
    army: 80,
    stability: 75,
    economyValue: 90,
    color: "#6b9a8d",
    map: { x: 48, y: 49 }
  },

  {
    id: "harzemsah",
    name: "Harzemşahlar Devleti",
    period: "medieval",
    start: 1077,
    end: 1231,
    date: "1077 – 1231",
    founder: "Anuş Tigin",
    famous: "Alaeddin Muhammed",
    capital: "Gürgenç",
    region: "Orta Asya ve İran",
    symbol: "✥",
    description: "Orta Asya ve İran'da geniş topraklara hâkim olmuş Türk hanedanı.",
    history: "Harzemşahlar, özellikle Alaeddin Tekiş ve Alaeddin Muhammed dönemlerinde güç kazandı. Moğol istilası devletin yıkılmasında belirleyici oldu.",
    government: "Sultanlık",
    economy: "Tarım ve İpek Yolu ticareti",
    neighbors: "Moğol İmparatorluğu, Abbasi Halifeliği",
    playable: true,
    money: 145,
    army: 90,
    stability: 60,
    economyValue: 80,
    color: "#779b85",
    map: { x: 66, y: 46 }
  },

  {
    id: "altin-orda",
    name: "Altın Orda Devleti",
    period: "medieval",
    start: 1242,
    end: 1502,
    date: "13. – 16. yüzyıllar",
    founder: "Batu Han",
    famous: "Özbek Han",
    capital: "Saray",
    region: "Doğu Avrupa ve Deşt-i Kıpçak",
    symbol: "♜",
    description: "Cengiz Han'ın torunları tarafından kurulan ve zamanla Türkleşen önemli bozkır devleti.",
    history: "Altın Orda, Doğu Avrupa ve Karadeniz'in kuzeyinde etkili oldu. Türkçe ve Türk kültürü devletin gelişiminde önemli yer tuttu.",
    government: "Hanlık",
    economy: "Ticaret, hayvancılık ve vergi",
    neighbors: "Rus knezlikleri, Memlükler, Timur Devleti",
    playable: true,
    money: 150,
    army: 90,
    stability: 70,
    economyValue: 80,
    color: "#9c8252",
    map: { x: 52, y: 30 }
  },

  {
    id: "cagatay",
    name: "Çağatay Hanlığı",
    period: "medieval",
    start: 1225,
    end: 1687,
    date: "1225 – 1687",
    founder: "Çağatay Han",
    famous: "Tuğluk Timur",
    capital: "Almalık",
    region: "Türkistan",
    symbol: "♜",
    description: "Orta Asya'da Cengiz Han'ın Çağatay kolundan gelişen hanlık.",
    history: "Çağatay Hanlığı, zaman içinde siyasi bölünmeler yaşadı. Doğu ve batı bölgelerinde farklı yönetimler ortaya çıktı.",
    government: "Hanlık",
    economy: "Hayvancılık, tarım ve ticaret",
    neighbors: "Timur Devleti, Moğolistan",
    playable: true,
    money: 105,
    army: 75,
    stability: 65,
    economyValue: 70,
    color: "#a78a55",
    map: { x: 70, y: 45 }
  },

  {
    id: "timur",
    name: "Timur İmparatorluğu",
    period: "medieval",
    start: 1370,
    end: 1507,
    date: "1370 – 1507",
    founder: "Timur",
    famous: "Timur",
    capital: "Semerkant",
    region: "Orta Asya, İran ve çevresi",
    symbol: "♜",
    description: "Timur tarafından kurulan ve kısa sürede geniş coğrafyaya yayılan imparatorluk.",
    history: "Timur, Semerkant merkezli güçlü bir siyasi ve askerî yapı kurdu. 1402 Ankara Savaşı, Osmanlı tarihini de etkileyen önemli bir dönüm noktası oldu.",
    government: "İmparatorluk",
    economy: "Ticaret, tarım ve zanaat",
    neighbors: "Osmanlı, Altın Orda, Memlükler",
    playable: true,
    money: 170,
    army: 95,
    stability: 75,
    economyValue: 85,
    color: "#9d8050",
    map: { x: 70, y: 48 }
  },

  {
    id: "memluk",
    name: "Memlük Sultanlığı",
    period: "medieval",
    start: 1250,
    end: 1517,
    date: "1250 – 1517",
    founder: "Memlük emirleri",
    famous: "Baybars",
    capital: "Kahire",
    region: "Mısır ve Suriye",
    symbol: "♜",
    description: "Türk ve Çerkes kökenli askerî yönetici sınıfların hüküm sürdüğü sultanlık.",
    history: "Memlükler, Ayn Calut Savaşı'nda Moğol ilerleyişini durdurdu. Osmanlı Devleti ile 16. yüzyılda karşı karşıya geldi.",
    government: "Sultanlık",
    economy: "Tarım ve ticaret",
    neighbors: "Osmanlı, İlhanlılar, Haçlı kalıntıları",
    playable: true,
    money: 145,
    army: 85,
    stability: 70,
    economyValue: 80,
    color: "#8c9b70",
    map: { x: 50, y: 64 }
  },

  // DİĞER TÜRK HANEDAN VE DEVLETLERİ

  {
    id: "karakoyunlu",
    name: "Karakoyunlu Devleti",
    period: "medieval",
    start: 1375,
    end: 1468,
    date: "1375 – 1468",
    founder: "Bayram Hoca",
    famous: "Kara Yusuf",
    capital: "Tebriz",
    region: "Doğu Anadolu ve Azerbaycan",
    symbol: "♜",
    description: "Doğu Anadolu, Azerbaycan ve İran'ın bazı bölgelerinde hüküm süren Türkmen devleti.",
    history: "Karakoyunlular, Akkoyunlular ve Timur Devleti ile mücadele etti. Cihan Şah döneminde önemli bir güç hâline geldi.",
    government: "Türkmen hanedanlığı",
    economy: "Hayvancılık ve ticaret",
    neighbors: "Akkoyunlular, Timur Devleti",
    playable: true,
    money: 110,
    army: 80,
    stability: 65,
    economyValue: 65,
    color: "#826f9b",
    map: { x: 55, y: 52 }
  },

  {
    id: "akkoyunlu",
    name: "Akkoyunlu Devleti",
    period: "medieval",
    start: 1378,
    end: 1501,
    date: "1378 – 1501",
    founder: "Kara Yülük Osman",
    famous: "Uzun Hasan",
    capital: "Diyarbakır ve Tebriz",
    region: "Doğu Anadolu ve İran",
    symbol: "♜",
    description: "Anadolu ve İran coğrafyasında etkili olmuş Türkmen devleti.",
    history: "Uzun Hasan döneminde Akkoyunlular güçlendi. Osmanlı Devleti ile Otlukbeli Savaşı'nda karşı karşıya geldiler.",
    government: "Türkmen hanedanlığı",
    economy: "Hayvancılık, tarım ve ticaret",
    neighbors: "Osmanlı, Karakoyunlular, Timurîler",
    playable: true,
    money: 125,
    army: 80,
    stability: 70,
    economyValue: 75,
    color: "#73946d",
    map: { x: 55, y: 51 }
  },

  {
    id: "babur",
    name: "Babür İmparatorluğu",
    period: "empire",
    start: 1526,
    end: 1857,
    date: "1526 – 1857",
    founder: "Babür Şah",
    famous: "Ekber Şah",
    capital: "Agra ve Delhi",
    region: "Hindistan",
    symbol: "♜",
    description: "Türk-Moğol hanedan geleneğinden gelen Babür tarafından Hindistan'da kurulan imparatorluk.",
    history: "Babür, 1526 Panipat Savaşı sonrasında Hindistan'da imparatorluğun temelini attı. Ekber Şah döneminde yönetim ve kültür alanında önemli gelişmeler yaşandı.",
    government: "İmparatorluk",
    economy: "Tarım, ticaret ve zanaat",
    neighbors: "Safeviler, Deccan devletleri",
    playable: true,
    money: 190,
    army: 90,
    stability: 85,
    economyValue: 95,
    color: "#b28b4f",
    map: { x: 74, y: 61 }
  },

  // OSMANLI DÖNEMİ

  {
    id: "osmanli",
    name: "Osmanlı Devleti",
    period: "empire",
    start: 1299,
    end: 1922,
    date: "1299 – 1922",
    founder: "Osman Gazi",
    famous: "Fatih Sultan Mehmet ve Kanuni Sultan Süleyman",
    capital: "Bursa, Edirne, İstanbul",
    region: "Anadolu, Balkanlar, Orta Doğu ve Kuzey Afrika",
    symbol: "☪",
    description: "Yaklaşık altı yüzyıl boyunca üç kıtada hüküm süren büyük Türk imparatorluğu.",
    history: "Osmanlı Devleti, 1299 civarında Osman Gazi'nin liderliğinde ortaya çıktı. Bursa'nın fethi, İstanbul'un fethi, yükselme dönemi, reform hareketleri ve son dönem savaşları devlet tarihinin önemli başlıklarıdır.",
    government: "Beylikten imparatorluğa uzanan monarşik yönetim",
    economy: "Tarım, ticaret, zanaat ve vergiler",
    neighbors: "Bizans, Balkan devletleri, Safeviler, Memlükler, Avrupa devletleri",
    playable: true,
    money: 200,
    army: 100,
    stability: 85,
    economyValue: 90,
    color: "#a54e4e",
    map: { x: 48, y: 48 }
  },

  {
    id: "safevi",
    name: "Safevi Devleti",
    period: "empire",
    start: 1501,
    end: 1736,
    date: "1501 – 1736",
    founder: "Şah İsmail",
    famous: "Şah Abbas",
    capital: "Tebriz ve İsfahan",
    region: "İran ve Kafkasya",
    symbol: "✥",
    description: "Azerbaycan ve İran coğrafyasında kurulmuş, Türk hanedanı tarafından yönetilen devlet.",
    history: "Safevi Devleti, Şah İsmail tarafından kuruldu. Osmanlı ile özellikle Doğu Anadolu ve Kafkasya çevresinde siyasi ve askerî rekabet yaşadı.",
    government: "Şahlık",
    economy: "Tarım, ticaret ve ipek üretimi",
    neighbors: "Osmanlı, Özbek Hanlığı, Babürler",
    playable: true,
    money: 155,
    army: 90,
    stability: 80,
    economyValue: 85,
    color: "#8d6d91",
    map: { x: 60, y: 54 }
  },

  // MODERN TÜRK DEVLETLERİ

  {
    id: "turkiye",
    name: "Türkiye Cumhuriyeti",
    period: "modern",
    start: 1923,
    end: 2026,
    date: "1923 – Günümüz",
    founder: "Mustafa Kemal Atatürk",
    famous: "Mustafa Kemal Atatürk",
    capital: "Ankara",
    region: "Anadolu ve Doğu Trakya",
    symbol: "★",
    description: "29 Ekim 1923'te ilan edilen, bağımsız ve egemen Türkiye Cumhuriyeti.",
    history: "Türkiye Cumhuriyeti, Millî Mücadele'nin ardından kuruldu. Mustafa Kemal Atatürk ilk cumhurbaşkanı oldu. Cumhuriyetin ilanı, hukuk, eğitim, ekonomi ve toplumsal yaşam alanlarında önemli değişimlerin başlangıcı oldu.",
    government: "Cumhuriyet",
    economy: "Sanayi, tarım, hizmetler ve teknoloji",
    neighbors: "Yunanistan, Bulgaristan, Gürcistan, Ermenistan, Azerbaycan, İran, Irak, Suriye",
    playable: true,
    money: 220,
    army: 90,
    stability: 85,
    economyValue: 90,
    color: "#b44e55",
    map: { x: 50, y: 48 }
  },

  {
    id: "azerbaycan",
    name: "Azerbaycan Cumhuriyeti",
    period: "modern",
    start: 1991,
    end: 2026,
    date: "1991 – Günümüz",
    founder: "Bağımsızlık sürecinin liderleri",
    famous: "Haydar Aliyev",
    capital: "Bakü",
    region: "Kafkasya",
    symbol: "☪",
    description: "1991 yılında Sovyetler Birliği'nin dağılmasıyla bağımsızlığını yeniden kazanan Türk devleti.",
    history: "Azerbaycan, 1918 yılında Azerbaycan Demokratik Cumhuriyeti'ni kurdu. Sovyet döneminin ardından 1991'de bağımsızlığını yeniden ilan etti.",
    government: "Cumhuriyet",
    economy: "Enerji, sanayi, tarım ve hizmetler",
    neighbors: "Türkiye, Gürcistan, Ermenistan, İran, Rusya",
    playable: true,
    money: 150,
    army: 75,
    stability: 80,
    economyValue: 85,
    color: "#5795a8",
    map: { x: 55, y: 47 }
  },

  {
    id: "kazakistan",
    name: "Kazakistan Cumhuriyeti",
    period: "modern",
    start: 1991,
    end: 2026,
    date: "1991 – Günümüz",
    founder: "Bağımsızlık dönemi liderleri",
    famous: "Nursultan Nazarbayev",
    capital: "Astana",
    region: "Orta Asya",
    symbol: "☀",
    description: "Orta Asya'nın geniş yüzölçümüne sahip bağımsız Türk cumhuriyeti.",
    history: "Kazakistan, 16 Aralık 1991'de bağımsızlığını ilan etti. Enerji kaynakları, madenler ve geniş bozkır coğrafyası ülke ekonomisinde önem taşır.",
    government: "Cumhuriyet",
    economy: "Enerji, madencilik, tarım ve sanayi",
    neighbors: "Rusya, Çin, Kırgızistan, Özbekistan, Türkmenistan",
    playable: true,
    money: 190,
    army: 75,
    stability: 85,
    economyValue: 90,
    color: "#5c9db0",
    map: { x: 70, y: 40 }
  },

  {
    id: "kirgizistan",
    name: "Kırgızistan Cumhuriyeti",
    period: "modern",
    start: 1991,
    end: 2026,
    date: "1991 – Günümüz",
    founder: "Bağımsızlık dönemi liderleri",
    famous: "Askar Akayev",
    capital: "Bişkek",
    region: "Orta Asya",
    symbol: "☀",
    description: "Dağlık coğrafyası ve köklü göçebe kültürüyle tanınan bağımsız Türk cumhuriyeti.",
    history: "Kırgızistan, 1991'de bağımsızlığını ilan etti. Ülkenin kültürel mirasında Manas Destanı önemli bir yere sahiptir.",
    government: "Cumhuriyet",
    economy: "Tarım, madencilik ve hizmetler",
    neighbors: "Kazakistan, Özbekistan, Tacikistan, Çin",
    playable: true,
    money: 100,
    army: 55,
    stability: 70,
    economyValue: 60,
    color: "#a95b58",
    map: { x: 72, y: 48 }
  },

  {
    id: "ozbekistan",
    name: "Özbekistan Cumhuriyeti",
    period: "modern",
    start: 1991,
    end: 2026,
    date: "1991 – Günümüz",
    founder: "Bağımsızlık dönemi liderleri",
    famous: "İslam Kerimov",
    capital: "Taşkent",
    region: "Orta Asya",
    symbol: "☪",
    description: "Semerkant ve Buhara gibi tarihî merkezlere sahip bağımsız Türk cumhuriyeti.",
    history: "Özbekistan, 1991'de bağımsızlığını ilan etti. Semerkant, Buhara ve Hive gibi şehirler ülkenin tarihî ve kültürel mirasında önemli yer tutar.",
    government: "Cumhuriyet",
    economy: "Tarım, tekstil, madencilik ve sanayi",
    neighbors: "Kazakistan, Kırgızistan, Tacikistan, Afganistan, Türkmenistan",
    playable: true,
    money: 135,
    army: 70,
    stability: 80,
    economyValue: 75,
    color: "#559a9a",
    map: { x: 68, y: 49 }
  },

  {
    id: "turkmenistan",
    name: "Türkmenistan",
    period: "modern",
    start: 1991,
    end: 2026,
    date: "1991 – Günümüz",
    founder: "Bağımsızlık dönemi liderleri",
    famous: "Saparmurat Türkmenbaşı",
    capital: "Aşkabat",
    region: "Orta Asya",
    symbol: "✥",
    description: "Halı kültürü, tarihî Türkmen toplulukları ve doğal gaz kaynaklarıyla tanınan Türk devleti.",
    history: "Türkmenistan, 1991 yılında bağımsızlığını ilan etti. Ülke, doğal gaz kaynakları ve tarihî Türkmen kültürüyle öne çıkar.",
    government: "Cumhuriyet",
    economy: "Doğal gaz, petrol, tarım ve tekstil",
    neighbors: "Kazakistan, Özbekistan, Afganistan, İran",
    playable: true,
    money: 145,
    army: 65,
    stability: 80,
    economyValue: 85,
    color: "#5b9a79",
    map: { x: 63, y: 52 }
  }
];


/* =========================================================
   2. TARİHÎ OLAYLAR
   ========================================================= */

const EVENTS = [

  {
    year: -220,
    title: "Asya Hun Devleti'nin ortaya çıkışı",
    period: "ancient",
    description: "Teoman döneminde Hun siyasi birliğinin temelleri atıldı."
  },
  {
    year: -209,
    title: "Mete Han dönemi",
    period: "ancient",
    description: "Mete Han döneminde Asya Hun Devleti askerî ve siyasi bakımdan güç kazandı."
  },
  {
    year: 375,
    title: "Kavimler Göçü",
    period: "ancient",
    description: "Avrupa'nın siyasi ve toplumsal yapısını etkileyen büyük göç hareketleri başladı."
  },
  {
    year: 552,
    title: "Göktürk Kağanlığı kuruldu",
    period: "ancient",
    description: "Bumin Kağan liderliğinde Göktürk siyasi teşkilatı ortaya çıktı."
  },
  {
    year: 630,
    title: "Doğu Göktürk Kağanlığı'nın Çin hâkimiyetine girmesi",
    period: "ancient",
    description: "Göktürk siyasi birliği geçici olarak zayıfladı."
  },
  {
    year: 682,
    title: "II. Göktürk Kağanlığı kuruldu",
    period: "ancient",
    description: "Kutluk Kağan bağımsızlığı yeniden sağladı."
  },
  {
    year: 720,
    title: "Orhun Yazıtları dönemi",
    period: "ancient",
    description: "Türk tarihinin en önemli yazılı kaynakları arasında yer alan yazıtlar oluşturuldu."
  },
  {
    year: 744,
    title: "Uygur Kağanlığı kuruldu",
    period: "ancient",
    description: "Uygurlar Orta Asya'da yeni bir siyasi güç hâline geldi."
  },
  {
    year: 840,
    title: "Uygur Kağanlığı'nın sona ermesi",
    period: "ancient",
    description: "Kırgız saldırısı sonrasında Uygur siyasi merkezi dağıldı."
  },
  {
    year: 960,
    title: "Karahanlılar döneminde İslamiyet",
    period: "medieval",
    description: "Karahanlı çevresinde İslamiyet'in yayılması hız kazandı."
  },
  {
    year: 1040,
    title: "Dandanakan Savaşı",
    period: "medieval",
    description: "Selçukluların Gaznelilere karşı kazandığı zafer, Büyük Selçuklu Devleti'nin güçlenmesini sağladı."
  },
  {
    year: 1071,
    title: "Malazgirt Zaferi",
    period: "medieval",
    description: "Alp Arslan liderliğindeki Selçuklular Bizans ordusunu mağlup etti."
  },
  {
    year: 1077,
    title: "Anadolu Selçuklu Devleti",
    period: "medieval",
    description: "Anadolu'da Selçuklu siyasi teşkilatı güç kazandı."
  },
  {
    year: 1243,
    title: "Kösedağ Savaşı",
    period: "medieval",
    description: "Anadolu Selçukluları Moğol ordusuna yenildi."
  },
  {
    year: 1299,
    title: "Osmanlı Beyliği'nin kuruluş dönemi",
    period: "empire",
    description: "Osman Gazi'nin liderliğindeki beylik, Osmanlı tarihinin başlangıcı kabul edilir."
  },
  {
    year: 1453,
    title: "İstanbul'un Fethi",
    period: "empire",
    description: "Fatih Sultan Mehmet İstanbul'u fethetti."
  },
  {
    year: 1514,
    title: "Çaldıran Savaşı",
    period: "empire",
    description: "Osmanlı ve Safevi orduları karşı karşıya geldi."
  },
  {
    year: 1517,
    title: "Mısır Seferi",
    period: "empire",
    description: "Osmanlı Devleti Memlük Sultanlığı'na son verdi."
  },
  {
    year: 1526,
    title: "Mohaç Meydan Muharebesi",
    period: "empire",
    description: "Kanuni Sultan Süleyman döneminde Osmanlı ordusu Macar ordusunu mağlup etti."
  },
  {
    year: 1922,
    title: "Saltanatın kaldırılması",
    period: "modern",
    description: "Osmanlı saltanatı kaldırıldı."
  },
  {
    year: 1923,
    title: "Türkiye Cumhuriyeti ilan edildi",
    period: "modern",
    description: "29 Ekim 1923'te Cumhuriyet ilan edildi ve Mustafa Kemal Atatürk ilk cumhurbaşkanı oldu."
  },
  {
    year: 1991,
    title: "Bağımsız Türk cumhuriyetleri",
    period: "modern",
    description: "Sovyetler Birliği'nin dağılmasıyla Orta Asya'daki Türk cumhuriyetleri bağımsızlıklarını ilan etti."
  }
];


/* =========================================================
   3. YARDIMCI FONKSİYONLAR
   ========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const formatYear = year => {
  if (year < 0) return `MÖ ${Math.abs(year)}`;
  return `MS ${year}`;
};

const getState = id => STATES.find(state => state.id === id);

const periodNames = {
  ancient: "İlk Türk Devletleri",
  medieval: "Türk-İslam Devletleri",
  empire: "İmparatorluklar",
  modern: "Modern Türk Devletleri"
};

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function showToast(message) {
  const container = $("#toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}


/* =========================================================
   4. SAYFA GEÇİŞLERİ
   ========================================================= */

function navigateTo(pageName) {
  const page = document.getElementById(`page-${pageName}`);

  if (!page) return;

  $$(".page").forEach(item => item.classList.remove("active"));
  page.classList.add("active");

  $$(".nav-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );
  });

  $("#mobile-navigation")?.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");

  if (!button) return;

  navigateTo(button.dataset.page);
});


/* =========================================================
   5. MOBİL MENÜ
   ========================================================= */

$("#menu-toggle")?.addEventListener("click", () => {
  $("#mobile-navigation")?.classList.toggle("open");
});


/* =========================================================
   6. ANA SAYFA
   ========================================================= */

function initializeHome() {
  $("#stat-states").textContent = STATES.length;

  const featuredContainer = $("#featured-states");

  if (!featuredContainer) return;

  const featured = [
    "asya-hun",
    "gokturk",
    "buyuk-selcuklu",
    "osmanli",
    "turkiye"
  ];

  featuredContainer.querySelectorAll("[data-state]").forEach(button => {
    button.addEventListener("click", () => {
      openStateDetail(button.dataset.state);
    });
  });

  $$(".era-card").forEach(card => {
    card.addEventListener("click", () => {
      const era = card.dataset.era;

      navigateTo("states");
      renderStates(era);
    });
  });
}


/* =========================================================
   7. DEVLET LİSTESİ VE FİLTRELER
   ========================================================= */

let currentPeriodFilter = "all";

function renderStates(filter = currentPeriodFilter, search = "") {
  currentPeriodFilter = filter;

  const container = $("#states-grid");
  if (!container) return;

  const normalizedSearch = search.toLocaleLowerCase("tr");

  const filtered = STATES.filter(state => {
    const periodMatch =
      filter === "all" || state.period === filter;

    const searchable = [
      state.name,
      state.founder,
      state.famous,
      state.region,
      state.capital
    ].join(" ").toLocaleLowerCase("tr");

    return periodMatch && searchable.includes(normalizedSearch);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>Devlet bulunamadı</h3>
        <p>Arama kelimesini veya dönem filtresini değiştir.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(state => `
    <article class="state-card" data-state-card="${state.id}">
      <div class="state-card-banner" style="background:
        linear-gradient(135deg, ${state.color}55, #111923)">
        <span>${escapeHTML(state.symbol)}</span>
        <small class="state-card-period">
          ${escapeHTML(periodNames[state.period])}
        </small>
      </div>

      <div class="state-card-content">
        <h3>${escapeHTML(state.name)}</h3>
        <p>${escapeHTML(state.description)}</p>

        <div class="state-card-meta">
          <span>${escapeHTML(state.date)}</span>
          <span>İNCELE →</span>
        </div>
      </div>
    </article>
  `).join("");

  container.querySelectorAll("[data-state-card]").forEach(card => {
    card.addEventListener("click", () => {
      openStateDetail(card.dataset.stateCard);
    });
  });
}

$("#state-search")?.addEventListener("input", event => {
  renderStates(currentPeriodFilter, event.target.value);
});

$("#state-period-filter")?.addEventListener("change", event => {
  renderStates(event.target.value, $("#state-search").value);
});

$$(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter-button").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    $("#state-period-filter").value = button.dataset.filter;

    renderStates(
      button.dataset.filter,
      $("#state-search").value
    );
  });
});


/* =========================================================
   8. DEVLET DETAY SAYFASI
   ========================================================= */

function openStateDetail(id) {
  const state = getState(id);

  if (!state) return;

  const container = $("#state-detail-content");

  container.innerHTML = `
    <div class="state-detail-hero">
      <div>
        <span class="section-kicker">
          ${escapeHTML(periodNames[state.period])}
        </span>

        <h1>${escapeHTML(state.name)}</h1>

        <p>${escapeHTML(state.date)} • ${escapeHTML(state.region)}</p>
      </div>

      <div class="state-detail-emblem">
        ${escapeHTML(state.symbol)}
      </div>
    </div>

    <div class="state-detail-body">

      <div class="detail-facts">
        <div class="detail-fact">
          <small>Kurucu</small>
          <strong>${escapeHTML(state.founder)}</strong>
        </div>

        <div class="detail-fact">
          <small>Önemli hükümdar</small>
          <strong>${escapeHTML(state.famous)}</strong>
        </div>

        <div class="detail-fact">
          <small>Başkent</small>
          <strong>${escapeHTML(state.capital)}</strong>
        </div>
      </div>

      <section class="detail-section">
        <h3>Devlet Hakkında</h3>
        <p>${escapeHTML(state.description)}</p>
      </section>

      <section class="detail-section">
        <h3>Tarihî Bilgiler</h3>
        <p>${escapeHTML(state.history)}</p>
      </section>

      <section class="detail-section">
        <h3>Devlet Yapısı</h3>
        <p>
          <strong>Yönetim:</strong>
          ${escapeHTML(state.government)}
        </p>
        <br>
        <p>
          <strong>Ekonomi:</strong>
          ${escapeHTML(state.economy)}
        </p>
        <br>
        <p>
          <strong>Komşular:</strong>
          ${escapeHTML(state.neighbors)}
        </p>
      </section>

      <button class="primary-button" id="play-this-state">
        BU DEVLETİ YÖNET →
      </button>

    </div>
  `;

  navigateTo("state-detail");

  $("#play-this-state").addEventListener("click", () => {
    navigateTo("game");
    startGame(state.id);
  });
}


/* =========================================================
   9. ZAMAN ÇİZELGESİ
   ========================================================= */

function renderTimeline(filter = "all") {
  const container = $("#timeline-container");
  if (!container) return;

  const filtered = EVENTS.filter(event =>
    filter === "all" || event.period === filter
  );

  container.innerHTML = filtered.map(event => `
    <div class="timeline-item">
      <div class="timeline-year">
        ${formatYear(event.year)}
      </div>

      <div class="timeline-card">
        <h3>${escapeHTML(event.title)}</h3>
        <p>${escapeHTML(event.description)}</p>
      </div>
    </div>
  `).join("");
}

$("#timeline-filter")?.addEventListener("change", event => {
  renderTimeline(event.target.value);
});


/* =========================================================
   10. TARİH ATLASI
   Bu ilk sürüm etkileşimli temsili harita kullanır.
   Sınırlar ve alanlar gerçek tarihî sınırlar değildir.
   ========================================================= */

function renderAtlas(filter = "all") {
  const map = $("#historical-map");

  if (!map) return;

  const filtered = STATES.filter(state =>
    filter === "all" || state.period === filter
  );

  map.innerHTML = `
    <div class="atlas-map-grid"></div>

    <div class="atlas-map-title">
      TARİHÎ COĞRAFYA • TEMSİLİ KONUM İŞARETLERİ
    </div>

    ${filtered.map(state => `
      <button
        class="map-marker"
        data-map-state="${state.id}"
        style="
          left:${state.map.x}%;
          top:${state.map.y}%;
          --marker-color:${state.color};
        "
        title="${escapeHTML(state.name)}"
      >
        <span></span>
      </button>
    `).join("")}
  `;

  map.querySelectorAll("[data-map-state]").forEach(marker => {
    marker.addEventListener("click", () => {
      showAtlasInfo(marker.dataset.mapState);
    });
  });
}

function showAtlasInfo(id) {
  const state = getState(id);
  if (!state) return;

  $("#atlas-info").innerHTML = `
    <div class="empty-state-icon">
      ${escapeHTML(state.symbol)}
    </div>

    <h4>${escapeHTML(state.name)}</h4>

    <p>${escapeHTML(state.date)}</p>

    <p>${escapeHTML(state.description)}</p>

    <p><strong>Başkent:</strong> ${escapeHTML(state.capital)}</p>

    <button class="primary-button" id="atlas-detail-button">
      DEVLETİ İNCELE
    </button>
  `;

  $("#atlas-detail-button").addEventListener("click", () => {
    openStateDetail(id);
  });
}

$("#atlas-period")?.addEventListener("change", event => {
  renderAtlas(event.target.value);
});


/* =========================================================
   11. STRATEJİ OYUNU
   ========================================================= */

const GAME_STORAGE_KEY = "turk-tarihi-atlasi-save-v1";

let game = null;
let gameTimer = null;

const GAME_TICK_MS = 15000;

function getDefaultGameData(state) {
  return {
    stateId: state.id,
    year: state.start,
    money: state.money,
    army: state.army,
    stability: state.stability,
    economy: state.economyValue,
    turn: 1,
    relations: {},
    log: [
      `${state.name} yönetimi başladı.`,
      `Başkent: ${state.capital}.`,
      `Yeni bir tarih yazmaya hazırsın.`
    ],
    lastSaved: Date.now()
  };
}

function saveGame() {
  if (!game) return;

  game.lastSaved = Date.now();

  try {
    localStorage.setItem(
      GAME_STORAGE_KEY,
      JSON.stringify(game)
    );
  } catch (error) {
    console.warn("Oyun kaydedilemedi:", error);
  }
}

function loadSavedGame() {
  try {
    const saved = localStorage.getItem(GAME_STORAGE_KEY);

    if (!saved) return null;

    const data = JSON.parse(saved);
    const state = getState(data.stateId);

    if (!state || !state.playable) return null;

    if (
      !Number.isFinite(data.year) ||
      !Number.isFinite(data.money) ||
      !Number.isFinite(data.army) ||
      !Number.isFinite(data.stability) ||
      !Number.isFinite(data.economy)
    ) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function startGame(stateId) {
  const state = getState(stateId);

  if (!state || !state.playable) {
    showToast("Bu devlet için oyun başlatılamıyor.");
    return;
  }

  stopGameTimer();

  game = getDefaultGameData(state);

  const existing = loadSavedGame();

  if (existing && existing.stateId === stateId) {
    const restore = confirm(
      "Bu devlet için kayıtlı bir oyunun var. Devam etmek ister misin?"
    );

    if (restore) {
      game = existing;
    }
  }

  $("#game-setup").classList.add("hidden");
  $("#game-dashboard").classList.remove("hidden");

  renderGame();
  startGameTimer();

  saveGame();

  showToast(`${state.name} yönetimi başladı!`);
}

function exitGame() {
  stopGameTimer();

  game = null;

  $("#game-dashboard").classList.add("hidden");
  $("#game-setup").classList.remove("hidden");

  showToast("Devlet yönetiminden ayrıldın.");
}

$("#game-exit")?.addEventListener("click", () => {
  const confirmed = confirm(
    "Yönetim ekranından ayrılmak istiyor musun? Oyunun kaydedilecek."
  );

  if (!confirmed) return;

  saveGame();
  exitGame();
});


/* =========================================================
   12. OYUN DEVLET SEÇİMİ
   ========================================================= */

function renderGameStateChoices() {
  const container = $("#game-state-grid");
  if (!container) return;

  container.innerHTML = STATES
    .filter(state => state.playable)
    .map(state => `
      <button class="game-state-option" data-play-state="${state.id}">
        <span class="state-emblem">
          ${escapeHTML(state.symbol)}
        </span>

        <strong>${escapeHTML(state.name)}</strong>

        <small>${escapeHTML(state.date)}</small>
      </button>
    `).join("");

  container.querySelectorAll("[data-play-state]").forEach(button => {
    button.addEventListener("click", () => {
      startGame(button.dataset.playState);
    });
  });
}


/* =========================================================
   13. OYUN EKRANI
   ========================================================= */

function renderGame() {
  if (!game) return;

  const state = getState(game.stateId);

  if (!state) return;

  $("#game-state-name").textContent = state.name;
  $("#game-state-era").textContent =
    `${formatYear(game.year)} • ${state.capital}`;

  $("#game-money").textContent = Math.round(game.money);
  $("#game-army").textContent = Math.round(game.army);
  $("#game-stability").textContent = Math.round(game.stability);
  $("#game-economy").textContent = Math.round(game.economy);

  renderGameMap(state);
  renderGameLog();
}

function renderGameMap(state) {
  const map = $("#game-map");

  if (!map) return;

  map.innerHTML = `
    <div class="game-map-emblem">${escapeHTML(state.symbol)}</div>

    <h3>${escapeHTML(state.name)}</h3>

    <p>Yönetim merkezi: ${escapeHTML(state.capital)}</p>

    <p>Bölge: ${escapeHTML(state.region)}</p>

    <p class="game-map-note">
      Bu ekran devletin tarihî merkezini temsil eder.
      Gerçek sınır ve fetih haritası değildir.
    </p>
  `;
}

function renderGameLog() {
  const container = $("#game-log");

  if (!container || !game) return;

  container.innerHTML = game.log
    .slice(0, 30)
    .map(entry => `
      <div class="game-log-entry">
        ${escapeHTML(entry)}
      </div>
    `).join("");
}

function addGameLog(message) {
  if (!game) return;

  game.log.unshift(message);
  game.log = game.log.slice(0, 30);

  renderGameLog();
}


/* =========================================================
   14. OYUN KAYNAK SİSTEMİ
   ========================================================= */

function clamp(value, min = 0, max = 9999) {
  return Math.max(min, Math.min(max, value));
}

function performGameAction(action) {
  if (!game) {
    showToast("Önce bir devlet seçmelisin.");
    return;
  }

  switch (action) {

    case "economy":
      if (game.money < 25) {
        showToast("Hazinede yeterli kaynak yok.");
        return;
      }

      game.money -= 25;
      game.economy = clamp(game.economy + 8, 0, 100);
      addGameLog("Ekonomik yatırımlar gerçekleştirildi.");
      break;

    case "stability":
      if (game.money < 20) {
        showToast("Hazinede yeterli kaynak yok.");
        return;
      }

      game.money -= 20;
      game.stability = clamp(game.stability + 10, 0, 100);
      addGameLog("Devlet düzeni için yeni kararlar alındı.");
      break;

    case "army":
      if (game.money < 35) {
        showToast("Hazinede yeterli kaynak yok.");
        return;
      }

      game.money -= 35;
      game.army = clamp(game.army + 8, 0, 100);
      addGameLog("Ordu kapasitesi geliştirildi.");
      break;

    case "diplomacy":
      openDiplomacy();
      return;

    case "next-turn":
      advanceGamePeriod();
      return;

    default:
      return;
  }

  renderGame();
  saveGame();
}

$$("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    performGameAction(button.dataset.action);
  });
});


/* =========================================================
   15. DİPLOMASİ
   Basitleştirilmiş oyun ilişkileri sistemidir.
   Tarihî ittifak iddiası taşımaz.
   ========================================================= */

function openDiplomacy() {
  if (!game) return;

  const others = STATES.filter(state =>
    state.id !== game.stateId
  );

  $("#modal-content").innerHTML = `
    <span class="section-kicker">DEVLET İLİŞKİLERİ</span>
    <h2>Diplomasi Merkezi</h2>

    <p>
      Başka bir devlet seçerek ilişkinizi geliştirebilirsin.
      Bu oyun içi sistem tarihî ilişkilerin birebir simülasyonu değildir.
    </p>

    <div class="diplomacy-list">
      ${others.map(state => {
        const relation = game.relations[state.id] ?? 0;

        return `
          <div class="diplomacy-item">
            <div>
              <strong>${escapeHTML(state.name)}</strong>
              <small>İlişki puanı: ${relation}</small>
            </div>

            <button
              class="secondary-button"
              data-diplomacy-state="${state.id}"
            >
              İLİŞKİ KUR
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;

  $("#modal-overlay").classList.remove("hidden");

  $$("#modal-content [data-diplomacy-state]").forEach(button => {
    button.addEventListener("click", () => {
      improveDiplomacy(button.dataset.diplomacyState);
    });
  });
}

function improveDiplomacy(stateId) {
  if (!game) return;

  if (game.money < 15) {
    showToast("Diplomatik girişim için hazinede yeterli kaynak yok.");
    return;
  }

  game.money -= 15;

  const current = game.relations[stateId] ?? 0;

  game.relations[stateId] = clamp(current + 10, -100, 100);

  const other = getState(stateId);

  addGameLog(
    `${other.name} ile diplomatik görüşmeler gerçekleştirildi.`
  );

  saveGame();
  renderGame();
  openDiplomacy();

  showToast("Diplomatik ilişki geliştirildi.");
}


/* =========================================================
   16. OYUN DÖNEMİ İLERLETME
   ========================================================= */

function advanceGamePeriod() {
  if (!game) return;

  const state = getState(game.stateId);

  game.turn++;

  const yearlyIncome = Math.max(
    1,
    Math.round(game.economy * 0.12)
  );

  game.money += yearlyIncome;

  game.stability = clamp(
    game.stability + (Math.random() > .5 ? 1 : -1),
    0,
    100
  );

  game.year += 1;

  if (game.year > state.end) {
    addGameLog(
      "Bu senaryo için belirlenen tarih aralığının sonuna ulaşıldı."
    );

    game.year = state.end;
    stopGameTimer();
  } else {
    addGameLog(
      `${formatYear(game.year)}: Yeni dönem başladı. Hazineye ${yearlyIncome} kaynak eklendi.`
    );
  }

  renderGame();
  saveGame();
}


/* =========================================================
   17. GERÇEK ZAMANLI OYUN TİCK SİSTEMİ
   Her 15 saniyede bir ekonomik gelişme gerçekleşir.
   ========================================================= */

function startGameTimer() {
  stopGameTimer();

  gameTimer = setInterval(() => {
    if (!game) return;

    const state = getState(game.stateId);

    if (game.year >= state.end) {
      stopGameTimer();
      return;
    }

    const income = Math.max(
      1,
      Math.round(game.economy * 0.025)
    );

    game.money += income;

    addGameLog(
      `Zaman ilerledi. Ekonomik faaliyetlerden ${income} kaynak kazanıldı.`
    );

    renderGame();
    saveGame();

  }, GAME_TICK_MS);
}

function stopGameTimer() {
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    saveGame();
  }
});

window.addEventListener("beforeunload", () => {
  saveGame();
});


/* =========================================================
   18. MODAL PENCERESİ
   ========================================================= */

function closeModal() {
  $("#modal-overlay")?.classList.add("hidden");
}

$("#modal-close")?.addEventListener("click", closeModal);

$("#modal-overlay")?.addEventListener("click", event => {
  if (event.target.id === "modal-overlay") {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
  }
});


/* =========================================================
   19. SES AYARI
   Bu sürümde ses düğmesi yalnızca durum göstergesidir.
   ========================================================= */

let soundEnabled = false;

$("#sound-toggle")?.addEventListener("click", () => {
  soundEnabled = !soundEnabled;

  $("#sound-toggle").textContent =
    soundEnabled ? "♫" : "♪";

  showToast(
    soundEnabled
      ? "Ses seçeneği açıldı."
      : "Ses seçeneği kapatıldı."
  );
});


/* =========================================================
   20. KAYITLI OYUNU GERİ YÜKLEME
   ========================================================= */

function restoreGameIfAvailable() {
  const saved = loadSavedGame();

  if (!saved) return;

  const state = getState(saved.stateId);

  if (!state) return;

  const continueGame = confirm(
    `${state.name} için kayıtlı oyunun var. Devam etmek ister misin?`
  );

  if (!continueGame) return;

  game = saved;

  $("#game-setup").classList.add("hidden");
  $("#game-dashboard").classList.remove("hidden");

  renderGame();
  startGameTimer();

  showToast("Kayıtlı oyun yüklendi.");
}


/* =========================================================
   21. UYGULAMA BAŞLATMA
   ========================================================= */

function initializeApplication() {
  initializeHome();

  renderStates("all");
  renderTimeline("all");
  renderAtlas("all");
  renderGameStateChoices();

  const loadingScreen = $("#loading-screen");
  const app = $("#app");

  setTimeout(() => {
    loadingScreen?.classList.add("hidden");
    app?.classList.remove("hidden");
  }, 900);

  setTimeout(() => {
    restoreGameIfAvailable();
  }, 1100);

  console.log(
    "Türk Tarihi Atlası hazır.",
    `${STATES.length} devlet kayıtlı.`
  );
}

initializeApplication();

/* ATLAS HARİTA İŞARETLERİ */

.atlas-map-grid {
  position: absolute;
  inset: 0;
  opacity: .2;
  background-image:
    linear-gradient(rgba(201,164,92,.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,164,92,.12) 1px, transparent 1px);
  background-size: 35px 35px;
}

.atlas-map-title {
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 8px;
  letter-spacing: 2px;
  color: var(--gold);
}

.map-marker {
  position: absolute;
  z-index: 2;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--marker-color);
  background: color-mix(in srgb, var(--marker-color) 25%, transparent);
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  transition: .2s ease;
}

.map-marker span {
  width: 7px;
  height: 7px;
  background: var(--marker-color);
  border-radius: 50%;
}

.map-marker:hover {
  transform: translate(-50%, -50%) scale(1.5);
  box-shadow: 0 0 18px var(--marker-color);
}

.game-map-emblem {
  font-size: 65px;
  color: var(--gold);
}

.game-map h3 {
  font-family: 'Cinzel', serif;
  color: var(--gold-light);
  margin: 12px 0;
}

.game-map p {
  font-size: 11px;
  line-height: 1.8;
}

.game-map-note {
  max-width: 300px;
  margin-top: 20px;
  color: var(--gold);
}

.diplomacy-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.diplomacy-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #101923;
  border: 1px solid var(--border);
  padding: 13px;
  border-radius: 6px;
}

.diplomacy-item strong,
.diplomacy-item small {
  display: block;
}

.diplomacy-item strong {
  font-size: 11px;
}

.diplomacy-item small {
  font-size: 9px;
  color: var(--muted);
  margin-top: 5px;
}

.diplomacy-item button {
  padding: 10px;
  font-size: 8px;
}
