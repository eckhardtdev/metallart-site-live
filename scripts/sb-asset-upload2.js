import 'dotenv/config'
import fs, { readdirSync } from 'fs'
import path from 'path'
import StoryblokClient from 'storyblok-js-client'
import { FormData } from 'formdata-node'
import { fileFromPathSync } from 'formdata-node/file-from-path'
import sizeOf from 'image-size'
import mime from 'mime'

const oauthToken = process.env.STORYBLOK_PERSONAL_TOKEN
const space = process.env.STORYBLOK_SPACE
const remoteParentFolderId = 411202 // Projects

const uploadFiles = async (files, remoteFolder, index = 0) => {
  if (index >= files.length) return

  const file = files[index]
  const signedResponse = await requestUpload(file, remoteFolder)
  const response = await uploadFile(file, signedResponse)

  uploadFiles(files, remoteFolder, index + 1)
}

const requestUpload = async (file, remoteFolder) => {
  const { height, width } = sizeOf(file.path)
  file.dimensions = `${width}x${height}`
  file.type = mime.getType(file.path)
  file.size = fs.statSync(file.path).size
  let signedResponse
  try {
    const response = await Storyblok.post(`spaces/${space}/assets/`, {
      'filename': file.name,
      'size': file.dimensions,
      'asset_folder_id': remoteFolder.id,
      // Had no effect in Storyblok:
      // 'content_type': file.type,
      // 'content_length': file.size
    })
    signedResponse = response?.data
  } catch (error) {
    console.error(`❌ Upload request failed for '${file.name}'`)
    console.error(error)
  }

  return signedResponse
}

const uploadFile = async (file, signedResponse) => {
  // console.log('signedResponse', signedResponse)
  const streamOptions = {
    contentType: signedResponse.fields['Content-Type'],
    knownLength: file.size,
  }

  console.log(`   Upload ${file.name}`)
  console.log(
    `          ${file.type} | ${file.dimensions} px | ${file.size} bytes`,
  )

  const form = new FormData()
  for (var key in signedResponse.fields) {
    form.append(key, signedResponse.fields[key])
  }
  form.set('file', await fileFromPathSync(file.path), streamOptions)

  try {
    const response = await fetch(signedResponse.post_url, {
      method: 'post',
      body: form,
    })
    console.log(`        → ${signedResponse.public_url}`)
  } catch (error) {
    console.error(`❌ An error occured while streaming asset '${file.name}'`)
    console.error(error)
  }

  return signedResponse
}

const sourcePath = path.join(import.meta.dirname, 'upload')
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      name: dirent.name,
      path: path.join(source, dirent.name),
    }))
const getFiles = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter(
      (dirent) => /\.(jpe?g|png|svg)$/i.test(dirent.name) && dirent.isFile(),
    )
    .map((dirent) => ({
      name: dirent.name,
      path: path.join(source, dirent.name),
    }))

const sourceFolders = getDirectories(sourcePath)

if (sourceFolders.length === 0) {
  console.log(`❌ No folders found in the upload directory:\n   ${sourcePath}`)
  process.exit(1)
}
console.log(`Found ${sourceFolders?.length} source folders in ${sourcePath}`)

console.log('Connecting to Storyblok...')
const Storyblok = new StoryblokClient({
  oauthToken,
})

const uploadAssets = async (folders, index = 0) => {
  if (index >= folders.length) return

  const sourceFolder = sourceFolders[index]
  if (!sourceFolder) return

  const files = getFiles(sourceFolder.path)
  if (files.length === 0) {
    console.log(`ℹ️ No files found in directory:\n   ${sourceFolder.path}`)
    return
  }

  // Craete remote folder
  let remoteFolder
  try {
    const response = await Storyblok.post(`spaces/${space}/asset_folders/`, {
      'asset_folder': {
        'name': sourceFolder.name,
        'parent_id': remoteParentFolderId,
      },
    })
    remoteFolder = response?.data?.asset_folder
    const url = `https://app.storyblok.com/#/me/spaces/${space}/assets/${remoteFolder?.id}`
    console.log(`📂 Folder '${remoteFolder?.name}' created\n   ${url}`)
  } catch (error) {
    console.error(
      `❌ An error occured while creating remote folder '${sourceFolder.name}'`,
    )
    console.error(error)
    return
  }
  // console.log(remoteFolder)

  // Upload assets

  await uploadFiles(files, remoteFolder)
  await uploadAssets(folders, index + 1)
}

await uploadAssets(sourceFolders)

// Storyblok.get(`spaces/${space}/assets`, {})
//   .then((response) => {
//     console.log(response.data?.assets?.[0])
//   })
//   .catch((error) => {
//     console.log(error)
//   })
