import { Box, Button, CircularProgress, Dialog, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-cropper';
import { MdCheckCircle } from 'react-icons/md';

type ImageCropModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCrop: () => void;
  image: string | null;
  cropperRef: React.RefObject<HTMLImageElement>;
  isLoading: boolean;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({ isOpen, onClose, onCrop, image, cropperRef, isLoading }) => {
  const [cropDimensions, setCropDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCrop = (event: any) => {
    const cropBoxData = event.detail;
    setCropDimensions({
      width: Math.round(cropBoxData.width),
      height: Math.round(cropBoxData.height),
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className='flex flex-row items-center justify-between font-roboto'>
        Recorte sua foto
        <Box className='flex flex-col'>
          <Box className='text-right !p-0 !m-0 font-roboto font-normal text-[.85rem] text-[#ff0336] uppercase'>Seu recorte: {cropDimensions.width}x{cropDimensions.height}</Box>
          <Box className='text-right !p-0 !m-0 font-roboto font-normal text-[.85rem] text-gray-700 uppercase'>Recomendação: 640x640</Box>
        </Box>
      </DialogTitle>
      <Box className='m-1'>
        {image && (
          <Cropper
            src={image}
            style={{ height: 400, width: '100%' }}
            aspectRatio={1} // Define a proporção (quadrado)
            guides={true} // Mostra guias para recorte
            viewMode={1} // Permite mover fora dos limites visíveis
            dragMode="move" // Habilita arrastar o seletor de recorte
            zoomOnWheel={true} // Permite zoom com o scroll
            cropBoxMovable={true} // Move o seletor
            cropBoxResizable={true} // Permite redimensionar o seletor
            toggleDragModeOnDblclick={false} // Evita alternar entre modos no duplo clique
            ref={cropperRef} // Referência do Cropper
            crop={handleCrop}
          />
        )}
      </Box>
      <Box className='mb-5 m-4 flex justify-end'>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            backgroundColor: 'transparent',
            color: '#4b5563',
            borderColor: '#4b5563',
            height: '3rem',
            marginRight: '1rem',
            '&:hover': {
              backgroundColor: '#d4d4d8',
              borderColor: '#4b5563',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onCrop}
          variant="contained"
          color="primary"
          endIcon={<MdCheckCircle />}
          sx={{
            backgroundColor: '#ff0336',
            color: '#fff',
            height: '3rem',
            '&:hover': {
              backgroundColor: '#e6001b',
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
        </Button>
      </Box>
    </Dialog>
  );
};