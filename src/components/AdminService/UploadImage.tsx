// import { Image, Input, Skeleton } from '@nextui-org/react';
// import React from 'react';
// import imageCompression from 'browser-image-compression';
// import { debounce } from 'lodash';
// interface UploadImageProps {
//   onImagesUpload: (images: { file: File; url: string }[]) => void; // Thêm prop
// }
// export const UploadImage: React.FC<UploadImageProps> = ({ onImagesUpload }) => {
//   const [images, setImages] = React.useState<{ file: File; url: string }[]>([]);
//   const [loadingImages, setLoadingImages] = React.useState<boolean[]>([]);

//   const handleImageChange = debounce(
//     async (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files) {
//         const fileList = Array.from(e.target.files);

//         const compressedImages = await Promise.all(
//           fileList.map(async (file) => {
//             const options = {
//               maxSizeMB: 1, // Giới hạn kích thước tối đa
//               maxWidthOrHeight: 1920, // Giới hạn kích thước chiều rộng hoặc chiều cao
//               useWebWorker: true, // Sử dụng Web Worker
//             };
//             try {
//               const compressedFile = await imageCompression(file, options);
//               return {
//                 file: compressedFile,
//                 url: URL.createObjectURL(compressedFile),
//               };
//             } catch (error) {
//               console.error('Error during image compression:', error);
//               return { file, url: URL.createObjectURL(file) }; // Fallback nếu nén không thành công
//             }
//           })
//         );

//         // Thêm hình ảnh mới vào danh sách và cập nhật trạng thái loading
//         setImages((prevImages) => [...prevImages, ...compressedImages]);
//         setLoadingImages((prev) => [
//           ...prev,
//           ...compressedImages.map(() => true),
//         ]);
//         onImagesUpload([...images, ...compressedImages]);

//         // Thay đổi trạng thái loading sau 1 giây
//         setTimeout(() => {
//           setLoadingImages(
//             (prevLoading) => prevLoading.map((_, index) => false) // Đặt tất cả trạng thái loading thành false sau 1 giây
//           );
//         }, 1000);
//       }
//     },
//     300
//   ); // Debounce với độ trễ 300ms

//   return (
//     <div className="flex flex-col w-full items-center justify-center">
//       <Input
//         type="file"
//         id="dropzone-file"
//         multiple // Cho phép tải nhiều tệp
//         onChange={handleImageChange}
//       />
//       <div className="border border-dashed border-black w-full mt-5 font-bold">
//         <div className="flex flex-row flex-wrap h-56 max-h-56 mt-4 gap-4 overflow-y-auto">
//           {images.length > 0 && (
//             <ul className="flex flex-row gap-4 flex-wrap">
//               {images.map((image, index) => (
//                 <li key={index} className="flex flex-col items-center">
//                   {loadingImages[index] ? (
//                     <Skeleton className="mb-2 w-36 h-36 rounded-xl" /> // Hiển thị Skeleton khi hình ảnh đang tải
//                   ) : (
//                     <Image
//                       src={image.url}
//                       alt={image.file.name}
//                       className="object-cover w-36 h-36 rounded-xl"
//                     />
//                   )}
//                   <p className="mt-2 text-sm text-center">{image.file.name}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//       {/* Hiển thị các hình ảnh đã tải lên */}
//     </div>
//   );
// };

import { Image, Input, Skeleton } from '@nextui-org/react';
import React from 'react';
import imageCompression from 'browser-image-compression';
import { debounce } from 'lodash';

interface UploadImageProps {
  onImagesUpload: (images: { file: File; url: string }[]) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({ onImagesUpload }) => {
  const [images, setImages] = React.useState<
    { original: File; compressedUrl: string }[]
  >([]);
  const [loadingImages, setLoadingImages] = React.useState<boolean[]>([]);

  const handleImageChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const fileList = Array.from(e.target.files);

        const compressedImages = await Promise.all(
          fileList.map(async (file) => {
            const options = {
              maxSizeMB: 1, // Max size limit
              maxWidthOrHeight: 1920, // Max width or height limit
              useWebWorker: true, // Use Web Worker
            };
            try {
              const compressedFile = await imageCompression(file, options);
              return {
                original: file,
                compressedUrl: URL.createObjectURL(compressedFile),
              };
            } catch (error) {
              console.error('Error during image compression:', error);
              return {
                original: file,
                compressedUrl: URL.createObjectURL(file),
              }; // Fallback to original if compression fails
            }
          })
        );

        setImages((prevImages) => [...prevImages, ...compressedImages]);
        setLoadingImages((prev) => [
          ...prev,
          ...compressedImages.map(() => true),
        ]);

        // Send original files for upload
        onImagesUpload(
          compressedImages.map(({ original }) => ({
            file: original,
            url: URL.createObjectURL(original),
          }))
        );

        // Set loading to false after 1 second
        setTimeout(() => {
          setLoadingImages((prevLoading) => prevLoading.map(() => false));
        }, 1000);
      }
    },
    300
  );

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Input
        type="file"
        id="dropzone-file"
        multiple
        onChange={handleImageChange}
      />
      <div className="border border-dashed border-black w-full mt-5 font-bold">
        <div className="flex flex-row flex-wrap h-56 max-h-56 mt-4 gap-4 overflow-y-auto">
          {images.length > 0 && (
            <ul className="flex flex-row gap-4 flex-wrap">
              {images.map((image, index) => (
                <li key={index} className="flex flex-col items-center">
                  {loadingImages[index] ? (
                    <Skeleton className="mb-2 w-36 h-36 rounded-xl" />
                  ) : (
                    <Image
                      src={image.compressedUrl}
                      alt={image.original.name}
                      className="object-cover w-36 h-36 rounded-xl"
                    />
                  )}
                  <p className="mt-2 text-sm text-center">
                    {image.original.name}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
