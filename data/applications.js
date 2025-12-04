const applications = [
  {
    path: 'voice-to-insights',
    name: 'Voice 2 Insights',
    heroContent: {
      brand: 'Voice 2 Insights',
      icon: 'bi bi-mic-fill',
      payhoff: 'Trasforma registrazioni (customer service, field agent, meeting, interviste) in testo strutturato',
      descriptions: [
        'Analizza le informazioni per topic, sentiment, urgenza e rilevanza',
        "Aiuta l\'utente nel fornire dettagli completi",
        'Integrabile via dashboard/API con CRM e tool aziendali',
      ],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "Quattro motivi per non poterne più fare a meno!",
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
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
  {
    path: 'waq',
    name: 'WAQ',
    heroContent: {
      brand: 'WAQ',
      icon: 'bi bi-whatsapp',
      payhoff: 'Il WhatsApp Bot offre un customer service immediato e multicanale, automatizzando le richieste più comuni. Attivo 24/7, riduce il carico dei team interni e migliora l’esperienza dei clienti.',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "I vantaggi di WAQ",
      cards: [
        { icon: 'bi bi-check-circle-fill', title: 'Assistenza immediata clienti', description: 'Offri supporto istantaneo e migliora la soddisfazione.' },
        { icon: 'bi bi-check-circle-fill', title: 'FAQ automatizzate', description: 'Rispondi alle domande comuni senza intervento umano.' },
        { icon: 'bi bi-check-circle-fill', title: 'Esperienza omnicanale fluida', description: 'Integra WhatsApp con gli altri tuoi canali di comunicazione.' },
        { icon: 'bi bi-check-circle-fill', title: 'Carico team ridotto', description: 'Libera il tuo team per concentrarsi su compiti a maggior valore.' },
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
  {
    path: 'smart-pricing',
    name: 'Smart Pricing',
    heroContent: {
      brand: 'Smart Pricing',
      icon: 'bi bi-currency-euro',
      payhoff: 'SmartPricing utilizza algoritmi di Machine Learning per ottimizzare prezzi in base a domanda, stagionalità e comportamento dei clienti, massimizzando margini e competitività.',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "I vantaggi di Smart Pricing",
      cards: [
        { icon: 'bi bi-check-circle-fill', title: 'Prezzi dinamici ottimali', description: 'Adatta i prezzi in tempo reale per massimizzare i profitti.' },
        { icon: 'bi bi-check-circle-fill', title: 'Aumento marginalità', description: 'Migliora i margini di guadagno su ogni vendita.' },
        { icon: 'bi bi-check-circle-fill', title: 'Reattività al mercato', description: 'Rispondi rapidamente alle mosse dei competitor e ai cambiamenti della domanda.' },
        { icon: 'bi bi-check-circle-fill', title: 'Strategie di vendita mirate', description: 'Crea offerte personalizzate basate sui dati dei clienti.' },
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
  {
    path: 'stay-on',
    name: 'Stay On',
    heroContent: {
      brand: 'Stay On',
      icon: 'bi bi-person-check-fill',
      payhoff: 'StayOn è la soluzione predittiva che analizza i comportamenti dei clienti per individuare segnali di abbandono. Permette di attivare strategie mirate di fidelizzazione, migliorando la retention e riducendo i costi di acquisizione.',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "I vantaggi di Stay On",
      cards: [
        { icon: 'bi bi-check-circle-fill', title: 'Previsione abbandono clienti', description: 'Anticipa quali clienti sono a rischio e agisci in tempo.' },
        { icon: 'bi bi-check-circle-fill', title: 'Strategie di retention personalizzate', description: 'Crea campagne mirate per trattenere i clienti.' },
        { icon: 'bi bi-check-circle-fill', title: 'Insight predittivi immediati', description: 'Ottieni subito informazioni preziose sul comportamento dei clienti.' },
        { icon: 'bi bi-check-circle-fill', title: 'Aumento loyalty e ricavi', description: 'Fidelizza i clienti e aumenta il loro valore nel tempo.' },
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
  {
    path: 'sentiment',
    name: 'Sentiment',
    heroContent: {
      brand: 'Sentiment',
      icon: 'bi bi-chat-heart-fill',
      payhoff: 'Analizza in automatico recensioni, social e contenuti online per comprendere come clienti e utenti percepiscono il brand, prodotti e servizi. Classifica i feedback per tono (positivo, neutro, negativo) e per argomento.',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "I vantaggi di Sentiment",
      cards: [
        { icon: 'bi bi-check-circle-fill', title: 'Monitoraggio reputazione in tempo reale', description: 'Tieni sotto controllo cosa si dice del tuo brand online.' },
        { icon: 'bi bi-check-circle-fill', title: 'Insight azionabili', description: 'Ottieni spunti per migliorare marketing, customer care e prodotti.' },
        { icon: 'bi bi-check-circle-fill', title: 'Benchmarking con i competitor', description: 'Confronta la tua performance con quella dei concorrenti.' },
        { icon: 'bi bi-check-circle-fill', title: 'Alert automatici su criticità', description: 'Ricevi notifiche immediate su problemi emergenti.' },
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
  {
    path: 'sales-predict',
    name: 'Sales Predict',
    heroContent: {
      brand: 'Sales Predict',
      icon: 'bi bi-cloud-download',
      payhoff: 'Sales Predict applica modelli predittivi per stimare l’andamento delle vendite, anticipando trend e variazioni di mercato. Consente di pianificare con precisione, ottimizzare scorte e supportare la forza commerciale.',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "I vantaggi di Sales Predict",
      cards: [
        { icon: 'bi bi-check-circle-fill', title: 'Previsioni accurate vendite', description: 'Pianifica con maggiore sicurezza basandoti su dati affidabili.' },
        { icon: 'bi bi-check-circle-fill', title: 'Pianificazione strategica ottimizzata', description: 'Migliora \'allocazione delle risorse e la gestione del budget.' },
        { icon: 'bi bi-check-circle-fill', title: 'Maggior efficienza commerciale', description: 'Supporta il tuo team di vendita con informazioni strategiche.' },
        { icon: 'bi bi-check-circle-fill', title: 'Gestione scorte migliorata', description: 'Evita rotture di stock e ottimizza i livelli di inventario.' },
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
  {
    path: 'wap',
    name: 'WAP',
    heroContent: {
      brand: 'WAP',
      icon: 'bi bi-broadcast',
      payhoff: 'Con WAP (WhatsApp Push) puoi automatizzare l’invio di immagini, PDF o report (ad esempio da Qlik) direttamente su WhatsApp. Un canale rapido e affidabile per condividere dati e informazioni in tempo reale.',
      descriptions: [],
      buttonText: 'Contattaci per una demo!',
    },
    strengthsContent: {
      title: "I vantaggi di WAP",
      cards: [
        { icon: 'bi bi-check-circle-fill', title: 'Automatizza gli invii, elimina gli errori', description: 'Riduci il lavoro manuale e garantisci la precisione.' },
        { icon: 'bi bi-check-circle-fill', title: 'Scala facilmente, senza perdere controllo', description: 'Invia comunicazioni a un gran numero di contatti.' },
        { icon: 'bi bi-check-circle-fill', title: 'Comunica in tempo reale, dove tutti leggono', description: 'Sfrutta il canale di comunicazione più usato al mondo.' },
        { icon: 'bi bi-check-circle-fill', title: 'Integra WAP con Qlik, CRM ed ERP', description: 'Collega i tuoi sistemi aziendali per un flusso di dati automatizzato.' },
      ]
    },
    videoPaths: {
      voice: {
        mobile: '/media/video/mobile/voice_mob.mp4',
        desktop: '/media/video/desktop/voice_desk_full_size.mp4',
      },
      insights: {
        mobile: '/media/video/mobile/insights_mob.mp4',
        desktop: '/media/video/desktop/insights_desk_full_size.mp4',
      },
    },
  },
];

export default applications;