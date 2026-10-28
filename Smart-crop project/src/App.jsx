import React, { useState } from 'react';
import './App.css';
import { authenticateUser, submitOrder } from './services/api';

// Translations Database
const translations = {
  en: {
    brandName: "Smart Crop Store",
    heroTitle: "Smart Crop Cultivation:<br>Technology for Better Farming",
    heroText: "Find seeds, fertilizers and pesticides, rent farming machines, and discover useful farm-waste products — all in one place.",
    getStarted: "Get Started →",
    welcome: "Welcome to Smart Crop Cultivation",
    welcomeText: "Create an account or log in with your mobile number to get started.",
    login: "Login",
    register: "Register",
    mobileNote: "Use your 10-digit mobile number",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    featuresTitle: "Explore Farming Features",
    featuresSubtitle: "Choose a category to view its products.",
    seeds: "Seeds",
    fertilizers: "Fertilizers & Pesticides",
    machines: "Machine Rental",
    waste: "Waste Management",
    yourCart: "Your Cart",
    emptyCart: "No items in cart",
    emptyCartText: "Add products to get started",
    total: "Total",
    pay: "Pay with Razorpay",
    cod: "Cash on Delivery",
    voiceAssistant: "Voice assistant",
    footerText: "Useful farming products in one place.",
    contactLabel: "Contact Us",
    addToCart: "Add +"
  },
  te: {
    brandName: "స్మార్ట్ క్రాప్ స్టోర్",
    heroTitle: "స్మార్ట్ పంట సాగు:<br>మెరుగైన వ్యవసాయం కోసం సాంకేతికత",
    heroText: "విత్తనాలు, ఎరువులు, పురుగుమందులు, యంత్రాల అద్దె మరియు వ్యర్థాల నిర్వహణ — అన్నీ ఒకే చోట పొందండి.",
    getStarted: "ప్రారంభించండి →",
    welcome: "స్మార్ట్ క్రాప్ సాగుకు స్వాగతం",
    welcomeText: "ప్రారంభించడానికి మీ మొబైల్ నంబర్‌తో ఖాతాను సృష్టించండి లేదా లాగిన్ అవ్వండి.",
    login: "లాగిన్",
    register: "రిజిస్టర్",
    mobileNote: "మీ 10 అంకెల మొబైల్ నంబర్‌ను ఉపయోగించండి",
    noAccount: "ఖాతా లేదా?",
    haveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    featuresTitle: "వ్యవసాయ ఫీచర్లను అన్వేషించండి",
    featuresSubtitle: "ఉత్పత్తులను చూడటానికి ఒక వర్గాన్ని ఎంచుకోండి.",
    seeds: "విత్తనాలు",
    fertilizers: "ఎరువులు & పురుగుమందులు",
    machines: "యంత్రాల అద్దె",
    waste: "వ్యర్థాల నిర్వహణ",
    yourCart: "మీ కార్ట్",
    emptyCart: "కార్ట్‌లో ఏమీ లేవు",
    emptyCartText: "ప్రారంభించడానికి ఉత్పత్తులను జోడించండి",
    total: "మొత్తం",
    pay: "రేజర్‌పే తో చెల్లించండి",
    cod: "క్యాష్ ఆన్ డెలివరీ",
    voiceAssistant: "వాయిస్ అసిస్టెంట్",
    footerText: "ఉపయోగకరమైన వ్యవసాయ ఉత్పత్తులు ఒకే చోట.",
    contactLabel: "సంప్రదించండి",
    addToCart: "జోడించు +"
  },
  hi: {
    brandName: "स्मार्ट क्रॉप स्टोर",
    heroTitle: "स्मार्ट फसल खेती:<br>बेहतर खेती के लिए तकनीक",
    heroText: "बीज, उर्वरक और कीटनाशक खोजें, खेती की मशीनें किराए पर लें, और कृषि अपशिष्ट उत्पाद खोजें — सब एक ही जगह।",
    getStarted: "शुरू करें →",
    welcome: "स्मार्ट क्रॉप कल्टीवेशन में आपका स्वागत है",
    welcomeText: "शुरू करने के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।",
    login: "लॉगिन",
    register: "पंजीकरण",
    mobileNote: "अपने 10 अंकों के मोबाइल नंबर का उपयोग करें",
    noAccount: "खाता नहीं है?",
    haveAccount: "पहले से ही खाता है?",
    featuresTitle: "खेती की विशेषताओं का पता लगाएं",
    featuresSubtitle: "उत्पादों को देखने के लिए एक श्रेणी चुनें।",
    seeds: "बीज",
    fertilizers: "उर्वरक और कीटनाशक",
    machines: "मशीन किराया",
    waste: "अपशिष्ट प्रबंधन",
    yourCart: "आपकी कार्ट",
    emptyCart: "कार्ट में कोई सामान नहीं",
    emptyCartText: "शुरू करने के लिए उत्पाद जोड़ें",
    total: "कुल",
    pay: "रेज़रपे से भुगतान करें",
    cod: "कैश ऑन डिलीवरी",
    voiceAssistant: "वॉइस असिस्टेंट",
    footerText: "उपयोगी कृषि उत्पाद एक ही स्थान पर।",
    contactLabel: "संपर्क करें",
    addToCart: "जोड़ें +"
  }
};

// Products Data Database (10 per category)
const productsData = {
  seeds: [
    { id: "s1", price: 450, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80",
      en: { title: "Hybrid Paddy Seeds (BPT 5204)", desc: "High yield, disease resistant rice seeds." },
      te: { title: "హైబ్రిడ్ వరి విత్తనాలు (BPT 5204)", desc: "అధిక దిగుబడి, తెగుళ్లను తట్టుకునే వరి విత్తనాలు." },
      hi: { title: "हाइब्रिड धान के बीज (BPT 5204)", desc: "उच्च उपज, बीमारी प्रतिरोधी चावल के बीज।" }
    },
    { id: "s2", price: 850, img: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=500&q=80",
      en: { title: "BT Cotton Seeds", desc: "Bollworm resistant quality cotton seed." },
      te: { title: "బిటి ప్రత్తి విత్తనాలు", desc: "కాయతొలిచే పురుగులను తట్టుకునే నాణ్యమైన విత్తనాలు." },
      hi: { title: "बीटी कपास के बीज", desc: "बोलवर्म प्रतिरोधी गुणवत्ता वाले कपास के बीज।" }
    },
    { id: "s3", price: 320, img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80",
      en: { title: "Hybrid Maize (Corn) Seeds", desc: "Fast growing hybrid corn variety." },
      te: { title: "హైబ్రిడ్ మొక్కజొన్న విత్తనాలు", desc: "వేగంగా పెరిగే హైబ్రిడ్ రకం." },
      hi: { title: "हाइब्रिड मक्का के बीज", desc: "तेजी से बढ़ने वाली हाइब्रिड मक्के की किस्म।" }
    },
    { id: "s4", price: 580, img: "https://dhanlaxmiseeds.com/wp-content/uploads/2024/08/wheat.png",
      en: { title: "High-Yield Wheat Seeds", desc: "Premium quality disease-free wheat." },
      te: { title: "అధిక దిగుబడి గోధుమ విత్తనాలు", desc: "ఉత్తమ నాణ్యత గల వ్యాధి రహిత గోధుమలు." },
      hi: { title: "उच्च उपज वाले गेहूं के बीज", desc: "प्रीमियम गुणवत्ता वाले रोगमुक्त गेहूं।" }
    },
    { id: "s5", price: 720, img: "https://res.cloudinary.com/dchek3sr8/image/upload/v1769149131/products/osrvyfbkv2g0tyq39k02.webp",
      en: { title: "Organic Chilli Seeds", desc: "Spicy variety with heavy branching." },
      te: { title: "సేంద్రీయ మిరప విత్తనాలు", desc: "ఎక్కువ కాపు కాసే ఘాటైన రకం." },
      hi: { title: "जैविक मिर्च के बीज", desc: "भारी शाखाओं वाली तीखी किस्म।" }
    },
    { id: "s6", price: 290, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KyEHB2Ab0eB2wy_TSgxdBoDHBSqycnkoL8drgA4FFA&s",
      en: { title: "Hybrid Tomato Seeds", desc: "Uniform red fruits, long shelf life." },
      te: { title: "హైబ్రిడ్ టమోటా విత్తనాలు", desc: "ఒకే పరిమాణంలో ఉండే ఎర్రటి టమోటాలు." },
      hi: { title: "हाइब्रिड टमाटर के बीज", desc: "समान लाल फल, लंबी शेल्फ लाइफ।" }
    },
    { id: "s7", price: 610, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShfKEDlPzbKrToTlIEs-YrGrBunJIRmSQQTAM7X7mdDhpmwBt_myqdHeQ&s=10",
      en: { title: "Mustard Seeds (Sarson)", desc: "High oil content yield seeds." },
      te: { title: "ఆవాల విత్తనాలు", desc: "అధిక నూనె శాతం ఇచ్చే విత్తనాలు." },
      hi: { title: "सरसों के बीज", desc: "उच्च तेल सामग्री वाली उपज के बीज।" }
    },
    { id: "s8", price: 490, img: "https://nagabazaar.com/cdn/shop/files/500-organic-yellow-soya-bean-whole-500gm-0-5-kg-rudra-original-imagpfp7begfhv6r.webp?v=1747522387",
      en: { title: "Soybean Seeds", desc: "Protein-rich germination certified." },
      te: { title: "సోయాబీన్ విత్తనాలు", desc: "ప్రోటీన్ లభించే సర్టిఫైడ్ విత్తనాలు." },
      hi: { title: "सोयाबीन के बीज", desc: "प्रोटीन से भरपूर अंकुरण प्रमाणित।" }
    },
    { id: "s9", price: 380, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_jOnjdivgzG9BhV7N7GmJ5pmRc1akl9X-0xPpVFm1SxI5J2fNvDrcK-I4&s=10",
      en: { title: "Sunflower Seeds", desc: "Drought resistant oilseed crop." },
      te: { title: "సూర్యకాంతి విత్తనాలు", desc: "నీటి ఎద్దడిని తట్టుకునే నూనెగింజల రకం." },
      hi: { title: "सूरजमुखी के बीज", desc: "सूखा प्रतिरोधी तिलहन फसल।" }
    },
    { id: "s10", price: 530, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nCVEZ_oXKEHlx5IcBiSafXT_o2wOrFVZye2cQPtU7A&s=10",
      en: { title: "Groundnut (Peanut) Seeds", desc: "Bold kernel high yielding variety." },
      te: { title: "వేరుశెనగ విత్తనాలు", desc: "లావుపాటి గింజలతో ఎక్కువ దిగుబడి ఇచ్చే రకం." },
      hi: { title: "मूंगफली के बीज", desc: "दानेदार उच्च उपज वाली किस्म।" }
    }
  ],
  fertilizers: [
    { id: "f1", price: 1350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDWJCTfU2iC6UrGfbX8Wlju2yRBy-SrAKL63dluRAxjEY8jj_JRkTeXkoM&s=10",
      en: { title: "NPK 19-19-19 Fertilizer", desc: "Balanced nutrient booster for all crops." },
      te: { title: "NPK 19-19-19 ఎరువులు", desc: "అన్ని రకాల పంటలకు సరిసమాన పోషకాలు." },
      hi: { title: "एनपीके 19-19-19 उर्वरक", desc: "सभी फसलों के लिए संतुलित पोषक तत्व।" }
    },
    { id: "f2", price: 280, img: "https://katyayanikrishidirect.com/cdn/shop/files/Dr_Neem_50000_64569b8f-6db1-4b16-aaa6-3d7412ad6e24.webp?v=1752905521",
      en: { title: "Neem Oil Pesticide (10000 PPM)", desc: "100% Organic pest control liquid." },
      te: { title: "వేప నూనె పురుగుమందు", desc: "100% సేంద్రీయ తెగుళ్ల నివారిణి." },
      hi: { title: "नीम तेल कीटनाशक", desc: "100% जैविक कीट नियंत्रण तरल।" }
    },
    { id: "f3", price: 450, img: "https://gogarden.co.in/cdn/shop/files/71yg6hRnpTL._SL1200_fac2b8e7-208b-482d-9493-07d03daaff6f.jpg?v=1741858085",
      en: { title: "Urea Fertilizer (46% N)", desc: "Essential nitrogen booster bag." },
      te: { title: "యూరియా ఎరువులు (46% N)", desc: "నత్రజనిని అందించే ముఖ్యమైన ఎరువు." },
      hi: { title: "यूरिया उर्वरक (46% N)", desc: "आवश्यक नाइट्रोजन बूस्टर बैग।" }
    },
    { id: "f4", price: 890, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkbJ67JK0K2jt4GJ1YAx48uV6BWLXomgcVO7moCjISJd-Iz6CNaUA0ex_M&s=10",
      en: { title: "DAP (Di-Ammonium Phosphate)", desc: "Root development specialist." },
      te: { title: "డి.ఎ.పి (DAP)", desc: "వేరు అభివృద్ధికి దోహదపడే ఎరువు." },
      hi: { title: "डीएपी (डी-अमोनियम फॉस्फेट)", desc: "जड़ विकास विशेषज्ञ।" }
    },
    { id: "f5", price: 350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAnp7CShTPuQULbBIzj6fF9gXsj6l8wEYLg1Gi1kdpZiU_pQ6bWtzLUw&s=10",
      en: { title: "Bio Fungicide Spray", desc: "Controls leaf spots, rust, and blights." },
      te: { title: "బయో ఫంగిసైడ్ స్ప్రే", desc: "ఆకుమచ్చ మరియు శిలీంధ్ర రోగాల నివారిణి." },
      hi: { title: "बायो कवकनाशी स्प्रे", desc: "पत्ती के धब्बे और झुलसा रोग को नियंत्रित करता है।" }
    },
    { id: "f6", price: 620, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jgZ87OmzGaTboCRLFs80BhA3g0m91t8ZOUua6tcFvOtYwSReUyOBw6Q&s=10",
      en: { title: "Potash (MOP 60%)", desc: "Improves grain quality and drought resistance." },
      te: { title: "పొటాష్ (MOP 60%)", desc: "గింజ నాణ్యతను మరియు ఊరు శక్తిని పెంచుతుంది." },
      hi: { title: "पोटाश (MOP 60%)", desc: "अनाज की गुणवत्ता और सूखा प्रतिरोध में सुधार करता है।" }
    },
    { id: "f7", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzFxVUVXBjeJ7sdu_UTN5rZ5PPn7viMgtOO_Xhcyltw7oiNSGMnTejFik&s=10",
      en: { title: "Micronutrient Mixture Fertilizer", desc: "Zinc, Iron, Boron, Manganese mix." },
      te: { title: "సూక్ష్మపోషకాల మిశ్రమం", desc: "జింక్, ఐరన్, బోరాన్ మిశ్రమం." },
      hi: { title: "सूक्ष्म पोषक तत्व मिश्रण उर्वरक", desc: "जिंक, आयरन, बोरोन, मैंगनीज का मिश्रण।" }
    },
    { id: "f8", price: 780, img: "https://utkarshagro.com/cdn/shop/files/HumicAcidEco_4.webp?v=1783408290&width=1214",
      en: { title: "Humic Acid Plant Growth Enhancer", desc: "Stimulates roots and soil quality." },
      te: { title: "హ్యూమిక్ యాసిడ్ గ్రోత్ ప్రమోటర్", desc: "వేర్లు మరియు నేల నాణ్యతను పెంచుతుంది." },
      hi: { title: "ह्यूमिक एसिड प्लांट ग्रोथ एनहांसर", desc: "जड़ों और मिट्टी की गुणवत्ता को उत्तेजित करता है।" }
    },
    { id: "f9", price: 510, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyNCck1CCdbUeInpWDs8rKTA7jFToIjB1ewUgeYLRG7YaEjGn8B0hW2A&s=10",
      en: { title: "Broad Spectrum Insecticide", desc: "Effective against sucking pests." },
      te: { title: "కీటక నాశిని (ఇన్సెక్టిసైడ్)", desc: "రసం పీల్చే పురుగుల నివారణకు పనిచేస్తుంది." },
      hi: { title: "व्यापक स्पेक्ट्रम कीटनाशक", desc: "चूसक कीटों के खिलाफ प्रभावी।" }
    },
    { id: "f10", price: 290, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPQOdetEm3APWCcIK1DGDXR5XdzdMrhI5JmpOuhueahiK25nvxGTI60NP&s=10",
      en: { title: "Vermicompost Organic Fertilizer", desc: "100% Pure earthworm compost." },
      te: { title: "వర్మీకంపోస్ట్ సేంద్రీయ ఎరువు", desc: "100% స్వచ్ఛమైన వానపాముల ఎరువు." },
      hi: { title: "वर्मीकंपोस्ट जैविक उर्वरक", desc: "100% शुद्ध केंचुआ खाद।" }
    }
  ],
  machines: [
    { id: "m1", price: 1200, img: "https://cdn.dotpe.in/longtail/store-logo/5892510/cIrWmwna.jpeg",
      en: { title: "Tractor Rental (45 HP)", desc: "Per hour rental with driver." },
      te: { title: "ట్రాక్టర్ అద్దె (45 HP)", desc: "డ్రైవర్‌తో సహా గంటల ప్రకారం అద్దె." },
      hi: { title: "ट्रैक्टर किराया (45 HP)", desc: "चालक के साथ प्रति घंटे की दर से किराया।" }
    },
    { id: "m2", price: 2500, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40zg0E7FqZtSkiOrPJx0Fr_k1pgxR5nbcHwMrKey6AUF5t-TUnQAdsaA&s=10",
      en: { title: "Paddy Combine Harvester", desc: "Efficient harvesting & threshing." },
      te: { title: "వరి కోత మిషన్ (హార్వెస్టర్)", desc: "వేగంగా కోత మరియు నూర్పిడి సదుపాయం." },
      hi: { title: "धान कंबाइन हार्वेस्टर", desc: "कुशल कटाई और गहाई।" }
    },
    { id: "m3", price: 800, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCni8Kd_E4JiIwDU5ZnzdUev4gpFQdlbXcJGk-1nS5h-nAX9KwIwywSkU&s=10",
      en: { title: "Rotavator Attachment", desc: "Soil tilling rental per acre." },
      te: { title: "రోటవేటర్ అద్దె", desc: "ఎకరా చొప్పున దుక్కి దున్నే మిషన్." },
      hi: { title: "रोटावेटर अटैचमेंट", desc: "प्रति एकड़ मिट्टी जोतने का किराया।" }
    },
    { id: "m4", price: 1500, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7spB0pmF5IsbfGw8fonmw1l_MM4BqLOtLsV5zT5AmSvXbm6f5iDOzloUV&s=10",
      en: { title: "Agriculture Drone Sprayer", desc: "Precision aerial pesticide spraying." },
      te: { title: "డ్రోన్ స్ప్రేయర్ అద్దె", desc: "గాల్లోంచి పురుగుమందులు పిచికారీ చేసే డ్రోన్." },
      hi: { title: "कृषि ड्रोन स्प्रेयर", desc: "सटीक हवाई कीटनाशक छिड़काव।" }
    },
    { id: "m5", price: 600, img: "https://www.mahindratractor.com/sites/default/files/2025-03/Blog-02-Power%20Tiller%20Uses%20Types%20%26%20Benefits%20%E2%80%93%20A%20Complete%20Guide-Detail.webp",
      en: { title: "Power Tiller", desc: "Hand-operated compact field cultivator." },
      te: { title: "పవర్ టిల్లర్", desc: "చిన్న పొలాలకు ఉపయోగపడే పవర్ టిల్లర్." },
      hi: { title: "पावर टिलर", desc: "हाथ से संचालित छोटा खेत जोतने का यंत्र।" }
    },
    { id: "m6", price: 400, img: "https://m.media-amazon.com/images/I/61svDkozDqL._AC_UF1000,1000_QL80_.jpg",
      en: { title: "Battery Powered Sprayer Pump", desc: "16 Litre continuous pressure pump." },
      te: { title: "బ్యాటరీ స్ప్రేయర్ పంపు", desc: "16 లీటర్ల సామర్థ్యం గల స్ప్రే పంపు." },
      hi: { title: "बैटरी से चलने वाला स्प्रेयर पंप", desc: "16 लीटर निरंतर दबाव पंप।" }
    },
    { id: "m7", price: 1800, img: "https://mahindrafarmmachinery.com/sites/default/files/2024-07/20.What%20Are%20The%20Key%20Features%20Of%20Paddy%20Transplanter_2.jpg",
      en: { title: "Automatic Rice Transplanter", desc: "Paddy seedling planting rental." },
      te: { title: "వరి నాటు వేసే మిషన్", desc: "సులువుగా వరి నాట్లు వేసే యంత్రం." },
      hi: { title: "स्वचालित धान रोपाई मशीन", desc: "धान के पौधों की रोपाई का किराया।" }
    },
    { id: "m8", price: 950, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHZBAn54IebsSeQhhQ-VtbdQ6LARGMMCGwteBcSYnXSQ&s=10",
      en: { title: "Multi-Crop Thresher", desc: "Grain separation for maize, wheat, pulses." },
      te: { title: "మల్టీ క్రాప్ థ్రెషర్", desc: "ధాన్యాన్ని వేరుచేసే నూర్పిడి మిషన్." },
      hi: { title: "मल्टी-क्रॉप थ्रेशर", desc: "मक्का, गेहूं, दालों के लिए अनाज पृथक्करण।" }
    },
    { id: "m9", price: 500, img: "https://5.imimg.com/data5/SELLER/Default/2025/6/520589786/EE/BP/NP/72149682/3-hp-solar-water-pumping-system-500x500.jpeg",
      en: { title: "Solar Water Pump System (Portable)", desc: "Temporary field irrigation pump." },
      te: { title: "సోలార్ వాటర్ పంప్ సెట్", desc: "తాత్కాలిక నీటి పారుదల సోలార్ పంపు." },
      hi: { title: "सौर जल पंप प्रणाली", desc: "अस्थायी खेत सिंचाई पंप।" }
    },
    { id: "m10", price: 700, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAKZ16nNzs_pXy0wPL-gc5I6qnDTUh-TXF0xN0jZpWHEuBwxI70jb9nfA&s=10",
      en: { title: "Brush Cutter & Weeder Machine", desc: "Weed removal machine for orchards." },
      te: { title: "కలుపు తీసే మిషన్ (వీడర్)", desc: "పొలాల్లో కలుపును త్వరగా తొలగించే పరికరం." },
      hi: { title: "ब्रश कटर और निराई मशीन", desc: "बगीचों के लिए खरपतवार हटाने की मशीन।" }
    }
  ],
  waste: [
    { id: "w1", price: 220, img: "https://m.media-amazon.com/images/I/61PPSFJXW4L._AC_UF1000,1000_QL80_.jpg",
      en: { title: "Bio-Decomposer Powder", desc: "Converts paddy stubble into rich compost." },
      te: { title: "బయో-డికంపోజర్ పౌడర్", desc: "వరి వ్యర్థాలను త్వరగా ఎరువుగా మార్చే పొడి." },
      hi: { title: "बायो-डीकंपोजर पाउडर", desc: "धान के अवशेषों को समृद्ध खाद में बदलता है।" }
    },
    { id: "w2", price: 300, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSParnLtRRxykHtmSzyOfO2yTvMybSY1_mX59OLv7XMiQ&s=10",
      en: { title: "Compressed Straw Bales", desc: "Fodder & mulching straw packs." },
      te: { title: "గడ్డి మోపులు (స్ట్రా బెయిల్స్)", desc: "పశువుల మేత మరియు నేల కప్పే గడ్డి." },
      hi: { title: "संपीड़ित पुआल के बंडल", desc: "चारा और मल्चिंग पुआल पैक।" }
    },
    { id: "w3", price: 400, img: "https://i5.walmartimages.com/seo/Biochar-100-Pure-Biochar-1-cu-ft_90ad843d-da1e-45f6-8974-9511facef78e.9bb19d3f61e80a4c4fdabf7ca0daa620.jpeg",
      en: { title: "Biochar Soil Conditioner", desc: "Enhances soil water holding capacity." },
      te: { title: "బయోచార్ సోయిల్ కండిషనర్", desc: "నేలలో నీటిని నిల్వ ఉంచే శక్తిని పెంచుతుంది." },
      hi: { title: "बायोचार मृदा सुधारक", desc: "मिट्टी की जल धारण क्षमता को बढ़ाता है।" }
    },
    { id: "w4", price: 180, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzuUUVMv_LwmZnXfA67b7aNHuF4ZK3KTpSPncEg3LYZlPjfKmmIy9z0o&s=10",
      en: { title: "Cocopeat Brick (5 Kg)", desc: "Coir waste root growing medium." },
      te: { title: "కోకోపీట్ బ్రిక్ (5 కేజీలు)", desc: "కొబ్బరి పీచుతో చేసిన మొక్కల పెరగుదల ఇటుక." },
      hi: { title: "कोकोपीट ब्रिक (5 किग्रा)", desc: "नारियल की भूसी से बना माध्यम।" }
    },
    { id: "w5", price: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYKQiASRJSucPFV6a0knhfyTXClYFI-FHDqfhSvR69N1-dFGyXIBfIWc&s=10",
      en: { title: "Rice Husk Fuel Pellets", desc: "Eco-friendly biomass heating pellets." },
      te: { title: "వరి పొట్టు ఇంధన పెల్లెట్లు", desc: "పరిసరాలకు మేలు చేసే బయోమాస్ ఇంధనం." },
      hi: { title: "चावल की भूसी के ईंधन छर्रे", desc: "पर्यावरण के अनुकूल बायोमास छर्रे।" }
    },
    { id: "w6", price: 150, img: "https://cdn.shopify.com/s/files/1/0550/9401/8125/files/1_5_11_480x480.jpg?v=1718795047",
      en: { title: "Organic Crop Mulching Sheet", desc: "Prevents weed growth and retains moisture." },
      te: { title: "మల్చింగ్ షీట్", desc: "కలుపు మొక్కలను నివారించే ప్లాస్టిక్ షీట్." },
      hi: { title: "जैविक फसल मल्चिंग शीट", desc: "खरपतवार की वृद्धि को रोकता है।" }
    },
    { id: "w7", price: 320, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTNuqpSNpjA8njv7-NQ-fDxmKkDxrl2Gx0omgS3apf7VJa2TPKS-mXQCLO&s=10",
      en: { title: "Pressmud Sugar Waste Compost", desc: "Rich in organic matter and calcium." },
      te: { title: "ప్రెస్‌ముడ్ సేంద్రీయ ఎరువు", desc: "చెరకు పరిశ్రమ వ్యర్థాలతో చేసిన నాణ్యమైన ఎరువు." },
      hi: { title: "प्रेसमड चीनी अपशिष्ट खाद", desc: "जैविक पदार्थों और कैल्शियम से भरपूर।" }
    },
    { id: "w8", price: 270, img: "https://m.media-amazon.com/images/I/71smqL0+l1L._AC_UF1000,1000_QL80_.jpg",
      en: { title: "Mustard Cake Powder", desc: "Organic fertilizer and pest repellent." },
      te: { title: "ఆవాల పిండి (మస్టర్డ్ కేక్)", desc: "సేంద్రీయ ఎరువు మరియు తెగుళ్ల నివారిణి." },
      hi: { title: "सरसों की खल का पाउडर", desc: "जैविक उर्वरक और कीट विकर्षक।" }
    },
    { id: "w9", price: 210, img: "https://5.imimg.com/data5/SELLER/Default/2022/6/KB/MT/DX/16014827/ground-nut-shell-briquettes-500x500.jpg",
      en: { title: "Groundnut Shell Briquettes", desc: "Biomass fuel made from peanut waste." },
      te: { title: "వేరుశెనగ పొట్టు బ్రిక్స్‌లు", desc: "వేరుశెనగ పొట్టుతో తయారుచేసిన ఇంధన దుంగలు." },
      hi: { title: "मूंगफली के छिलके के ब्रिकेट", desc: "मूंगफली के कचरे से बना बायोमास ईंधन।" }
    },
    { id: "w10", price: 190, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0aiZYftAvzxIo54rcEAw1nKOhyUOEmcXac0seKtx4g&s=10",
      en: { title: "Cow Dung Microbe Pot", desc: "Biodegradable seedling cups." },
      te: { title: "ఆవు పేడ మొక్కల కప్పులు", desc: "భూమిలో కరిగిపోయే ప్రకృతి సిద్ధమైన కప్పులు." },
      hi: { title: "गोबर माइक्रोब पॉट", desc: "बायोडिग्रेडेबल अंकुर कप।" }
    }
  ]
};

export default function App() {
  const [currentLang, setCurrentLang] = useState("en");
  const [currentCategory, setCurrentCategory] = useState("seeds");
  const [cart, setCart] = useState([]);
  const [authMode, setAuthMode] = useState("login");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [voiceStatus, setVoiceStatus] = useState("");

  const t = translations[currentLang];
  const currentProducts = productsData[currentCategory] || [];

  const addToCart = (id) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { id, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + delta };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setAuthMessage("Please enter valid 10-digit number.");
      return;
    }
    const endpoint = authMode === "login" ? "login" : "register";
    const result = await authenticateUser(endpoint, { mobile, password });
    
    if (result.error) {
      setAuthMessage(result.error);
    } else {
      setAuthMessage(result.message);
    }
  };

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      let prod = null;
      for (let cat in productsData) {
        const found = productsData[cat].find((p) => p.id === item.id);
        if (found) {
          prod = found;
          break;
        }
      }
      return sum + (prod ? prod.price * item.qty : 0);
    }, 0);
  };

  // --- FULL RAZORPAY & COD PAYMENT INTEGRATION ---
  const handlePayment = async (method) => {
    if (cart.length === 0) return;
    const totalAmount = calculateTotal();

    if (method === "razorpay") {
      try {
        const res = await fetch("https://smart-crop-backend-0qon.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount })
        });
        
        if (!res.ok) {
          setCheckoutMessage("Server error while creating order.");
          return;
        }

        const order = await res.json();

        const options = {
          key: "rzp_test_TrldfZZ2ZgqoCG", // Your test key ID
          amount: order.amount,
          currency: order.currency,
          name: "Smart Crop Store",
          description: "Agricultural Products Purchase",
          order_id: order.id,
          handler: async function (response) {
            const orderData = {
              mobile: mobile || "GuestUser",
              items: cart,
              totalAmount: totalAmount,
              paymentMethod: "razorpay",
              paymentId: response.razorpay_payment_id
            };
            
            const saveRes = await submitOrder(orderData);
            setCheckoutMessage(saveRes.message || "Payment successful!");
            setCart([]);
          },
          theme: { color: "#2E7D32" }
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setCheckoutMessage("Razorpay SDK failed to load.");
        }
      } catch (err) {
        setCheckoutMessage("Error launching Razorpay checkout.");
      }
    } else {
      const orderData = {
        mobile: mobile || "GuestUser",
        items: cart,
        totalAmount: totalAmount,
        paymentMethod: "cod"
      };
      const result = await submitOrder(orderData);
      setCheckoutMessage(result.message || "Order placed successfully!");
      if (!result.error) {
        setCart([]);
      }
    }
  };
  // --- REAL BROWSER SPEECH RECOGNITION VOICE ASSISTANT ---
  const handleVoiceAssistant = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === "te" ? "te-IN" : currentLang === "hi" ? "hi-IN" : "en-US";
    setVoiceStatus(currentLang === "te" ? "వింటోంది..." : currentLang === "hi" ? "सुन रहा है..." : "Listening...");
    
    try {
      recognition.start();
    } catch (e) {
      console.error("Recognition start error:", e);
    }

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Voice heard:", speechText);
      
      // Questions and Answers Logic
      if (speechText.includes("how are you") || speechText.includes("ela unnav")) {
        setVoiceStatus("I'm doing great! How can I help your crops today?");
      } else if (speechText.includes("what is this store") || speechText.includes("smart crop store")) {
        setVoiceStatus("This is Smart Crop Store, your one-stop shop for seeds, fertilizers, and machines.");
      } else if (speechText.includes("hi") || speechText.includes("hello") || speechText.includes("హలో") || speechText.includes("नमस्ते")) {
        setVoiceStatus("Hello! Ask me anything about farming, seeds, or store products.");
      } 
      // General Farming / Store Queries
      else if (speechText.includes("price") || speechText.includes("cost") || speechText.includes("rate")) {
        setVoiceStatus("You can check product prices directly listed under each category card.");
      } else if (speechText.includes("location") || speechText.includes("address") || speechText.includes("where")) {
        setVoiceStatus("Smart Crop Store operates digitally to deliver farming essentials right to your farm.");
      } else if (speechText.includes("help") || speechText.includes("support")) {
        setVoiceStatus("I can help you navigate categories, check products, and answer farming queries!");
      }
      // Keyword matching for categories
      else if (speechText.includes("seed") || speechText.includes("విత్తనాలు") || speechText.includes("बीज")) {
        setCurrentCategory("seeds");
        setVoiceStatus(currentLang === "te" ? "విత్తనాలు చూపించబడుతున్నాయి" : "Showing Seeds");
      } else if (speechText.includes("fertilizer") || speechText.includes("ఎరువులు") || speechText.includes("उर्वरक")) {
        setCurrentCategory("fertilizers");
        setVoiceStatus(currentLang === "te" ? "ఎరువులు చూపించబడుతున్నాయి" : "Showing Fertilizers");
      } else if (speechText.includes("machine") || speechText.includes("యంత్రాలు") || speechText.includes("मशीन")) {
        setCurrentCategory("machines");
        setVoiceStatus(currentLang === "te" ? "యంత్రాలు చూపించబడుతున్నాయి" : "Showing Machines");
      } else if (speechText.includes("waste") || speechText.includes("వ్యర్థాల") || speechText.includes("अपशिष्ट")) {
        setCurrentCategory("waste");
        setVoiceStatus(currentLang === "te" ? "వ్యర్థ పదార్థాలు చూపించబడుతున్నాయి" : "Showing Farm Waste");
      } 
      // Smart Catch-all for any other question
      else {
        setVoiceStatus(`Got it: "${speechText}". I am here to assist with all your farming needs!`);
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setVoiceStatus(t.voiceAssistant);
    };
  };
  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="topbar">
        <a className="brand" href="#">
          🌱 <span>{t.brandName}</span>
        </a>
        <div className="top-actions">
          <button
            className={`lang ${currentLang === "en" ? "active" : ""}`}
            onClick={() => setCurrentLang("en")}
          >
            English
          </button>
          <button
            className={`lang ${currentLang === "te" ? "active" : ""}`}
            onClick={() => setCurrentLang("te")}
          >
            తెలుగు
          </button>
          <button
            className={`lang ${currentLang === "hi" ? "active" : ""}`}
            onClick={() => setCurrentLang("hi")}
          >
            हिन्दी
          </button>
          <button
            id="cartJump"
            className="cart-pill"
            onClick={() =>
              document
                .getElementById("cartPanel")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            🛒 <span>{totalCount}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <h1 dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
          <p>{t.heroText}</p>
          <button
            id="getStarted"
            className="primary-btn"
            onClick={() =>
              document
                .getElementById("storeSection")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t.getStarted}
          </button>
        </div>
      </section>

      {/* Main Layout */}
      <main className="page-layout">
        <div className="main-column">
          {/* Auth Section */}
          <section id="authSection" className="welcome-auth">
            <div className="welcome-copy">
              <div className="welcome-icon">🌿</div>
              <h2>{t.welcome}</h2>
              <p>{t.welcomeText}</p>
            </div>

            <div className="auth-card">
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${authMode === "login" ? "active" : ""}`}
                  onClick={() => setAuthMode("login")}
                >
                  {t.login}
                </button>
                <button
                  className={`auth-tab ${
                    authMode === "register" ? "active" : ""
                  }`}
                  onClick={() => setAuthMode("register")}
                >
                  {t.register}
                </button>
              </div>

              <p className="form-note">{t.mobileNote}</p>

              <form onSubmit={handleAuthSubmit}>
                <label className="input-wrap">
                  <span>📱</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </label>

                <label className="input-wrap">
                  <span>🔒</span>
                  <input
                    type="password"
                    minLength="6"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>

                <button id="authSubmit" className="submit-btn" type="submit">
                  {authMode === "login" ? t.login : t.register}
                </button>
              </form>

              {authMessage && <p className="auth-message">{authMessage}</p>}
              <p className="switch-auth">
                <span>
                  {authMode === "login" ? t.noAccount : t.haveAccount}
                </span>
                <button
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                >
                  {authMode === "login" ? t.register : t.login}
                </button>
              </p>
            </div>
          </section>

          {/* Store Section */}
          <section className="store-section" id="storeSection">
            <div className="section-heading">
              <h2>
                🌿 <span>{t.featuresTitle}</span>
              </h2>
              <p>{t.featuresSubtitle}</p>
            </div>

            <nav className="category-nav">
              {["seeds", "fertilizers", "machines", "waste"].map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${
                    currentCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setCurrentCategory(cat)}
                >
                  {t[cat]}
                </button>
              ))}
            </nav>

            <div className="category-intro">
              <div>
                <h3>{t[currentCategory]}</h3>
                <p>{t.footerText}</p>
              </div>
              <span className="product-count">
                {currentProducts.length} items
              </span>
            </div>

            {/* Product Grid */}
            <div id="productGrid" className="product-grid">
              {currentProducts.map((p) => {
                const info = p[currentLang] || p.en;
                return (
                  <div key={p.id} className="product-card">
                    <img src={p.img} alt={info.title} loading="lazy" />
                    <div className="product-details">
                      <h4>{info.title}</h4>
                      <p>{info.desc}</p>
                      <div className="product-bottom">
                        <span className="product-price">₹{p.price}</span>
                        <button
                          className="add-btn"
                          onClick={() => addToCart(p.id)}
                        >
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Cart Panel */}
        <aside className="cart-card" id="cartPanel">
          <div className="cart-heading">
            <h2>
              🛒 <span>{t.yourCart}</span>
            </h2>
            <button
              id="clearCart"
              aria-label="Clear cart"
              onClick={() => setCart([])}
            >
              ×
            </button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon">🛒</div>
                <strong>{t.emptyCart}</strong>
                <p>{t.emptyCartText}</p>
              </div>
            ) : (
              cart.map((item) => {
                let prod = null;
                for (let cat in productsData) {
                  const found = productsData[cat].find((p) => p.id === item.id);
                  if (found) {
                    prod = found;
                    break;
                  }
                }
                if (!prod) return null;
                const info = prod[currentLang] || prod.en;
                const subtotal = prod.price * item.qty;

                return (
                  <div key={item.id} className="cart-item">
                    <div>
                      <div className="cart-item-title">{info.title}</div>
                      <div className="cart-item-price">
                        ₹{prod.price} x {item.qty} = ₹{subtotal}
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-total">
                <span>{t.total}:</span>
                <strong>₹{calculateTotal()}</strong>
              </div>
              <div className="checkout-actions">
                <button
                  className="pay-btn primary"
                  onClick={() => handlePayment("razorpay")}
                >
                  {t.pay}
                </button>
                <button
                  className="pay-btn secondary"
                  onClick={() => handlePayment("cod")}
                >
                  {t.cod}
                </button>
              </div>
              {checkoutMessage && (
                <p className="checkout-message">{checkoutMessage}</p>
              )}
            </div>
          )}
        </aside>
      </main>

      {/* Floating Voice Assistant Widget */}
      <button
        className="voice-assistant-fab"
        onClick={handleVoiceAssistant}
        title={t.voiceAssistant}
      >
        🎙️ {voiceStatus || t.voiceAssistant}
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p>© 2026 {t.brandName}. {t.footerText}</p>
          <p className="footer-phone">
            📞 {t.contactLabel}: <a href="tel:8328554637">8328554637</a>
          </p>
        </div>
      </footer>
    </div>
  );
}