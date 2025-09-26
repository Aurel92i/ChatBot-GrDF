import React, { useMemo, useState } from 'react';
import './App.css';

const knowledgeBase = [
  {
    id: 'pe-diameters',
    title: 'Diamètres usuels des canalisations PE',
    summary: 'Choix des tubes polyéthylène (PE80/PE100) pour les réseaux de distribution.',
    keywords: ['diametre', 'tube pe', 'polyethylene', 'pehd', 'reseau gaz', 'sd r', 'branchements'],
    extraKeywords: ['PE100', 'PE80', '32 mm', '63 mm', '90 mm', '110 mm', 'électrofusion'],
    tags: ['Matériaux', 'Dimensionnement'],
    answer: [
      'Branchement individuel : DN 25 (Ø ext. 32 mm) – alimentation compteur ≤ 6 m³/h, pression ≤ 4 bar.',
      'Petit collectif / lotissement : DN 32 (Ø ext. 40 mm) ou DN 40 (Ø ext. 50 mm) – vérifier l\'étude de charge et la longueur totale.',
      'Réseau secondaire structurant : DN 63 (Ø ext. 75 mm) à DN 90 (Ø ext. 110 mm) – compatible MOP ≤ 16 bar selon SDR et grade PE.',
      'Réseau principal basse pression : DN 110 (Ø ext. 125 mm) à DN 160 (Ø ext. 180 mm) – nécessite validation étude réseau et contrôles en pression renforcés.'
    ],
    reminders: [
      'Utiliser du PE100 SDR17 pour ≤ 4 bar; SDR11 requis au-dessus.',
      'Toujours chanfreiner et ébavurer avant la soudure ou l\'électrofusion.',
      'Contrôler traçabilité (lot, série, année) sur chaque couronne ou barre.'
    ],
    references: 'Guide technique GRDF – Canalisations PE (édition 2022) & FT Gaz PE100.',
    followUps: ['Quelles sont les étapes de soudage PE ?', 'Comment contrôler une électrofusion ?']
  },
  {
    id: 'copper-diameters',
    title: 'Diamètres recommandés des canalisations cuivre (intérieur)',
    summary: 'Distribution intérieure cuivre en aval du poste de détente.',
    keywords: ['cuivre', 'diametre cuivre', 'plomberie gaz', 'tube recuit', 'semi-rigide'],
    extraKeywords: ['12x1', '18x1', '22x1', '28x1', 'robinet'],
    tags: ['Matériaux', 'Installations intérieures'],
    answer: [
      'Appareil individuel (cuisinière, chaudière murale) : 12×1 mm ou 14×1 mm selon débit.',
      'Colonne montante petite copropriété : 18×1 mm pour 2 à 3 logements, 22×1 mm au-delà.',
      'Collecteurs chaufferie : 28×1 mm à 35×1,5 mm selon puissance; prévoir éventuels manchons dilatation.',
      'Sécurité : respecter un rayon de cintrage ≥ 3 × diamètre ext. et protéger contre corrosion sous gaine.'
    ],
    reminders: [
      'Brasage fort à l\'argent obligatoire pour assemblages gaz.',
      'Installer un fourreau étanche lors d\'un passage de paroi ou dalle.',
      'Toujours purger et contrôler l\'étanchéité à 150 mbar avant remise en gaz.'
    ],
    references: 'NF DTU 61.1 & Cahier GRDF « Installations intérieures cuivre » (2021).',
    followUps: ['Quelle est la procédure d\'épreuve gaz intérieure ?', 'Quelles distances de sécurité dans une gaine ?']
  },
  {
    id: 'steel-diameters',
    title: 'Canalisations acier soudé ou filetées',
    summary: 'Choix des DN acier pour postes de détente, traversées ou réseaux haute pression.',
    keywords: ['acier', 'diametre acier', 'filete', 'soude', 'poste de detente', 'hPe'],
    extraKeywords: ['DN 32', 'DN 50', 'DN 80', 'schedule 40', 'revêtement'],
    tags: ['Matériaux', 'Haute pression'],
    answer: [
      'Branchement industriel moyenne pression : DN 32 ou DN 40 en acier noir, avec revêtement polyéthylène hors sol.',
      'Traversée sous ouvrage : DN 50 à DN 80 avec chemisage acier et protection cathodique renforcée.',
      'Collecteur station de détente > 500 Nm³/h : DN 80 à DN 150 en tube acier soudé (épaisseur selon NF EN 10208-2).',
      'Sectionnement : prévoir brides PN16 minimum et un robinet pleine ouverture à chaque extrémité.'
    ],
    reminders: [
      'Contrôle par ressuage ou radiographie sur 10 % des soudures critiques.',
      'Respecter peinture primaire + finition polyuréthane en extérieur.',
      'Vérifier la continuité électrique avant mise en service pour la protection cathodique.'
    ],
    references: 'Spécification GRDF – Réseaux acier HPB/MPB (chap. 5) & NF EN 13480.',
    followUps: ['Quel est le protocole de soudage acier ?', 'Quelle protection cathodique appliquer ?']
  },
  {
    id: 'lead-diameters',
    title: 'Anciennes canalisations plomb – diagnostic et remplacements',
    summary: 'Repérage des anciens branchements plomb et diamètres usuels.',
    keywords: ['plomb', 'diametre plomb', 'ancien reseau', 'remplacement', 'branchement'],
    extraKeywords: ['DN 15', 'DN 20', 'branchement plomb'],
    tags: ['Matériaux', 'Patrimoine'],
    answer: [
      'Ancien branchement individuel : diamètre intérieur 15 à 18 mm, gaine tissu goudronné.',
      'Collecteurs historiques : 20 à 25 mm intérieur, souvent repris sur nourrice cuivre.',
      'Remplacement : privilégier PEHD ou cuivre avec raccords isolants; neutraliser totalement le tronçon plomb.',
      'Sécurité : manipuler avec EPI, ne jamais chauffer le plomb; organiser évacuation en déchetterie spécialisée.'
    ],
    reminders: [
      'Informer le client et planifier coupure; prévoir prélèvement pour analyse si doute qualité.',
      'Documenter l\'intervention dans le SIG patrimoine GRDF.',
      'Vérifier la mise à la terre après suppression de l\'ancien conducteur métallique.'
    ],
    references: 'Note GRDF – Programme de suppression du plomb (2019) & arrêté du 9/08/2021 sur la qualité de l\'eau.',
    followUps: ['Quelles aides financières pour le client ?', 'Comment neutraliser un branchement désaffecté ?']
  },
  {
    id: 'trench-depth',
    title: 'Profondeur et recouvrement des tranchées gaz',
    summary: 'Règles de terrassement en travaux publics pour les réseaux gaz GRDF.',
    keywords: ['profondeur', 'tranchee', 'recouvrement', 'travaux publics', 'fouille', 'terrassement'],
    extraKeywords: ['0,80 m', '1,00 m', 'haubanage', 'blindage'],
    tags: ['Travaux publics', 'Sécurité'],
    answer: [
      'Sous chaussée circulée : profondeur minimale 1,00 m avec recouvrement ≥ 0,80 m sur génératrice supérieure du tube.',
      'Sous trottoir ou zone verte : profondeur minimale 0,80 m (recouvrement 0,60 m).',
      'Traversée de propriété privée : profondeur selon convention, viser ≥ 0,70 m et protéger mécaniquement.',
      'Tranchée en terrain instable : blindage obligatoire au-delà de 1,30 m de profondeur ou talutage à 45°.'
    ],
    reminders: [
      'Vérifier la présence d\'autres réseaux via DICT et marquage-piquetage.',
      'Installer un lit de pose sable 10 cm sous et sur le tube; compactage léger autour du PE.',
      'Photographier les ouvrages avant remblai pour archivage chantier.'
    ],
    references: 'Guide technique GRDF – Pose en fouille (chap. 2) & norme NF P 98-331.',
    followUps: ['Quel grillage avertisseur utiliser ?', 'Quelles distances avec les autres réseaux ?']
  },
  {
    id: 'warning-cover',
    title: 'Protection mécanique et signalisation en fouille',
    summary: 'Mise en place des lits de pose, grillages avertisseurs et dalles.',
    keywords: ['grillage', 'avertisseur', 'protection', 'lit de pose', 'remblai', 'dalle avertisseuse'],
    extraKeywords: ['jaune', 'beton', 'polypropylene'],
    tags: ['Travaux publics', 'Sécurité'],
    answer: [
      'Lit de pose : sable 0/4 tamisé, 10 cm sous tube + 10 cm sur tube, sans cailloux ni blocs.',
      'Grillage avertisseur : bande jaune « GAZ » à 20/25 cm au-dessus de la génératrice supérieure.',
      'Zones à risque (passage sous voirie lourde) : dalle avertisseuse béton fibré ou plaque PE structurée.',
      'Traversées fourreau : obturer les extrémités par mousse PU et poser étiquette de repérage.'
    ],
    reminders: [
      'Ne jamais compacter directement sur le tube PE : utiliser dame légère jusqu\'à 30 cm au-dessus.',
      'Reporter sur le plan de récolement la position exacte du grillage et des fourreaux.',
      'Contrôler la couleur et l\'inscription du grillage avant pose (lot, année).'
    ],
    references: 'FT GRDF 241 – Signalisation des ouvrages gaz (2020).',
    followUps: ['Quelle largeur de tranchée prévoir ?', 'Quel type de fourreau choisir ?']
  },
  {
    id: 'flame-temperature',
    title: 'Températures de flamme pour travaux à chaud',
    summary: 'Points de contrôle lors de brasage, soudage et découpe.',
    keywords: ['flamme', 'temperature', 'chalumeau', 'brasage', 'soudage', 'oxycoupage'],
    extraKeywords: ['acetylene', 'propane', 'soudeur', 'brazing'],
    tags: ['Travaux chauds', 'Sécurité'],
    answer: [
      'Chalumeau oxyacétylénique : flamme neutre ≈ 3 100 °C – idéale pour brasage fort cuivre/acier.',
      'Chalumeau oxypropane : flamme ≈ 2 800 °C – suffisant pour recuit cuivre et chauffe légère.',
      'Lance thermique (oxygène + essence) : pic > 3 500 °C – réservé aux découpes d\'urgence, forte vigilance.',
      'Brasage tendre étain-plomb : 250 à 320 °C – proscrit sur réseau gaz actif, uniquement dépose historique.'
    ],
    reminders: [
      'Vérifier la présence d\'un permis de feu et d\'un extincteur 9 kg à moins de 5 m.',
      'Protéger le PE à l\'aide d\'écrans anti-chaleur ou d\'une nappe mouillée.',
      'Contrôler l\'absence de fuite sur flexibles avant allumage.'
    ],
    references: 'Instruction sécurité GRDF IS45 – Travaux par point chaud (2023).',
    followUps: ['Quel extincteur utiliser ?', 'Quelle procédure après brasage ?']
  },
  {
    id: 'site-safety',
    title: 'Organisation de chantier et coordination avec les TP',
    summary: 'Bonnes pratiques de sécurité collective sur le terrain.',
    keywords: ['coordination', 'chantier', 'travaux publics', 'securite', 'signalisation'],
    extraKeywords: ['balisage', 'chef de chantier', 'plan prevention'],
    tags: ['Travaux publics', 'Organisation'],
    answer: [
      'Mettre en place le balisage temporaire selon NF P 98-332 : panneaux K5a/K2, cônes, feux si besoin.',
      'Tenir un briefing quotidien (5 minutes sécurité) avec l\'équipe TP et rappeler les risques gaz.',
      'Assurer la ventilation des fouilles profondes et contrôler l\'atmosphère avant intervention.',
      'Tenir à jour le registre de consignation et disposer du plan réseau sur site (papier ou tablette).'
    ],
    reminders: [
      'Toujours porter détecteur 4 gaz opérationnel.',
      'Ne jamais laisser une fouille ouverte sans protections périphériques (garde-corps, platelage).',
      'Reporter tout écart dans l\'application mobile QSE pour traçabilité.'
    ],
    references: 'Plan de prévention type GRDF / Entreprises TP (version 2022).',
    followUps: ['Quelle check-list sécurité utiliser ?', 'Comment consigner une canalisation ?']
  },
  {
    id: 'compatibility-other-networks',
    title: 'Distances minimales avec les autres réseaux',
    summary: 'Écartements réglementaires à respecter lors des croisements ou parallèles.',
    keywords: ['distance', 'reseaux', 'croisement', 'parallele', 'separation', 'electricite', 'eau'],
    extraKeywords: ['200 mm', '300 mm', '50 cm', 'croiser'],
    tags: ['Travaux publics', 'Sécurité'],
    answer: [
      'Parallèle avec réseau électrique BT : écart horizontal ≥ 20 cm, grillage indépendant pour chaque réseau.',
      'Croisement avec réseau électrique HTA : écart vertical ≥ 50 cm; interposer dalle de protection si < 50 cm.',
      'Proximité réseau eau potable : écart horizontal ≥ 40 cm; éviter les croisements à angle aigu.',
      'Télécom / fibre : écart horizontal ≥ 10 cm; signalisation spécifique si réseaux superposés.'
    ],
    reminders: [
      'Respecter les prescriptions du guide UTE C 15-900 lors des croisements électriques.',
      'Documenter les écarts éventuels et demander validation ingénierie GRDF.',
      'Utiliser plaques de répartition si contraintes de place et protéger mécaniquement le gaz.'
    ],
    references: 'Guide Technique Interréseaux (GIR) 2020 & GDO GRDF.',
    followUps: ['Comment déclarer un écart aux distances ?', 'Quel repérage en cas de réseaux superposés ?']
  }
];

const quickQuestions = [
  'Quels diamètres de tube PE dois-je prévoir ?',
  'Quelle est la profondeur minimale d\'une tranchée gaz ?',
  'Quelle distance respecter avec un câble électrique ?',
  'Quelle température atteint une flamme oxyacétylénique ?'
];

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value) => (normalize(value) ? normalize(value).split(' ') : []);

const createFallback = (question) => ({
  role: 'bot',
  type: 'text',
  text: `Je n\'ai pas trouvé de fiche correspondant précisément à « ${question} ». Vérifie le CCTP, les notes locales et n\'hésite pas à contacter le correspondant technique.`
});

const App = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([
    {
      role: 'bot',
      type: 'text',
      text: "Bonjour, je suis l\'assistant terrain GRDF. Pose-moi une question sur les diamètres, la pose ou la sécurité et je te renvoie vers les fiches utiles."
    }
  ]);

  const knowledgeIndex = useMemo(
    () =>
      knowledgeBase.map((entry) => ({
        ...entry,
        normalizedKeywords: entry.keywords.map((keyword) => normalize(keyword)),
        normalizedExtra: (entry.extraKeywords || []).map((keyword) => normalize(keyword)),
        normalizedTitle: normalize(entry.title)
      })),
    []
  );

  const searchKnowledge = (input) => {
    const normalizedQuestion = normalize(input);
    const tokens = tokenize(input);
    if (!normalizedQuestion) {
      return null;
    }

    const scored = knowledgeIndex
      .map((entry) => {
        let score = 0;

        entry.normalizedKeywords.forEach((keyword) => {
          if (!keyword) return;
          if (normalizedQuestion.includes(keyword)) {
            score += 4;
          } else {
            const keywordTokens = tokenize(keyword);
            const matches = keywordTokens.filter((token) => tokens.includes(token));
            if (matches.length) {
              score += matches.length * 1.5;
            }
          }
        });

        entry.normalizedExtra.forEach((keyword) => {
          if (keyword && normalizedQuestion.includes(keyword)) {
            score += 1.5;
          }
        });

        if (entry.normalizedTitle && normalizedQuestion.includes(entry.normalizedTitle)) {
          score += 2;
        }

        entry.tags.forEach((tag) => {
          const normalizedTag = normalize(tag);
          if (tokens.includes(normalizedTag)) {
            score += 0.5;
          }
        });

        return { entry, score };
      })
      .filter(({ score }) => score > 0);

    if (!scored.length) {
      return null;
    }

    scored.sort((a, b) => b.score - a.score);

    const bestScore = scored[0].score;
    const threshold = Math.max(3, bestScore * 0.45);
    const matches = scored.filter(({ score }) => score >= threshold).slice(0, 3);

    return {
      role: 'bot',
      type: 'knowledge',
      matches: matches.map(({ entry, score }) => ({
        id: entry.id,
        title: entry.title,
        summary: entry.summary,
        answer: entry.answer,
        reminders: entry.reminders,
        references: entry.references,
        tags: entry.tags,
        score
      })),
      followUps: Array.from(
        new Set(
          matches
            .map(({ entry }) => entry.followUps || [])
            .flat()
        )
      ).slice(0, 4)
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }

    const userMessage = { role: 'user', type: 'text', text: question.trim() };
    const answer = searchKnowledge(question);

    setHistory((prev) => [...prev, userMessage, answer || createFallback(question.trim())]);
    setQuestion('');
  };

  const handleSuggestionClick = (suggestion) => {
    setQuestion(suggestion);
  };

  const renderMessage = (message, index) => {
    if (message.type === 'knowledge') {
      return (
        <div className="message bot" key={`msg-${index}`}>
          <p className="message-intro">Voici ce que j'ai trouvé :</p>
          {message.matches.map((match) => (
            <article className="knowledge-card" key={match.id}>
              <header>
                <h3>{match.title}</h3>
                <p className="knowledge-summary">{match.summary}</p>
                <div className="tag-row">
                  {match.tags.map((tag) => (
                    <span className="tag" key={`${match.id}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </header>
              <ul>
                {match.answer.map((item, idx) => (
                  <li key={`${match.id}-answer-${idx}`}>{item}</li>
                ))}
              </ul>
              {match.reminders.length > 0 && (
                <details>
                  <summary>Points de vigilance</summary>
                  <ul>
                    {match.reminders.map((item, idx) => (
                      <li key={`${match.id}-reminder-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </details>
              )}
              <footer>
                <p className="reference">Référence : {match.references}</p>
              </footer>
            </article>
          ))}
          {message.followUps && message.followUps.length > 0 && (
            <div className="follow-ups">
              <p>Pour approfondir :</p>
              <ul>
                {message.followUps.map((item, idx) => (
                  <li key={`follow-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`message ${message.role}`} key={`msg-${index}`}>
        <p>{message.text}</p>
      </div>
    );
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Assistant terrain GRDF</h1>
          <p className="subtitle">Support rapide sur les diamètres, la pose et la sécurité des réseaux gaz.</p>
        </div>
        <div className="header-info">
          <span className="status-dot" />
          <span>Base documentaire locale (mise à jour 2023)</span>
        </div>
      </header>

      <main className="app-body">
        <section className="chat-panel">
          <div className="chat-history">
            {history.map((message, index) => renderMessage(message, index))}
          </div>
          <form className="question-form" onSubmit={handleSubmit}>
            <label htmlFor="question" className="visually-hidden">
              Pose ta question
            </label>
            <input
              id="question"
              type="text"
              value={question}
              placeholder="Exemple : Quelle profondeur pour une tranchée gaz sous voirie ?"
              onChange={(event) => setQuestion(event.target.value)}
            />
            <button type="submit">Envoyer</button>
          </form>
        </section>
        <aside className="info-panel">
          <h2>Questions rapides</h2>
          <ul className="suggestions">
            {quickQuestions.map((item) => (
              <li key={item}>
                <button type="button" onClick={() => handleSuggestionClick(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <div className="info-card">
            <h3>Conseils sécurité</h3>
            <ul>
              <li>Avant toute fouille, vérifie le marquage-piquetage et la DICT.</li>
              <li>Port permanent du détecteur 4 gaz calibré & EPI flamme retard.</li>
              <li>En cas de doute, stoppe le chantier et contacte la hiérarchie.</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Docs utiles</h3>
            <ul>
              <li>Guide technique GRDF – Pose en fouille.</li>
              <li>NF DTU 61.1 – Installations de gaz.</li>
              <li>Instruction sécurité IS45 – Travaux par point chaud.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
