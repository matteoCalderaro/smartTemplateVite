const applications = [
  {
    path: 'home',
    isHome: true,
    name: 'Home Page Content', // Can be customized later
    heroContent: {
      brand: '(Be) Bi Smart',
      icon: '',
      payhoff: 'La Business Intelligence prende il volo, sempre più Smart con AI e ML',
      descriptions: [
        'Accelera l\'innovazione con decisioni rapide e informate',
        "Offre visione chiara e predittiva per il successo",
        'Trasforma i dati in conoscenza strategica',
      ],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "La suite di applicazioni intelligenti!",
      cards: [
        {
          icon: "bi-mic-fill",
          title: "Voice 2 Insights",
          description: "Trasforma le tue conversazioni in insight strategici per decisioni rapide!",
          path: "voice-to-insights" // Added path
        },
        {
          icon: "bi-whatsapp",
          title: "Waq",
          description: "Offri assistenza clienti immediata 24/7 via WhatsApp, riducendo il carico del tuo team!",
          path: "waq" // Added path
        },
        {
          icon: "bi-currency-euro",
          title: "Smart Pricing",
          description: "Ottimizza i prezzi in tempo reale con l'AI, massimizzando margini e competitività!",
          path: "smart-pricing" // Added path
        },
        {
          icon: "bi-person-check-fill",
          title: "Stay on",
          description: "Prevedi l'abbandono dei clienti e attiva strategie di fidelizzazione mirate per aumentare la retention!",
          path: "stay-on" // Added path
        },
        {
          icon: "bi-chat-heart-fill",
          title: "Sentiment",
          description: "Monitora la reputazione del tuo brand analizzando il sentiment di clienti e utenti su recensioni e social!",
          path: "sentiment" // Added path
        },
        {
          icon: "bi-cloud-download",
          title: "Sales Predict",
          description: "Anticipa i trend di vendita con previsioni accurate, ottimizzando pianificazione e strategie commerciali!",
          path: "sales-predict" // Added path
        },
        {
          icon: "bi-broadcast",
          title: "Wap",
          description: "Automatizza l'invio di report e documenti via WhatsApp, comunicando dati e informazioni in tempo reale!",
          path: "wap" // Added path
        }
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
        text: 'Automatizza la raccolta di informazioni usando la voce degli utenti',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
        text: 'Trasforma l\'audio in informazioni strategiche strutturate da sincronizzare in azienda',
      },
    },
  },
  {
    path: 'voice-to-insights',
    name: 'Voice 2 Insights',
    heroContent: {
      brand: 'Voice 2 Insights',
      icon: 'bi bi-mic-fill',
      payhoff: 'La Business Intelligence prende il volo, sempre più smart con AI e ML',
      descriptions: [
        'Analizza le informazioni per topic, sentiment, urgenza e rilevanza',
        "Aiuta l\'utente nel fornire dettagli completi",
        'Integrabile via dashboard/API con CRM e tool aziendali',
      ],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        {
          icon: "bi-lightning-charge-fill",
          title: "Accesso Immediato",
          description: "Accedi subito ai contenuti nascosti nelle conversazioni per non perdere nessuna opportunità!"
        },
        {
          icon: "bi-robot",
          title: "Automazione Intelligente",
          description: "Automatizza reportistica e classificazione delle interazioni per risparmiare tempo prezioso!"
        },
        {
          icon: "bi-graph-up-arrow",
          title: "Migliora i Processi",
          description: "Ottimizza la gestione del customer feedback e dei processi di vendita grazie a dati concreti!"
        },
        {
          icon: "bi-lightbulb-fill",
          title: "Decisioni Basate sui Dati",
          description: "Prendi decisioni strategiche basate su insight reali e non su sensazioni!"
        }
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voiceToInsights/voice.mp4',
        desktop: '/media/video/desktop/voiceToInsights/voice.mp4',
        text: 'Automatizza la raccolta di informazioni usando la voce degli utenti',
      },
      insights: {
        mobile: '/media/video/mobile/voiceToInsights/insights.mp4',
        desktop: '/media/video/desktop/voiceToInsights/insights.mp4',
        text: 'Trasforma l\'audio in informazioni strategiche strutturate da sincronizzare in azienda',
      },
    },
  },
  {
    path: 'waq',
    name: 'WAQ',
    heroContent: {
      brand: 'WAQ',
      icon: 'bi bi-whatsapp',
      payhoff: 'Il WhatsApp Bot offre un customer service immediato e multicanale, automatizzando le richieste più comuni. Attivo 24/7, riduce il carico dei team interni e migliora l’esperienza dei clienti',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        { icon: 'bi-headset', title: 'Assistenza immediata clienti', description: 'Offri supporto istantaneo e migliora la soddisfazione!' },
        { icon: 'bi-chat-dots', title: 'FAQ automatizzate', description: 'Rispondi alle domande comuni senza intervento umano!' },
        { icon: 'bi-arrows-fullscreen', title: 'Esperienza omnicanale fluida', description: 'Integra WhatsApp con gli altri tuoi canali di comunicazione!' },
        { icon: 'bi-speedometer2', title: 'Carico team ridotto', description: 'Libera il tuo team per concentrarsi su compiti a maggior valore!' },
      ]
    },
    videoPaths: {
      video_1: {
        mobile: '/media/video/desktop/waq/waq-1.mp4',
        desktop: '/media/video/desktop/waq/waq-1.mp4',
        text: 'Testo video 1',
      },
      video_2: {
        mobile: '/media/video/desktop/waq/waq-2.mp4',
        desktop: '/media/video/desktop/waq/waq-2.mp4',
        text: 'Testo video 2',
      },
    },
  },
  {
    path: 'smart-pricing',
    name: 'Smart Pricing',
    heroContent: {
      brand: 'Smart Pricing',
      icon: 'bi bi-currency-euro',
      payhoff: 'SmartPricing utilizza algoritmi di Machine Learning per ottimizzare prezzi in base a domanda, stagionalità e comportamento dei clienti, massimizzando margini e competitività',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        { icon: 'bi-graph-up-arrow', title: 'Prezzi dinamici ottimali', description: 'Adatta i prezzi in tempo reale per massimizzare i profitti!' },
        { icon: 'bi-percent', title: 'Aumento marginalità', description: 'Migliora i margini di guadagno su ogni vendita!' },
        { icon: 'bi-lightning-charge', title: 'Reattività al mercato', description: 'Rispondi rapidamente alle mosse dei competitor e ai cambiamenti della domanda!' },
        { icon: 'bi-bullseye', title: 'Strategie di vendita mirate', description: 'Crea offerte personalizzate basate sui dati dei clienti!' },
      ]
    },
    videoPaths: {
      video_1: {
        mobile: '/media/video/desktop/smart-pricing.mp4',
        desktop: '/media/video/desktop/smart-pricing.mp4',
        text: 'Testo video 1',
      }
    },
  },
  {
    path: 'stay-on',
    name: 'Stay On',
    heroContent: {
      brand: 'Stay On',
      icon: 'bi bi-person-check-fill',
      payhoff: 'StayOn è la soluzione predittiva che analizza i comportamenti dei clienti per individuare segnali di abbandono. Permette di attivare strategie mirate di fidelizzazione, migliorando la retention e riducendo i costi di acquisizione',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        { icon: 'bi-person-x-fill', title: 'Previsione abbandono clienti', description: 'Anticipa quali clienti sono a rischio e agisci in tempo!' },
        { icon: 'bi-funnel', title: 'Strategie di retention personalizzate', description: 'Crea campagne mirate per trattenere i clienti!' },
        { icon: 'bi-lightbulb', title: 'Insight predittivi immediati', description: 'Ottieni subito informazioni preziose sul comportamento dei clienti!' },
        { icon: 'bi-heart-fill', title: 'Aumento loyalty e ricavi', description: 'Fidelizza i clienti e aumenta il loro valore nel tempo!' },
      ]
    },
    videoPaths: {
      video_1: {
        mobile: '/media/video/desktop/stay-on.mp4',
        desktop: '/media/video/desktop/stay-on.mp4',
        text: 'Testo video 1',
      }
    },
  },
  {
    path: 'sentiment',
    name: 'Sentiment',
    heroContent: {
      brand: 'Sentiment',
      icon: 'bi bi-chat-heart-fill',
      payhoff: 'Analizza in automatico recensioni, social e contenuti online per comprendere come clienti e utenti percepiscono il brand, prodotti e servizi. Classifica i feedback per tono (positivo, neutro, negativo) e per argomento',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        { icon: 'bi-eyeglasses', title: 'Monitoraggio reputazione in tempo reale', description: 'Tieni sotto controllo cosa si dice del tuo brand online!' },
        { icon: 'bi-tools', title: 'Insight azionabili', description: 'Ottieni spunti per migliorare marketing, customer care e prodotti!' },
        { icon: 'bi-bar-chart-line', title: 'Benchmarking con i competitor', description: 'Confronta la tua performance con quella dei concorrenti!' },
        { icon: 'bi-bell-fill', title: 'Alert automatici su criticità', description: 'Ricevi notifiche immediate su problemi emergenti!' },
      ]
    },
    videoPaths: {
      video_1: {
        mobile: '/media/video/desktop/sentiment.mp4',
        desktop: '/media/video/desktop/sentiment.mp4',
        text: 'Testo video 1',
      }
    },
  },
  {
    path: 'sales-predict',
    name: 'Sales Predict',
    heroContent: {
      brand: 'Sales Predict',
      icon: 'bi bi-cloud-download',
      payhoff: 'Sales Predict applica modelli predittivi per stimare l’andamento delle vendite, anticipando trend e variazioni di mercato. Consente di pianificare con precisione, ottimizzare scorte e supportare la forza commerciale',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        { icon: 'bi-graph-up', title: 'Previsioni accurate vendite', description: 'Pianifica con maggiore sicurezza basandoti su dati affidabili!' },
        { icon: 'bi-briefcase', title: 'Pianificazione strategica ottimizzata', description: 'Migliora l\'allocazione delle risorse e la gestione del budget!' },
        { icon: 'bi-person-gear', title: 'Maggior efficienza commerciale', description: 'Supporta il tuo team di vendita con informazioni strategiche!' },
        { icon: 'bi-box-seam', title: 'Gestione scorte migliorata', description: 'Evita rotture di stock e ottimizza i livelli di inventario!' },
      ]
    },
    videoPaths: {
      video_1: {
        mobile: '/media/video/desktop/sales-predict.mp4',
        desktop: '/media/video/desktop/sales-predict.mp4',
        text: 'Testo video 1',
      }
    },
  },
  {
    path: 'wap',
    name: 'WAP',
    heroContent: {
      brand: 'WAP',
      icon: 'bi bi-broadcast',
      payhoff: 'Con WAP (WhatsApp Push) puoi automatizzare l’invio di immagini, PDF o report (ad esempio da Qlik) direttamente su WhatsApp. Un canale rapido e affidabile per condividere dati e informazioni in tempo reale',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "4 motivi per non poterne più fare a meno!",
      cards: [
        { icon: 'bi-robot', title: 'Automatizza gli invii, elimina gli errori', description: 'Riduci il lavoro manuale e garantisci la precisione!' },
        { icon: 'bi-arrows-expand', title: 'Scala facilmente, senza perdere controllo', description: 'Invia comunicazioni a un gran numero di contatti!' },
        { icon: 'bi-chat-right-text-fill', title: 'Comunica in tempo reale, dove tutti leggono', description: 'Sfrutta il canale di comunicazione più usato al mondo!' },
        { icon: 'bi-share', title: 'Integra WAP con Qlik, CRM ed ERP', description: 'Collega i tuoi sistemi aziendali per un flusso di dati automatizzato!' },
      ]
    },
    videoPaths: {
      video_1: {
        mobile: '/media/video/desktop/wap/wap-1.mp4',
        desktop: '/media/video/desktop/wap/wap-1.mp4',
        text: 'Testo video 1',
      },
      video_2: {
        mobile: '/media/video/desktop/wap/wap-2.mp4',
        desktop: '/media/video/desktop/wap/wap-2.mp4',
        text: 'Testo video 2',
      },
    },
  },
];

export default applications;