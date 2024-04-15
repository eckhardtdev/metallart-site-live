import 'dotenv/config'
import StoryblokClient from 'storyblok-js-client'
import path from 'path'
import fs, { readdirSync, readFileSync, createReadStream } from 'fs'
import { readFile } from 'node:fs/promises'
// import FormData from 'form-data'
// import { FormData } from 'formdata-node'
import { FormDataEncoder } from 'form-data-encoder'
import { Readable } from 'stream'
import { fileFromPath } from 'formdata-node/file-from-path'
import FormData from 'form-data'
import sizeOf from 'image-size'
import mime from 'mime'

const oauthToken = process.env.STORYBLOK_PERSONAL_TOKEN
const space = process.env.STORYBLOK_SPACE
const remoteParentFolderId = 409331 // Projekte

const uploadFile = async (filePath, signed_response_object) => {
  console.log('filePath', filePath)
  console.log('signed_response_object', signed_response_object)
  // let headers = signed_response_object.data.fields

  // let body = new FormData()
  // body.append('file', createReadStream(file))
  // console.log(headers)

  // const blob = readFileSync(file)
  // const blob = createReadStream(file)
  // console.log('blob', blob)

  // const form = new FormData()
  // Object.entries({
  //   ...signed_response_object.data.fields,
  // }).forEach(([key, value]) => {
  //   form.append(key, value)
  // })
  // form.set('file', await fileFromPath(filePath))
  // const encoder = new FormDataEncoder(form)

  var form = new FormData()
  for (var key in signed_response_object.data.fields) {
    form.append(key, signed_response_object.data.fields[key])
  }

  const streamOptions = {
    contentType: signed_response_object.data.fields['Content-Type'],
    knownLength: fs.statSync(filePath).size,
  }
  form.append('file', fs.createReadStream(filePath), streamOptions)

  form.submit(signed_response_object.data.post_url, function (err, res) {
    if (err) throw err
    console.log(
      'https://a.storyblok.com/' +
        signed_response_object.data.fields.key +
        ' UPLOADED!',
    )
  })
  return

  try {
    const response = await fetch(signed_response_object.data.post_url, {
      method: 'POST',
      // body: Readable.from(encoder.encode()),
      // headers: encoder.headers,
      body: form,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    })
    console.log('response', response)
  } catch (error) {
    console.error(`❌ An error occured while streaming asset '${filePath}'`)
    console.error(error)
  }
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

const uploadAssets = async (index, folders) => {
  const sourceFolder = sourceFolders[index]
  if (!sourceFolder) return

  const files = getFiles(sourceFolder.path)
  if (files.length === 0) {
    console.log(`ℹ️ No files found in directory:\n   ${sourceFolder.path}`)
    return uploadAssets(index + 1, folders)
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
    return uploadAssets(index + 1, folders)
  }
  console.log(remoteFolder)

  // Upload assets
  const file = files[0]
  const { height, width } = sizeOf(file.path)
  const imageSize = `${width}x${height}`
  const mimeType = mime.getType(file.path)
  const fileSize = fs.statSync(file.path).size
  console.log('file', file)
  console.log('imageSize', imageSize)
  console.log('mimeType', mimeType)
  console.log('fileSize', fileSize)
  let signedResponseObject
  try {
    const response = await Storyblok.post(`spaces/${space}/assets/`, {
      'filename': file.name,
      'size': imageSize,
      'asset_folder_id': remoteFolder.id,
      'content_type': mimeType,
      'content_length': fileSize,
    })
    signedResponseObject = response
  } catch (error) {
    console.error(
      `❌ An error occured while uploading assets to remote folder '${sourceFolder.name}'`,
    )
    console.error(error)
    return uploadAssets(index + 1, folders)
  }

  const response = uploadFile(file.path, signedResponseObject)
}

// await uploadAssets(0, sourceFolders)

Storyblok.get(`spaces/${space}/assets`, {})
  .then((response) => {
    console.log(response.data?.assets?.[1])
  })
  .catch((error) => {
    console.log(error)
  })
