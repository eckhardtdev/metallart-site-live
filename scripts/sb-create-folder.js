import 'dotenv/config'
import StoryblokClient from 'storyblok-js-client'
const token = process.env.STORYBLOK_PERSONAL_TOKEN
const space = process.env.STORYBLOK_SPACE

// Initialize the client with the oauth token
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_PERSONAL_TOKEN,
})

const folders = [
  'AIP Spectrum of the Seas',
  'Armani Wien',
  'Axel Springer',
  'Baltrusch Bad Wimpfen',
  'BAM Futurium',
  'Batimant Eagle Luxemburg',
  'Bitzer',
  'BLR Esslingen',
  'Boa Vista Glasgeländer',
  'Campus Uzwil',
  'Daimler Sindelfingen',
  'Eckerle Stuttgart',
  'EMBL Heidelberg',
  'EVF Göppingen',
  'Firmament',
  'Fontenay Hamburg',
  'Franke Göppingen',
  'Funky München',
  'Galileo',
  'Gerardweber Luxemburg',
  'GfK Kohlenhof',
  'Grimm Hohengehren',
  'Grisoni Nash',
  'Haus der Wirtschaft Darmstadt',
  'Hebel Diözese Augsburg',
  'Herzstiftung Köln',
  'Hoffmann-La-Roche',
  'Höng Wendlingen',
  'Hotel Zollenspieker Hamburg',
  'HTG Boltze Braak',
  'Justina-Betzold Ellwangen',
  'Kersjes Bietigheim Bissingen',
  'Kristalltherme Kochel',
  'Lamaison Saarlouis',
  'Lange & Lange Frankfurt',
  'LBBW Göppingen',
  'LEG Com Center',
  'Lenbachgärten',
  'Leutke Wiesbaden',
  'Lilienthalhaus',
  'Lindner Heraeus',
  'Longchamp München',
  'Maria Ward',
  'Max Delbrück Centrum Berlin',
  'Max Mara',
  'Mori Seiki Wernau',
  'Norderstedter Bank',
  'Nowack Marbach',
  'Olymp Bietigheim Bissingen',
  'Osram München',
  'Paneum Asten',
  'Paul Riegel Stiftung Bonn',
  'Privathaus Balmer Zürich',
  'Privathaus Dupont Ditzingen',
  'Privathaus Lohmann Münster',
  'Privathaus Sageder Innsbruck',
  'Rehm Blaubeuren',
  'Riedel Steelcase München',
  'Rüdel StAugustin',
  'Seehotel Riva Konstanz',
  'Segmüller Pulheim',
  'Stadtbücherei Waiblingen',
  'Taunus Turm',
  'Therme Bukarest',
  'Truma Putzbrunn',
  'Vector Stuttgart',
  'Vector Weilimdorf',
  'Villa Köln',
  'Vogler',
  'Volksbank Günzburg',
  'WINX Tower_DLA Piper',
  'WMD Ahrensburg',
  'WTZ Heilbronn',
  'Zimmermann Ottenbach',
]

const createFolder = (index, list) => {
  const folderName = list[index]
  if (!folderName) return

  Storyblok.post(`spaces/${space}/asset_folders/`, {
    'asset_folder': {
      'name': folderName,
      'parent_id': 378631,
    },
  })
    .then((response) => {
      const folder = response?.data?.asset_folder
      const url = `https://app.storyblok.com/#/me/spaces/${space}/assets/${folder?.id}`
      console.log(`✓ ${folder?.name} created: ${url}`)
      createFolder(index + 1, list)
    })
    .catch((error) => {
      console.log(error)
    })
}
createFolder(0, folders)
