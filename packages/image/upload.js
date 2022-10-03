import React from 'react'
import get from 'lodash/get'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ImageIcon from '@mui/icons-material/Image'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Delete'
import CropIcon from '@mui/icons-material/Crop'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import Crop from 'react-easy-crop'
import ResetIcon from '@mui/icons-material/Refresh'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Image from './image'

const Carousel = ({
  images = [],
  inputId,
  cropConfig,
  loading,
  multi,
  preview,
  onChange = () => {}
}) => {
  const [nav, setNav] = React.useState(0)
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [result, setResult] = React.useState()
  const [cropping, setCropping] = React.useState()

  if (!images.length) return ''

  return (
    <Box height="80vh" width="100%" position="relative">
      {preview && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="flex-end"
          style={{ background: '#222' }}
        >
          {images.map((src, i) => (
            <Box
              key={i}
              width="100%"
              height="100%"
              display={nav == i ? 'flex' : 'none'}
              alignItems="flex-end"
              justifyContent="center"
            >
              {cropping ? (
                <Crop
                  image={src}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onCropComplete={(_, result) => setResult(result)}
                  onZoomChange={setZoom}
                  {...cropConfig}
                />
              ) : (
                <Image src={src} />
              )}
            </Box>
          ))}
          <Box
            p={2}
            width="100%"
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            {!cropping && (
              <Box display="flex">
                <Box p={1}>
                  <Fab
                    size="small"
                    onClick={() => {
                      images.splice(nav, 1)
                      onChange(images)
                    }}
                  >
                    <RemoveIcon />
                  </Fab>
                </Box>
                {cropConfig && (
                  <Box p={1}>
                    <Fab size="small" onClick={() => setCropping(true)}>
                      <CropIcon />
                    </Fab>
                  </Box>
                )}
                {cropConfig && (
                  <Box p={1}>
                    <Fab
                      size="small"
                      onClick={() => {
                        images[nav] = images[nav].replace(
                          /upload\/c_crop,.*\//,
                          'upload/'
                        )

                        onChange(images)
                      }}
                    >
                      <ResetIcon />
                    </Fab>
                  </Box>
                )}
                {multi && (
                  <React.Fragment>
                    <Box p={1}>
                      <Fab
                        size="small"
                        disabled={cropping || !nav}
                        onClick={() => setNav((nav) => --nav)}
                      >
                        <ChevronLeftIcon />
                      </Fab>
                    </Box>
                    <Box p={1}>
                      <Fab
                        size="small"
                        disabled={cropping || nav == images.length - 1}
                        onClick={() => setNav((nav) => ++nav)}
                      >
                        <ChevronRightIcon />
                      </Fab>
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            )}
            {cropping && (
              <Box display="flex">
                <Box p={1}>
                  <Fab size="small" onClick={() => setCropping()}>
                    <CloseIcon />
                  </Fab>
                </Box>
                <Box p={1}>
                  <Fab
                    size="small"
                    onClick={() => {
                      setCropping()
                      images[nav] = images[nav].replace(
                        /upload\//,
                        `upload/c_crop,h_${result.height},w_${result.width},x_${result.x},y_${result.y}/`
                      )

                      onChange(images)

                      setCrop({ x: 0, y: 0 })
                      setZoom(0)
                    }}
                  >
                    <DoneIcon />
                  </Fab>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
      {multi && (
        <Box display="flex">
          <Box py={2} display="flex" flexGrow={1}>
            {images.map((image, i) => (
              <Box key={image} pr={2}>
                <Avatar variant="rounded">
                  <IconButton disabled={cropping} onClick={() => setNav(i)}>
                    <Avatar variant="rounded" src={image} />
                  </IconButton>
                </Avatar>
              </Box>
            ))}

            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar variant="rounded">
                <label htmlFor={inputId}>
                  <IconButton disabled={cropping || loading} component="span">
                    <AddIcon />
                  </IconButton>
                </label>
              </Avatar>
              {loading && (
                <Box
                  display="flex"
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress thickness={6} size={24} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const upload = (files, cloudName) =>
  Promise.all(
    files.map((file) => {
      const form = new FormData()
      form.set('file', file)
      form.set('multiple', true)
      form.set('upload_preset', cloudName)

      return axios({
        method: 'post',
        url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((res) => res && res.data && res.data.secure_url)
        .catch(console.log)
    })
  )

const Upload = ({
  id,
  fullWidth,
  values,
  handleChange,
  multi,
  cloudName,
  buttonHeight = 250,
  buttonText,
  preview,
  crop
}) => {
  const inputId = `inputfile-${id}`
  const [loading, setLoading] = React.useState()

  const hasValue =
    (multi && get(values, `${id}.length`)) || (!multi && get(values, id))

  let images = get(values, id) || []
  if (!(images instanceof Array)) images = [images]

  return (
    <Box width={fullWidth ? '100%' : 'auto'}>
      {hasValue ? (
        <Carousel
          preview={preview}
          multi={multi}
          images={images}
          onChange={(value) =>
            handleChange({
              target: { id, value: multi ? value : value && value[0] }
            })
          }
          loading={loading}
          inputId={inputId}
          cropConfig={crop}
        />
      ) : (
        <div>
          <label htmlFor={inputId}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                fullWidth
                variant="outlined"
                style={{ minHeight: buttonHeight }}
                component="span"
                disabled={loading}
                startIcon={<ImageIcon />}
              >
                {buttonText || 'Add an image'}
              </Button>
              {loading && (
                <Box
                  display="flex"
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress thickness={6} size={48} />
                </Box>
              )}
            </Box>
          </label>
        </div>
      )}

      <input
        style={{ display: 'none' }}
        accept="image/*"
        id={loading ? '' : inputId}
        type="file"
        multiple={multi}
        onChange={async ({ target: { files } }) => {
          setLoading(true)
          const uploadedFiles = await upload(Array.from(files), cloudName)
          const currentValue = values[id] || []
          let value =
            multi && currentValue instanceof Array
              ? currentValue.concat(uploadedFiles)
              : uploadedFiles[0]

          handleChange({
            target: { id, value }
          })
          setLoading(false)
        }}
      />
    </Box>
  )
}

export default Upload
