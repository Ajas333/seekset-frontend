import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import setCanvasPreview from './setCanvasPreview';

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;
function ProfilepicModal({setCroppedImageUrl,setImgError, setImageUrl, imageUrl, closeModal, onCropSubmit }) {
    const [crop,setCrop] = useState();
    const imgRef = useRef(null)
    const previewCanvasRef = useRef()
    const onImageLoad = (e)=>{
        setImgError('');
        const {width,height,naturalWidth,naturalHeight} = e.currentTarget;
        if(naturalWidth<MIN_DIMENSION || naturalHeight<MIN_DIMENSION){
            setImgError("Image must be at least 150 x 150 pixels");
            setImageUrl('')

        }
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
        const crop = makeAspectCrop(
            {
                unit:'%',
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop,width,height);
        setCrop(centeredCrop)
    };
  return (
    <div className='relative z-10' aria-labelledby='crop-image-dialog' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm'></div>
      <div className='fixed inset-0 z-10 w-3/5 overflow-y-auto '>
        <div className='flex min-h-full justify-center px-2 py-12 text-center'>
          <div className='relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all'>
            <div className='px-5 py-4'>
              <button
                type='button'
                className='rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2'
                onClick={closeModal}>
                <span className='sr-only'>Close menu</span>
                <IoCloseCircleOutline />
              </button>
              {imageUrl &&
                <div className='flex flex-col items-center'>
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop,)=>setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img ref={imgRef} src={imageUrl} alt="Upload" style={{maxHeight: "70vh"}} onLoad={onImageLoad}/>
                    </ReactCrop>
                    <button
                     onClick={()=>{setCanvasPreview(
                        imgRef.current,
                        previewCanvasRef.current,
                        convertToPixelCrop(crop,imgRef.current.width,imgRef.current.height)
                     )
                     const dataUrl = previewCanvasRef.current.toDataURL()
                    // console.log("inside profile edit modal",dataUrl);
                     setCroppedImageUrl(dataUrl);
                     closeModal();
                    }}
                     className='text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600'>
                        Crop Image
                    </button>
                </div>
                }
                {crop &&(
                    <canvas
                        ref={previewCanvasRef}
                        className='mt-4 '
                        style={{display:"none", border:'1px solid black', objectFit:"contain", width:150, height:150}}
                    />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilepicModal;
