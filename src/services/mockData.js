// AsYou Partner Brands — ~300 consumer brands from S&P 500, DJIA, Russell 2000
// Logos powered by Clearbit Logo API: https://logo.clearbit.com/{domain}

const BRAND_DATA = [
  // ── Food & Beverage ──────────────────────────────────────────────
  ['mcdonalds',   "McDonald's",       'MCD',  'mcdonalds.com',         '#FFC72C', 'Food & Beverage',  "Earn $MCD on every Big Mac and McCafe order.",                '$0.02 in $MCD per $1 spent',    0.005, 'coming_soon'],
  ['starbucks',   'Starbucks',        'SBUX', 'starbucks.com',         '#00704A', 'Food & Beverage',  'Earn $SBUX with every latte and reward star.',                '$0.03 in $SBUX per $1 spent',   0.007, 'coming_soon'],
  ['yum',         'Taco Bell',        'YUM',  'tacobell.com',          '#702082', 'Food & Beverage',  'Earn $YUM on Taco Bell, KFC, and Pizza Hut orders.',          '$0.02 in $YUM per $1 spent',    0.005, 'coming_soon'],
  ['chipotle',    'Chipotle',         'CMG',  'chipotle.com',          '#A81612', 'Food & Beverage',  'Earn $CMG on every burrito bowl and lifestyle bowl.',         '$0.03 in $CMG per $1 spent',    0.007, 'coming_soon'],
  ['dominos',     "Domino's",         'DPZ',  'dominos.com',           '#006491', 'Food & Beverage',  "Earn $DPZ on every pizza delivery and carry-out.",            '$0.02 in $DPZ per $1 spent',    0.005, 'coming_soon'],
  ['dunkin',      "Dunkin'",          'QSR',  'dunkindonuts.com',      '#FF671F', 'Food & Beverage',  "Earn on every Dunkin' run, coffee or donuts.",                '$0.02 in $QSR per $1 spent',    0.005, 'coming_soon'],
  ['sweetgreen',  'Sweetgreen',       'SG',   'sweetgreen.com',        '#76A849', 'Food & Beverage',  'Earn $SG for every salad bowl and warm bowl.',                '$0.03 in $SG per $1 spent',     0.007, 'coming_soon'],
  ['shake-shack', 'Shake Shack',      'SHAK', 'shakeshack.com',        '#56A03C', 'Food & Beverage',  'Earn $SHAK on every ShackBurger and crinkle fry.',            '$0.03 in $SHAK per $1 spent',   0.007, 'coming_soon'],
  ['wingstop',    'Wingstop',         'WING', 'wingstop.com',          '#CC0000', 'Food & Beverage',  'Earn $WING on every wing combo and dip order.',               '$0.02 in $WING per $1 spent',   0.005, 'coming_soon'],
  ['dutch-bros',  'Dutch Bros',       'BROS', 'dutchbros.com',         '#003DA5', 'Food & Beverage',  'Earn $BROS on handcrafted drinks and Dutch Rewards.',         '$0.03 in $BROS per $1 spent',   0.007, 'coming_soon'],
  ['papa-johns',  "Papa John's",      'PZZA', 'papajohns.com',         '#CC0000', 'Food & Beverage',  "Earn $PZZA on every pizza order and Papa Rewards.",           '$0.02 in $PZZA per $1 spent',   0.005, 'coming_soon'],
  ['jack-box',    'Jack in the Box',  'JACK', 'jackinthebox.com',      '#E8952E', 'Food & Beverage',  'Earn $JACK on every Jack Pack order and combo.',              '$0.02 in $JACK per $1 spent',   0.005, 'coming_soon'],
  ['brinker',     "Chili's",          'EAT',  'chilis.com',            '#8B0000', 'Food & Beverage',  "Earn $EAT for every visit at your local Chilis.",             '$0.02 in $EAT per visit',       0.005, 'coming_soon'],
  ['darden',      'Olive Garden',     'DRI',  'olivegarden.com',       '#006633', 'Food & Beverage',  'Earn $DRI on endless pasta and eClub rewards.',               '$0.02 in $DRI per $1 spent',    0.005, 'coming_soon'],
  ['texas-road',  'Texas Roadhouse',  'TXRH', 'texasroadhouse.com',    '#8B0000', 'Food & Beverage',  'Earn $TXRH on steaks, ribs, and Texas Roadhouse rewards.',    '$0.02 in $TXRH per $1 spent',   0.005, 'coming_soon'],
  ['first-watch', 'First Watch',      'FWRG', 'firstwatch.com',        '#F5A623', 'Food & Beverage',  'Earn $FWRG on daytime dining and seasonal specials.',         '$0.02 in $FWRG per $1 spent',   0.005, 'coming_soon'],
  ['panera',      'Panera Bread',     'PNRA', 'panerabread.com',       '#4B3832', 'Food & Beverage',  'Earn on MyPanera rewards and Unlimited Sip Club.',            '$0.02 in $PNRA per $1 spent',   0.005, 'coming_soon'],

  // ── Grocery & Retail ─────────────────────────────────────────────
  ['walmart',     'Walmart',          'WMT',  'walmart.com',           '#0071DC', 'Grocery & Retail', 'Earn $WMT on every Walmart+ purchase and in-store trip.',     '$0.01 in $WMT per $1 spent',    0.003, 'active'],
  ['target',      'Target',           'TGT',  'target.com',            '#CC0000', 'Grocery & Retail', 'Earn $TGT on every Target Circle purchase.',                  '$0.02 in $TGT per $1 spent',    0.005, 'active'],
  ['kroger',      'Kroger',           'KR',   'kroger.com',            '#003087', 'Grocery & Retail', 'Earn $KR on groceries with your Kroger Plus card.',           '$0.01 in $KR per $1 spent',     0.003, 'coming_soon'],
  ['costco',      'Costco',           'COST', 'costco.com',            '#005DAA', 'Grocery & Retail', 'Earn $COST on every warehouse and Costco.com order.',         '$0.02 in $COST per $1 spent',   0.005, 'coming_soon'],
  ['whole-foods', 'Whole Foods',      'AMZN', 'wholefoodsmarket.com',  '#00674A', 'Grocery & Retail', 'Earn $AMZN on Whole Foods Market Prime member deals.',        '$0.02 in $AMZN per $1 spent',   0.005, 'coming_soon'],
  ['publix',      'Publix',           'PUSH', 'publix.com',            '#006600', 'Grocery & Retail', 'Earn on every Publix Club Publix shop.',                      '$0.01 in $PUSH per $1 spent',   0.003, 'coming_soon'],
  ['albertsons',  'Albertsons',       'ACI',  'albertsons.com',        '#0066A1', 'Grocery & Retail', 'Earn $ACI on grocery and pharmacy rewards.',                  '$0.01 in $ACI per $1 spent',    0.003, 'coming_soon'],
  ['aldi',        'ALDI',             'ALDI', 'aldi.us',               '#00529B', 'Grocery & Retail', 'Earn on everyday ALDI grocery essentials.',                   '$0.01 in $ALDI per $1 spent',   0.003, 'coming_soon'],
  ['trader-joes', "Trader Joe's",     'TJX',  'traderjoes.com',        '#BB0000', 'Grocery & Retail', "Earn on Trader Joe's unique finds and seasonal picks.",       '$0.01 in $TJX per $1 spent',    0.003, 'coming_soon'],
  ['sprouts',     'Sprouts',          'SFM',  'sprouts.com',           '#4CAF50', 'Grocery & Retail', 'Earn $SFM on fresh organic and natural grocery buys.',        '$0.01 in $SFM per $1 spent',    0.003, 'coming_soon'],
  ['dollar-tree', 'Dollar Tree',      'DLTR', 'dollartree.com',        '#1B5E20', 'Grocery & Retail', 'Earn $DLTR on Dollar Tree and Family Dollar purchases.',      '$0.01 in $DLTR per $1 spent',   0.003, 'coming_soon'],
  ['dollar-gen',  'Dollar General',   'DG',   'dollargeneral.com',     '#FFD700', 'Grocery & Retail', 'Earn $DG on DG digital coupons and Smart purchases.',         '$0.01 in $DG per $1 spent',     0.003, 'coming_soon'],

  // ── Technology ───────────────────────────────────────────────────
  ['apple',       'Apple',            'AAPL', 'apple.com',             '#555555', 'Technology',       'Earn $AAPL on every App Store, Apple TV+, and purchase.',     '$0.05 in $AAPL per $1 spent',   0.012, 'active'],
  ['microsoft',   'Microsoft',        'MSFT', 'microsoft.com',         '#0078D4', 'Technology',       'Earn $MSFT on Microsoft 365, Xbox, and Azure usage.',         '$0.04 in $MSFT per $1 spent',   0.010, 'active'],
  ['google',      'Google',           'GOOGL','google.com',            '#4285F4', 'Technology',       'Earn $GOOGL on Google One, Play Store, and YouTube.',         '$0.04 in $GOOGL per $1 spent',  0.010, 'coming_soon'],
  ['meta',        'Meta',             'META', 'meta.com',              '#0866FF', 'Technology',       'Earn $META on Meta Quest, Reels, and Marketplace.',           '$0.03 in $META per $1 spent',   0.007, 'coming_soon'],
  ['snap',        'Snapchat',         'SNAP', 'snap.com',              '#FFFC00', 'Technology',       'Earn $SNAP when friends use your referral link.',             '$0.02 in $SNAP per referral',   0.005, 'active'],
  ['pinterest',   'Pinterest',        'PINS', 'pinterest.com',         '#E60023', 'Technology',       'Earn $PINS on promoted pins and shopping activity.',          '$0.02 in $PINS per purchase',   0.005, 'coming_soon'],
  ['spotify',     'Spotify',          'SPOT', 'spotify.com',           '#1DB954', 'Technology',       'Earn $SPOT on Premium and Spotify-connected purchases.',      '$0.03 in $SPOT per $1 spent',   0.007, 'coming_soon'],
  ['x-twitter',   'X / Twitter',      'X',    'x.com',                 '#000000', 'Technology',       'Earn on X Premium and creator monetization.',                 '$0.02 in $X per $1 spent',      0.005, 'coming_soon'],
  ['zoom',        'Zoom',             'ZM',   'zoom.us',               '#2D8CFF', 'Technology',       'Earn $ZM on Zoom Pro, Business, and webinar plans.',          '$0.02 in $ZM per month',        0.005, 'coming_soon'],
  ['adobe',       'Adobe Creative',   'ADBE', 'adobe.com',             '#FA0F00', 'Technology',       'Earn $ADBE on Creative Cloud and Acrobat subscriptions.',     '$0.03 in $ADBE per month',      0.007, 'coming_soon'],
  ['salesforce',  'Salesforce',       'CRM',  'salesforce.com',        '#00A1E0', 'Technology',       'Earn $CRM on Salesforce Trailhead and app subscriptions.',    '$0.03 in $CRM per month',       0.007, 'coming_soon'],

  // ── E-Commerce ────────────────────────────────────────────────────
  ['amazon',      'Amazon',           'AMZN', 'amazon.com',            '#FF9900', 'E-Commerce',       'Earn $AMZN on every Amazon Prime order and delivery.',        '$0.03 in $AMZN per $1 spent',   0.007, 'active'],
  ['ebay',        'eBay',             'EBAY', 'ebay.com',              '#E53238', 'E-Commerce',       'Earn $EBAY on every eBay purchase and seller listing.',        '$0.02 in $EBAY per $1 spent',   0.005, 'coming_soon'],
  ['etsy',        'Etsy',             'ETSY', 'etsy.com',              '#F56400', 'E-Commerce',       'Earn $ETSY on handmade, vintage, and craft purchases.',        '$0.03 in $ETSY per $1 spent',   0.007, 'coming_soon'],
  ['shopify',     'Shopify',          'SHOP', 'shopify.com',           '#96BF48', 'E-Commerce',       'Earn $SHOP when you sell or shop on Shopify stores.',          '$0.02 in $SHOP per $1 spent',   0.005, 'coming_soon'],
  ['wayfair',     'Wayfair',          'W',    'wayfair.com',           '#7F187F', 'E-Commerce',       'Earn $W on furniture, decor, and home improvement.',           '$0.02 in $W per $1 spent',      0.005, 'coming_soon'],
  ['chewy',       'Chewy',            'CHWY', 'chewy.com',             '#0054A6', 'E-Commerce',       'Earn $CHWY on pet food, toys, and vet subscriptions.',         '$0.03 in $CHWY per $1 spent',   0.007, 'coming_soon'],
  ['poshmark',    'Poshmark',         'POSH', 'poshmark.com',          '#CB2027', 'E-Commerce',       'Earn $POSH on secondhand fashion and seller closets.',         '$0.02 in $POSH per $1 spent',   0.005, 'coming_soon'],

  // ── Fashion & Apparel ─────────────────────────────────────────────
  ['nike',        'Nike',             'NKE',  'nike.com',              '#111111', 'Fashion & Apparel','Earn $NKE on every Nike app order and Nike+ activity.',       '$0.03 in $NKE per $1 spent',    0.007, 'active'],
  ['lululemon',   'Lululemon',        'LULU', 'lululemon.com',         '#000000', 'Fashion & Apparel','Earn $LULU on leggings, sports bras, and yoga gear.',          '$0.04 in $LULU per $1 spent',   0.010, 'active'],
  ['stitch-fix',  'Stitch Fix',       'SFIX', 'stitchfix.com',         '#8A1452', 'Fashion & Apparel','Earn $SFIX each time you keep items from your Fix.',           '$0.05 in $SFIX per item kept',  0.012, 'active'],
  ['gap',         'Gap',              'GPS',  'gap.com',               '#0E3A5E', 'Fashion & Apparel','Earn $GPS on Gap, Old Navy, Banana Republic purchases.',       '$0.02 in $GPS per $1 spent',    0.005, 'coming_soon'],
  ['pvh',         'Tommy Hilfiger',   'PVH',  'tommy.com',             '#CC0000', 'Fashion & Apparel','Earn $PVH on Tommy Hilfiger and Calvin Klein orders.',         '$0.03 in $PVH per $1 spent',    0.007, 'coming_soon'],
  ['ralph-lauren','Ralph Lauren',     'RL',   'ralphlauren.com',       '#003087', 'Fashion & Apparel','Earn $RL on Polo, Lauren, and Club RL purchases.',             '$0.03 in $RL per $1 spent',     0.007, 'coming_soon'],
  ['tapestry',    'Coach',            'TPR',  'coach.com',             '#8B6914', 'Fashion & Apparel','Earn $TPR on Coach, Kate Spade, and Stuart Weitzman.',         '$0.04 in $TPR per $1 spent',    0.010, 'coming_soon'],
  ['vf-corp',     'The North Face',   'VFC',  'thenorthface.com',      '#B22234', 'Fashion & Apparel','Earn $VFC on outdoor gear, Timberland, and Vans.',             '$0.03 in $VFC per $1 spent',    0.007, 'coming_soon'],
  ['capri',       'Michael Kors',     'CPRI', 'michaelkors.com',       '#1A1A1A', 'Fashion & Apparel','Earn $CPRI on Michael Kors, Versace, and Jimmy Choo.',         '$0.04 in $CPRI per $1 spent',   0.010, 'coming_soon'],
  ['under-armour','Under Armour',     'UA',   'underarmour.com',       '#1D1D1D', 'Fashion & Apparel','Earn $UA on performance gear and UA Record workouts.',         '$0.03 in $UA per $1 spent',     0.007, 'coming_soon'],
  ['columbia',    'Columbia',         'COLM', 'columbia.com',          '#003087', 'Fashion & Apparel','Earn $COLM on outdoor jackets, boots, and gear.',              '$0.02 in $COLM per $1 spent',   0.005, 'coming_soon'],
  ['hanes',       'Champion',         'HBI',  'champion.com',          '#FF0000', 'Fashion & Apparel','Earn $HBI on Champion, Hanes, and Bonds activewear.',          '$0.02 in $HBI per $1 spent',    0.005, 'coming_soon'],
  ['skechers',    'Skechers',         'SKX',  'skechers.com',          '#CC0000', 'Fashion & Apparel','Earn $SKX on Skechers shoes and Hands Free Slip-ins.',         '$0.02 in $SKX per $1 spent',    0.005, 'coming_soon'],
  ['birkenstock', 'Birkenstock',      'BIRK', 'birkenstock.com',       '#8B7355', 'Fashion & Apparel','Earn $BIRK on sandals, clogs, and footbed comfort gear.',      '$0.03 in $BIRK per $1 spent',   0.007, 'coming_soon'],

  // ── Home & Garden ─────────────────────────────────────────────────
  ['home-depot',  'Home Depot',       'HD',   'homedepot.com',         '#F96302', 'Home & Garden',    'Earn $HD on every Home Depot Pro Xtra purchase.',             '$0.02 in $HD per $1 spent',     0.005, 'coming_soon'],
  ['lowes',       "Lowe's",           'LOW',  'lowes.com',             '#004990', 'Home & Garden',    "Earn $LOW on every Lowe's Advantage purchase.",               '$0.02 in $LOW per $1 spent',    0.005, 'coming_soon'],
  ['williams-s',  'Williams-Sonoma',  'WSM',  'williams-sonoma.com',   '#B1914E', 'Home & Garden',    'Earn $WSM on cookware, pottery, and Pottery Barn.',            '$0.03 in $WSM per $1 spent',    0.007, 'coming_soon'],
  ['rh',          'RH',               'RH',   'rh.com',                '#666666', 'Home & Garden',    'Earn $RH on furniture and RH Members program.',               '$0.04 in $RH per $1 spent',     0.010, 'coming_soon'],
  ['sleep-num',   'Sleep Number',     'SNBR', 'sleepnumber.com',       '#1B365D', 'Home & Garden',    'Earn $SNBR on smart beds and SleepIQ subscriptions.',          '$0.04 in $SNBR per $1 spent',   0.010, 'coming_soon'],
  ['tuesday-m',   'Tuesday Morning',  'TUEM', 'tuesdaymorning.com',    '#CC0000', 'Home & Garden',    'Earn $TUEM on home decor and deep-discount finds.',            '$0.01 in $TUEM per $1 spent',   0.003, 'coming_soon'],

  // ── Beauty & Personal Care ────────────────────────────────────────
  ['ulta',        'Ulta Beauty',      'ULTA', 'ulta.com',              '#E0458B', 'Beauty & Care',    'Earn $ULTA on every Ultamate Rewards purchase.',               '$0.03 in $ULTA per $1 spent',   0.007, 'active'],
  ['elf',         'e.l.f. Cosmetics', 'ELF',  'elfcosmetics.com',      '#000000', 'Beauty & Care',    'Earn $ELF on cruelty-free makeup and skincare.',               '$0.03 in $ELF per $1 spent',    0.007, 'coming_soon'],
  ['estee',       'Estee Lauder',     'EL',   'esteelauder.com',       '#C8A96E', 'Beauty & Care',    'Earn $EL on Clinique, MAC, Bobbi Brown, and Jo Malone.',       '$0.04 in $EL per $1 spent',     0.010, 'coming_soon'],
  ['bath-body',   'Bath & Body Works','BBWI', 'bathandbodyworks.com',  '#333333', 'Beauty & Care',    'Earn $BBWI on candles, lotions, and loyalty rewards.',         '$0.02 in $BBWI per $1 spent',   0.005, 'coming_soon'],
  ['sephora',     'Sephora',          'LVMH', 'sephora.com',           '#000000', 'Beauty & Care',    'Earn on Sephora Beauty Insider points and rouge perks.',      '$0.03 in $LVMH per $1 spent',   0.007, 'coming_soon'],
  ['olaplex',     'Olaplex',          'OLPX', 'olaplex.com',           '#1A1A1A', 'Beauty & Care',    'Earn $OLPX on professional hair care and bond builders.',      '$0.03 in $OLPX per $1 spent',   0.007, 'coming_soon'],

  // ── Entertainment & Streaming ─────────────────────────────────────
  ['netflix',     'Netflix',          'NFLX', 'netflix.com',           '#E50914', 'Streaming',        'Earn $NFLX every month your subscription stays active.',      '$0.05 in $NFLX per month',      0.012, 'active'],
  ['disney',      'Disney+',          'DIS',  'disneyplus.com',        '#113CCF', 'Streaming',        'Earn $DIS on Disney+, Hulu, and ESPN+ subscriptions.',        '$0.04 in $DIS per month',       0.010, 'coming_soon'],
  ['hbomax',      'Max (HBO)',         'WBD',  'max.com',               '#6C00FF', 'Streaming',        'Earn $WBD on Max and HBO original series.',                   '$0.04 in $WBD per month',       0.010, 'coming_soon'],
  ['paramount',   'Paramount+',       'PARA', 'paramountplus.com',     '#0064FF', 'Streaming',        'Earn $PARA on Paramount+ and Pluto TV streaming.',            '$0.03 in $PARA per month',      0.007, 'coming_soon'],
  ['peacock',     'Peacock',          'CMCSA','peacocktv.com',         '#000000', 'Streaming',        'Earn $CMCSA on Peacock Premium streaming.',                   '$0.03 in $CMCSA per month',     0.007, 'coming_soon'],
  ['apple-tv',    'Apple TV+',        'AAPL', 'tv.apple.com',          '#000000', 'Streaming',        'Earn $AAPL on Apple TV+ original content subscription.',      '$0.04 in $AAPL per month',      0.010, 'coming_soon'],
  ['sirius',      'SiriusXM',         'SIRI', 'siriusxm.com',          '#0000CC', 'Streaming',        'Earn $SIRI on SiriusXM streaming and satellite radio.',       '$0.02 in $SIRI per month',      0.005, 'coming_soon'],
  ['audible',     'Audible',          'AMZN', 'audible.com',           '#F8991D', 'Streaming',        'Earn $AMZN on Audible Plus and Premium Plus books.',          '$0.03 in $AMZN per credit',     0.007, 'coming_soon'],
  ['twitch',      'Twitch',           'AMZN', 'twitch.tv',             '#9146FF', 'Streaming',        'Earn $AMZN when you subscribe or cheer on Twitch.',           '$0.02 in $AMZN per sub',        0.005, 'coming_soon'],
  ['fandango',    'Fandango',         'WBD',  'fandango.com',          '#E31837', 'Streaming',        'Earn $WBD on every movie ticket and VIP+ subscription.',      '$0.03 in $WBD per ticket',      0.007, 'coming_soon'],
  ['amc',         'AMC Theatres',     'AMC',  'amctheatres.com',       '#CC0000', 'Streaming',        'Earn $AMC on AMC A-List and movie ticket purchases.',          '$0.03 in $AMC per ticket',      0.007, 'coming_soon'],

  // ── Gaming ────────────────────────────────────────────────────────
  ['roblox',      'Roblox',           'RBLX', 'roblox.com',            '#E8192C', 'Gaming',           'Earn $RBLX on Robux purchases and game pass upgrades.',        '$0.04 in $RBLX per $1 spent',   0.010, 'coming_soon'],
  ['ea',          'EA Sports',        'EA',   'ea.com',                '#FF4747', 'Gaming',           'Earn $EA on EA Play, FIFA, and Madden purchases.',             '$0.03 in $EA per $1 spent',     0.007, 'coming_soon'],
  ['ttwo',        'Rockstar Games',   'TTWO', 'rockstargames.com',     '#FCAF17', 'Gaming',           'Earn $TTWO on GTA, NBA 2K, and Rockstar Club.',               '$0.03 in $TTWO per $1 spent',   0.007, 'coming_soon'],
  ['gamestop',    'GameStop',         'GME',  'gamestop.com',          '#5C2D91', 'Gaming',           'Earn $GME on game trades, purchases, and Pro membership.',     '$0.02 in $GME per $1 spent',    0.005, 'coming_soon'],
  ['unity',       'Unity',            'U',    'unity.com',             '#222222', 'Gaming',           'Earn $U when you build and publish with Unity.',               '$0.05 in $U per project pub',   0.012, 'coming_soon'],

  // ── Fitness & Wellness ────────────────────────────────────────────
  ['peloton',     'Peloton',          'PTON', 'onepeloton.com',        '#FC1849', 'Fitness',          'Earn $PTON for every class you complete on the Bike.',        '$0.04 in $PTON per class',      0.010, 'active'],
  ['planet-fit',  'Planet Fitness',   'PLNT', 'planetfitness.com',     '#581C8C', 'Fitness',          'Earn $PLNT for every gym check-in and PF Black Card.',        '$0.02 in $PLNT per visit',      0.005, 'coming_soon'],
  ['lifetime',    'Life Time',        'LTH',  'lifetime.life',         '#333333', 'Fitness',          'Earn $LTH on Life Time membership and fitness apps.',          '$0.03 in $LTH per month',       0.007, 'coming_soon'],
  ['whoop',       'WHOOP',            'WHOOP','whoop.com',             '#000000', 'Fitness',          'Earn on WHOOP membership and performance coaching.',           '$0.03 in $WHOOP per month',     0.007, 'coming_soon'],
  ['garmin',      'Garmin',           'GRMN', 'garmin.com',            '#007DC5', 'Fitness',          'Earn $GRMN on Garmin watches and GPS activities.',             '$0.03 in $GRMN per device',     0.007, 'coming_soon'],
  ['noom',        'Noom',             'NOOM', 'noom.com',              '#7AC143', 'Fitness',          'Earn on Noom weight management program subscriptions.',        '$0.03 in $NOOM per month',      0.007, 'coming_soon'],
  ['beachbody',   'BODi / Beachbody', 'BODi', 'beachbodyondemand.com', '#F5A623', 'Fitness',          'Earn $BODi on BODi streaming workouts and nutrition.',         '$0.03 in $BODi per month',      0.007, 'coming_soon'],

  // ── Travel & Hotels ───────────────────────────────────────────────
  ['marriott',    'Marriott Bonvoy',  'MAR',  'marriott.com',          '#B5082E', 'Travel & Hotels',  'Earn $MAR on every Bonvoy stay and point redemption.',        '$0.03 in $MAR per $1 spent',    0.007, 'coming_soon'],
  ['hilton',      'Hilton',           'HLT',  'hilton.com',            '#00356B', 'Travel & Hotels',  'Earn $HLT on Hilton Honors stays and bonus nights.',           '$0.03 in $HLT per $1 spent',    0.007, 'coming_soon'],
  ['hyatt',       'Hyatt',            'H',    'hyatt.com',             '#6D2B8F', 'Travel & Hotels',  'Earn $H on World of Hyatt stays and bonuses.',                '$0.04 in $H per $1 spent',      0.010, 'coming_soon'],
  ['ihg',         'IHG / Holiday Inn','IHG',  'ihg.com',               '#4C9900', 'Travel & Hotels',  'Earn $IHG on IHG One Rewards stays worldwide.',               '$0.03 in $IHG per $1 spent',    0.007, 'coming_soon'],
  ['wyndham',     'Wyndham Rewards',  'WH',   'wyndhamhotels.com',     '#003087', 'Travel & Hotels',  'Earn $WH on Wyndham Rewards stays and dining.',               '$0.02 in $WH per $1 spent',     0.005, 'coming_soon'],
  ['airbnb',      'Airbnb',           'ABNB', 'airbnb.com',            '#FF5A5F', 'Travel & Hotels',  'Earn $ABNB when you book stays and Experiences.',             '$0.03 in $ABNB per $1 spent',   0.007, 'coming_soon'],
  ['booking',     'Booking.com',      'BKNG', 'booking.com',           '#003580', 'Travel & Hotels',  'Earn $BKNG on hotels, cars, and Booking Genius status.',      '$0.03 in $BKNG per $1 spent',   0.007, 'coming_soon'],
  ['expedia',     'Expedia',          'EXPE', 'expedia.com',           '#0066CC', 'Travel & Hotels',  'Earn $EXPE on flights, hotels, and One Key rewards.',          '$0.02 in $EXPE per $1 spent',   0.005, 'coming_soon'],
  ['tripadvisor', 'TripAdvisor',      'TRIP', 'tripadvisor.com',       '#00AF87', 'Travel & Hotels',  'Earn $TRIP on reviews, hotel bookings, and Plus.',             '$0.02 in $TRIP per booking',    0.005, 'coming_soon'],
  ['vrbo',        'VRBO',             'EXPE', 'vrbo.com',              '#3D5FA0', 'Travel & Hotels',  'Earn $EXPE on VRBO vacation rental bookings.',                '$0.02 in $EXPE per $1 spent',   0.005, 'coming_soon'],

  // ── Airlines ──────────────────────────────────────────────────────
  ['delta',       'Delta Air Lines',  'DAL',  'delta.com',             '#003366', 'Airlines',         'Earn $DAL on every SkyMiles flight and Credit Card.',          '$0.04 in $DAL per mile',        0.010, 'coming_soon'],
  ['united',      'United Airlines',  'UAL',  'united.com',            '#1B3F7C', 'Airlines',         'Earn $UAL on MileagePlus flights and Chase card.',             '$0.04 in $UAL per mile',        0.010, 'coming_soon'],
  ['american',    'American Airlines','AAL',  'aa.com',                '#B22234', 'Airlines',         'Earn $AAL on AAdvantage miles and credit card spend.',         '$0.04 in $AAL per mile',        0.010, 'coming_soon'],
  ['southwest',   'Southwest',        'LUV',  'southwest.com',         '#304CB2', 'Airlines',         'Earn $LUV on Rapid Rewards points and A-List status.',        '$0.03 in $LUV per point',       0.007, 'coming_soon'],
  ['alaska',      'Alaska Airlines',  'ALK',  'alaskaair.com',         '#006DB7', 'Airlines',         'Earn $ALK on Mileage Plan flights and partners.',              '$0.03 in $ALK per mile',        0.007, 'coming_soon'],
  ['jetblue',     'JetBlue',          'JBLU', 'jetblue.com',           '#0033A0', 'Airlines',         'Earn $JBLU on TrueBlue points and Mosaic status.',            '$0.03 in $JBLU per point',      0.007, 'coming_soon'],
  ['spirit',      'Spirit Airlines',  'SAVE', 'spirit.com',            '#FFD700', 'Airlines',         'Earn $SAVE on Free Spirit points and Big Front Seat.',        '$0.02 in $SAVE per point',      0.005, 'coming_soon'],
  ['frontier',    'Frontier Airlines','ULCC', 'flyfrontier.com',       '#00AA00', 'Airlines',         'Earn $ULCC on Frontier Miles and GOPASS+ membership.',        '$0.02 in $ULCC per point',      0.005, 'coming_soon'],

  // ── Automotive ───────────────────────────────────────────────────
  ['tesla',       'Tesla',            'TSLA', 'tesla.com',             '#CC0000', 'Automotive',       'Earn $TSLA on Supercharger sessions and referrals.',           '$0.05 in $TSLA per kWh',        0.012, 'active'],
  ['ford',        'Ford',             'F',    'ford.com',              '#003478', 'Automotive',       'Earn $F on FordPass Rewards and FordPass Charging.',           '$0.02 in $F per $1 spent',      0.005, 'coming_soon'],
  ['gm',          'General Motors',   'GM',   'gm.com',                '#0060A9', 'Automotive',       'Earn $GM on GM Rewards and OnStar subscription.',              '$0.02 in $GM per $1 spent',     0.005, 'coming_soon'],
  ['rivian',      'Rivian',           'RIVN', 'rivian.com',            '#3D9970', 'Automotive',       'Earn $RIVN on charging, accessories, and Adventures.',        '$0.05 in $RIVN per charge',     0.012, 'coming_soon'],
  ['lucid',       'Lucid Motors',     'LCID', 'lucidmotors.com',       '#0A7299', 'Automotive',       'Earn $LCID on Lucid Air charging and accessories.',            '$0.05 in $LCID per charge',     0.012, 'coming_soon'],
  ['carvana',     'Carvana',          'CVNA', 'carvana.com',           '#00ADE0', 'Automotive',       'Earn $CVNA on car purchases and trade-in deals.',              '$0.05 in $CVNA per purchase',   0.012, 'coming_soon'],
  ['autozone',    'AutoZone',         'AZO',  'autozone.com',          '#E01020', 'Automotive',       'Earn $AZO on parts, accessories, and AutoZone Rewards.',      '$0.02 in $AZO per $1 spent',    0.005, 'coming_soon'],
  ['oreilly',     "O'Reilly Auto",    'ORLY', 'oreillyauto.com',       '#CC0000', 'Automotive',       "Earn $ORLY on auto parts, tools, and O'Reilly Rewards.",      '$0.02 in $ORLY per $1 spent',   0.005, 'coming_soon'],

  // ── Ride-Share & Delivery ─────────────────────────────────────────
  ['uber',        'Uber',             'UBER', 'uber.com',              '#000000', 'Ride-Share',       'Earn $UBER on every Uber and Uber Eats order.',               '$0.03 in $UBER per ride',       0.007, 'active'],
  ['lyft',        'Lyft',             'LYFT', 'lyft.com',              '#FF00BF', 'Ride-Share',       'Earn $LYFT on rides, Pink membership, and referrals.',        '$0.03 in $LYFT per ride',       0.007, 'active'],
  ['doordash',    'DoorDash',         'DASH', 'doordash.com',          '#FF3008', 'Ride-Share',       'Earn $DASH on DashPass deliveries and restaurant orders.',    '$0.03 in $DASH per order',      0.007, 'coming_soon'],
  ['grubhub',     'Grubhub',          'GRUB', 'grubhub.com',           '#F63440', 'Ride-Share',       'Earn $GRUB on Grubhub+ deliveries and dining rewards.',       '$0.02 in $GRUB per order',      0.005, 'coming_soon'],
  ['instacart',   'Instacart',        'CART', 'instacart.com',         '#43B02A', 'Ride-Share',       'Earn $CART on Instacart+ grocery deliveries.',                '$0.02 in $CART per order',      0.005, 'coming_soon'],
  ['gopuff',      'Gopuff',           'GOPU', 'gopuff.com',            '#5046E5', 'Ride-Share',       'Earn on Gopuff instant delivery and Fam membership.',          '$0.02 in $GOPU per order',      0.005, 'coming_soon'],

  // ── Financial & Fintech ───────────────────────────────────────────
  ['paypal',      'PayPal',           'PYPL', 'paypal.com',            '#0070BA', 'Financial',        'Earn $PYPL on PayPal, Venmo, and Honey rewards.',              '$0.02 in $PYPL per $1 sent',    0.005, 'coming_soon'],
  ['cashapp',     'Cash App',         'SQ',   'cash.app',              '#00D64F', 'Financial',        'Earn $SQ on Cash App Pay and Boost card rewards.',             '$0.02 in $SQ per $1 spent',     0.005, 'coming_soon'],
  ['sofi',        'SoFi',             'SOFI', 'sofi.com',              '#0073CF', 'Financial',        'Earn $SOFI on student loans, investing, and banking.',         '$0.03 in $SOFI per $1 saved',   0.007, 'coming_soon'],
  ['affirm',      'Affirm',           'AFRM', 'affirm.com',            '#0FA0EA', 'Financial',        'Earn $AFRM on every Affirm BNPL purchase.',                    '$0.02 in $AFRM per purchase',   0.005, 'coming_soon'],
  ['klarna',      'Klarna',           'KLAR', 'klarna.com',            '#FFB3C7', 'Financial',        'Earn on Klarna shopping and buy-now-pay-later.',               '$0.02 in $KLAR per purchase',   0.005, 'coming_soon'],
  ['coinbase',    'Coinbase',         'COIN', 'coinbase.com',          '#0052FF', 'Financial',        'Earn $COIN on crypto trades and Coinbase One.',                '$0.03 in $COIN per trade',      0.007, 'coming_soon'],
  ['robinhood',   'Robinhood',        'HOOD', 'robinhood.com',         '#00C805', 'Financial',        'Earn $HOOD on Gold membership and option trades.',             '$0.03 in $HOOD per $1 traded',  0.007, 'coming_soon'],
  ['chime',       'Chime',            'CHME', 'chime.com',             '#1EC677', 'Financial',        'Earn on Chime checking and savings account usage.',            '$0.01 in $CHME per $1 saved',   0.003, 'coming_soon'],

  // ── Telecom ───────────────────────────────────────────────────────
  ['tmobile',     'T-Mobile',         'TMUS', 't-mobile.com',          '#E20074', 'Telecom',          'Earn $TMUS on your monthly T-Mobile bill and extras.',         '$0.02 in $TMUS per $1 spent',   0.005, 'active'],
  ['verizon',     'Verizon',          'VZ',   'verizon.com',           '#CD040B', 'Telecom',          'Earn $VZ on Verizon myRewards and Up rewards.',                '$0.02 in $VZ per $1 spent',     0.005, 'coming_soon'],
  ['att',         'AT&T',             'T',    'att.com',               '#00A8E0', 'Telecom',          'Earn $T on AT&T Thanks rewards and DIRECTV.',                  '$0.02 in $T per $1 spent',      0.005, 'coming_soon'],
  ['comcast',     'Xfinity',          'CMCSA','xfinity.com',           '#000000', 'Telecom',          'Earn $CMCSA on Xfinity Internet, TV, and mobile.',             '$0.02 in $CMCSA per $1 spent',  0.005, 'coming_soon'],
  ['dish',        'DISH Network',     'DISH', 'dish.com',              '#E31837', 'Telecom',          'Earn $DISH on satellite TV and DISH Rewards.',                 '$0.02 in $DISH per $1 spent',   0.005, 'coming_soon'],

  // ── Health & Pharmacy ─────────────────────────────────────────────
  ['cvs',         'CVS Health',       'CVS',  'cvs.com',               '#CC0000', 'Health',           'Earn $CVS on ExtraCare prescriptions and MinuteClinic.',       '$0.02 in $CVS per $1 spent',    0.005, 'coming_soon'],
  ['walgreens',   'Walgreens',        'WBA',  'walgreens.com',         '#E31837', 'Health',           'Earn $WBA on myWalgreens rewards and pharmacy.',               '$0.02 in $WBA per $1 spent',    0.005, 'coming_soon'],
  ['teladoc',     'Teladoc',          'TDOC', 'teladoc.com',           '#46B7A4', 'Health',           'Earn $TDOC on virtual doctor visits and therapy.',             '$0.03 in $TDOC per visit',      0.007, 'coming_soon'],
  ['hims',        'Hims & Hers',      'HIMS', 'hims.com',              '#000000', 'Health',           'Earn $HIMS on prescriptions and wellness subscriptions.',      '$0.03 in $HIMS per month',      0.007, 'coming_soon'],
  ['optum',       'OptumRx',          'UNH',  'optum.com',             '#D62B00', 'Health',           'Earn $UNH on OptumRx prescriptions and wellness.',             '$0.02 in $UNH per $1 spent',    0.005, 'coming_soon'],
  ['onemedical',  'One Medical',      'AMZN', 'onemedical.com',        '#0072CE', 'Health',           'Earn $AMZN on One Medical primary care memberships.',          '$0.04 in $AMZN per month',      0.010, 'coming_soon'],

  // ── Social & Creator Economy ──────────────────────────────────────
  ['reddit',      'Reddit',           'RDDT', 'reddit.com',            '#FF4500', 'Social',           'Earn $RDDT on Reddit Premium and community awards.',           '$0.02 in $RDDT per award',      0.005, 'coming_soon'],
  ['discord',     'Discord',          'DISC', 'discord.com',           '#5865F2', 'Social',           'Earn on Discord Nitro and server boosts.',                     '$0.02 in $DISC per month',      0.005, 'coming_soon'],
  ['linkedin',    'LinkedIn',         'MSFT', 'linkedin.com',          '#0A66C2', 'Social',           'Earn $MSFT on LinkedIn Premium and Learning.',                 '$0.03 in $MSFT per month',      0.007, 'coming_soon'],
  ['substack',    'Substack',         'SUBS', 'substack.com',          '#FF6719', 'Social',           'Earn when your newsletter earns paid subscriptions.',          '$0.05 in $SUBS per subscriber', 0.012, 'coming_soon'],
  ['patreon',     'Patreon',          'PATR', 'patreon.com',           '#FF424D', 'Social',           'Earn when supporters back your creative work.',                '$0.05 in $PATR per pledge',     0.012, 'coming_soon'],

  // ── Education & Learning ──────────────────────────────────────────
  ['coursera',    'Coursera',         'COUR', 'coursera.org',          '#0056D2', 'Education',        'Earn $COUR on Coursera Plus and certificate programs.',        '$0.03 in $COUR per course',     0.007, 'coming_soon'],
  ['chegg',       'Chegg',            'CHGG', 'chegg.com',             '#FF7700', 'Education',        'Earn $CHGG on Chegg Study and textbook rentals.',              '$0.03 in $CHGG per month',      0.007, 'coming_soon'],
  ['duolingo',    'Duolingo',         'DUOL', 'duolingo.com',          '#58CC02', 'Education',        'Earn $DUOL on Duolingo Plus and Super subscriptions.',         '$0.02 in $DUOL per month',      0.005, 'coming_soon'],
  ['udemy',       'Udemy',            'UDMY', 'udemy.com',             '#EC5252', 'Education',        'Earn $UDMY on course purchases and Udemy Business.',           '$0.02 in $UDMY per course',     0.005, 'coming_soon'],
  ['masterclass', 'MasterClass',      'MSTR', 'masterclass.com',       '#1A1A1A', 'Education',        'Earn on MasterClass All-Access Pass subscriptions.',           '$0.04 in $MSTR per month',      0.010, 'coming_soon'],

  // ── Home Services ─────────────────────────────────────────────────
  ['angi',        'Angi',             'ANGI', 'angi.com',              '#FF6B00', 'Home Services',    'Earn $ANGI on home services booked through Angi.',             '$0.02 in $ANGI per booking',    0.005, 'coming_soon'],
  ['taskrabbit',  'TaskRabbit',       'IKEA', 'taskrabbit.com',        '#6AB04C', 'Home Services',    'Earn on IKEA and TaskRabbit assembly and services.',           '$0.02 in $IKEA per task',       0.005, 'coming_soon'],

  // ── Pet ───────────────────────────────────────────────────────────
  ['petco',       'Petco',            'WOOF', 'petco.com',             '#00539C', 'Pet',              'Earn $WOOF on Vital Care and every Petco purchase.',           '$0.02 in $WOOF per $1 spent',   0.005, 'coming_soon'],
  ['petsmart',    'PetSmart',         'PSMT', 'petsmart.com',          '#DD1C1A', 'Pet',              'Earn on PetSmart Treats rewards and grooming.',                '$0.02 in $PSMT per $1 spent',   0.005, 'coming_soon'],
  ['freshpet',    'Freshpet',         'FRPT', 'freshpet.com',          '#78BE20', 'Pet',              'Earn $FRPT on fresh pet food subscriptions.',                  '$0.03 in $FRPT per order',      0.007, 'coming_soon'],
  ['barkbox',     'BarkBox',          'BARK', 'barkbox.com',           '#F7941D', 'Pet',              'Earn $BARK on dog toy and treat subscriptions.',               '$0.02 in $BARK per month',      0.005, 'coming_soon'],

  // ── Subscription Boxes ────────────────────────────────────────────
  ['hellofresh',  'HelloFresh',       'HLFG', 'hellofresh.com',        '#99CC00', 'Subscription',     'Earn $HLFG on meal kit deliveries and referrals.',             '$0.03 in $HLFG per week',       0.007, 'coming_soon'],
  ['blue-apron',  'Blue Apron',       'APRN', 'blueapron.com',         '#5FB7D4', 'Subscription',     'Earn $APRN on meal kit deliveries and wine orders.',           '$0.03 in $APRN per week',       0.007, 'coming_soon'],
  ['ipsy',        'IPSY',             'IPSY', 'ipsy.com',              '#C459B3', 'Subscription',     'Earn on IPSY Glam Bag subscriptions and add-ons.',             '$0.02 in $IPSY per month',      0.005, 'coming_soon'],

  // ── Office & Productivity ─────────────────────────────────────────
  ['dropbox',     'Dropbox',          'DBX',  'dropbox.com',           '#0061FF', 'Productivity',     'Earn $DBX on Dropbox Plus and Business plans.',                '$0.02 in $DBX per month',       0.005, 'coming_soon'],
  ['notion',      'Notion',           'NOTI', 'notion.so',             '#000000', 'Productivity',     'Earn on Notion Plus and team workspace upgrades.',             '$0.02 in $NOTI per month',      0.005, 'coming_soon'],
  ['slack',       'Slack',            'MSFT', 'slack.com',             '#4A154B', 'Productivity',     'Earn $MSFT on Slack Pro and Business+ workspaces.',            '$0.02 in $MSFT per month',      0.005, 'coming_soon'],

  // ── Consumer Electronics ──────────────────────────────────────────
  ['best-buy',    'Best Buy',         'BBY',  'bestbuy.com',           '#003087', 'Electronics',      'Earn $BBY on My Best Buy+ rewards and purchases.',             '$0.02 in $BBY per $1 spent',    0.005, 'coming_soon'],
  ['samsung',     'Samsung',          'SMSN', 'samsung.com',           '#1428A0', 'Electronics',      'Earn on Samsung Rewards and Galaxy ecosystem.',                '$0.02 in $SMSN per purchase',   0.005, 'coming_soon'],
  ['dell',        'Dell Technologies','DELL', 'dell.com',              '#007DB8', 'Electronics',      'Earn $DELL on PCs, monitors, and Dell Rewards.',               '$0.02 in $DELL per $1 spent',   0.005, 'coming_soon'],
  ['logitech',    'Logitech',         'LOGI', 'logitech.com',          '#00B2F3', 'Electronics',      'Earn $LOGI on peripherals, webcams, and gaming gear.',         '$0.02 in $LOGI per $1 spent',   0.005, 'coming_soon'],

  // ── Insurance ─────────────────────────────────────────────────────
  ['progressive', 'Progressive',      'PGR',  'progressive.com',       '#D0021B', 'Insurance',        'Earn $PGR on auto insurance premiums and Snapshot.',           '$0.02 in $PGR per month',       0.005, 'coming_soon'],
  ['lemonade',    'Lemonade',         'LMND', 'lemonade.com',          '#FF0083', 'Insurance',        'Earn $LMND on renters, home, pet, and life insurance.',        '$0.02 in $LMND per month',      0.005, 'coming_soon'],
  ['root',        'Root Insurance',   'ROOT', 'joinroot.com',          '#FB4C26', 'Insurance',        'Earn $ROOT on good-driver auto insurance premiums.',           '$0.02 in $ROOT per month',      0.005, 'coming_soon'],
  ['oscar',       'Oscar Health',     'OSCR', 'hioscar.com',           '#FF6F3C', 'Insurance',        'Earn $OSCR on Oscar health plan premiums and steps.',          '$0.02 in $OSCR per month',      0.005, 'coming_soon'],

  // ── Real Estate ────────────────────────────────────────────────────
  ['zillow',      'Zillow',           'Z',    'zillow.com',            '#1277E1', 'Real Estate',      'Earn $Z on Zillow Premier Agent and rental listings.',         '$0.03 in $Z per listing',       0.007, 'coming_soon'],
  ['redfin',      'Redfin',           'RDFN', 'redfin.com',            '#CC0033', 'Real Estate',      'Earn $RDFN on home purchases and Redfin agent savings.',       '$0.05 in $RDFN per close',      0.012, 'coming_soon'],
  ['opendoor',    'Opendoor',         'OPEN', 'opendoor.com',          '#FF6900', 'Real Estate',      'Earn $OPEN on cash home offers and iBuyer transactions.',      '$0.05 in $OPEN per sale',       0.012, 'coming_soon'],
]

// Map compact tuples → full partner objects
export const PARTNERS = BRAND_DATA.map(([
  id, name, ticker, domain, color, category,
  description, rewardLabel, rewardRate, apiStatus
]) => ({
  id,
  name,
  ticker,
  domain,
  logo: `https://logo.clearbit.com/${domain}`,
  logoFallback: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  color,
  category,
  description,
  rewardLabel,
  rewardRate,
  apiStatus,
  // deterministic mock market data based on name hash
  price: parseFloat((((id.charCodeAt(0) * 7 + id.length * 13) % 450) + 20).toFixed(2)),
  change: parseFloat((((id.charCodeAt(0) % 10) - 5) * 0.8).toFixed(2)),
  changePercent: parseFloat((((id.charCodeAt(0) % 10) - 5) * 0.5).toFixed(2)),
  marketCap: `${((id.charCodeAt(0) * 3 + 50) % 1900 + 10).toFixed(0)}B`,
}))

export const CATEGORIES = [
  'All',
  'Food & Beverage',
  'Grocery & Retail',
  'Technology',
  'E-Commerce',
  'Fashion & Apparel',
  'Home & Garden',
  'Beauty & Care',
  'Streaming',
  'Gaming',
  'Fitness',
  'Travel & Hotels',
  'Airlines',
  'Automotive',
  'Ride-Share',
  'Financial',
  'Telecom',
  'Health',
  'Social',
  'Education',
  'Home Services',
  'Pet',
  'Subscription',
  'Productivity',
  'Electronics',
  'Insurance',
  'Real Estate',
]

export const ACTIVITY_TYPES = ['earn', 'connect', 'dividend', 'milestone']

export function generateActivity(partners, count = 50) {
  const connected = partners.filter(p => p.connected)
  if (connected.length === 0) return []
  const items = []
  const now = Date.now()
  const seed = (n) => (n * 1103515245 + 12345) & 0x7fffffff
  for (let i = 0; i < count; i++) {
    const p = connected[seed(i * 3) % connected.length]
    const type = ACTIVITY_TYPES[seed(i * 7) % ACTIVITY_TYPES.length]
    const amount = parseFloat(((seed(i * 11) % 50) / 100 + 0.01).toFixed(4))
    items.push({
      id: `act_${i}_${p.id}`,
      partnerId: p.id,
      partnerName: p.name,
      partnerLogo: p.logo,
      partnerDomain: p.domain,
      partnerColor: p.color,
      type,
      amount,
      shares: parseFloat((amount / (p.price || 100)).toFixed(6)),
      ticker: p.ticker,
      description: type === 'earn'
        ? `Earned from ${p.name} activity`
        : type === 'connect'
        ? `Connected ${p.name} account`
        : type === 'dividend'
        ? `${p.ticker} dividend reinvestment`
        : `${p.name} milestone bonus`,
      timestamp: new Date(now - i * 3600000 * ((seed(i * 13) % 12) + 1)).toISOString(),
    })
  }
  return items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

// ── Static demo data ──────────────────────────────────────────────────────────
export const MOCK_HOLDINGS = [
  { ticker: 'UBER', shares: 2.4832, avgCost: 38.50, currentPrice: 42.11, totalEarned: 104.52 },
  { ticker: 'PTON', shares: 5.1204, avgCost: 11.20, currentPrice: 10.85, totalEarned: 57.34  },
  { ticker: 'LYFT', shares: 1.8960, avgCost: 12.10, currentPrice: 14.73, totalEarned: 27.99  },
  { ticker: 'NFLX', shares: 0.1240, avgCost: 580.0, currentPrice: 614.22, totalEarned: 76.16 },
  { ticker: 'AAPL', shares: 0.3371, avgCost: 175.0, currentPrice: 188.44, totalEarned: 58.98 },
]

export const MOCK_ACTIVITY = [
  { id: 'a1', partnerId: 'uber',    partnerName: 'Uber',    ticker: 'UBER', type: 'earn',      earned: 0.034, shares: 0.00081, date: new Date(Date.now() - 3600000).toISOString() },
  { id: 'a2', partnerId: 'peloton', partnerName: 'Peloton', ticker: 'PTON', type: 'earn',      earned: 0.043, shares: 0.00396, date: new Date(Date.now() - 7200000).toISOString() },
  { id: 'a3', partnerId: 'lyft',    partnerName: 'Lyft',    ticker: 'LYFT', type: 'earn',      earned: 0.029, shares: 0.00197, date: new Date(Date.now() - 86400000).toISOString() },
  { id: 'a4', partnerId: 'netflix', partnerName: 'Netflix', ticker: 'NFLX', type: 'dividend',  earned: 0.012, shares: 0.00002, date: new Date(Date.now() - 172800000).toISOString() },
  { id: 'a5', partnerId: 'uber',    partnerName: 'Uber',    ticker: 'UBER', type: 'earn',      earned: 0.027, shares: 0.00064, date: new Date(Date.now() - 259200000).toISOString() },
  { id: 'a6', partnerId: 'apple',   partnerName: 'Apple',   ticker: 'AAPL', type: 'milestone', earned: 0.188, shares: 0.00100, date: new Date(Date.now() - 345600000).toISOString() },
]

// Generate 30-day portfolio chart data
export const PORTFOLIO_CHART_DATA = (() => {
  const data = []
  let value = 290
  const now  = Date.now()
  for (let i = 29; i >= 0; i--) {
    const seed = (value * 1103515245 + i * 12345) & 0x7fffffff
    const delta = ((seed % 20) - 9) * 0.4
    value = Math.max(260, value + delta)
    data.push({
      date: new Date(now - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(value.toFixed(2)),
    })
  }
  return data
})()
