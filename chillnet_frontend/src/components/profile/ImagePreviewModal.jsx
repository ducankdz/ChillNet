import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';

const ImagePreviewModal = ({ open, onClose, imageUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} onOpenChange={onClose}>
      <DialogContent sx={{ padding: 0 }}  className="max-w-4xl p-0 overflow-hidden bg-black/80">
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-6 w-6 text-white cursor-pointer" />
          <span className="sr-only">Close</span>
        </button>
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={imageUrl}
            alt="Preview"
            className="max-h-[80vh] w-auto object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewModal;