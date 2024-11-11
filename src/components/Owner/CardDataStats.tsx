// import React, { ReactNode } from 'react';

// interface CardDataStatsProps {
//   title: string;
//   total: string;
//   rate?: string;
//   status?: string;
//   levelUp?: boolean;
//   levelDown?: boolean;
//   children: ReactNode;
// }

// export const CardDataStats: React.FC<CardDataStatsProps> = ({
//   title,
//   total,
//   rate,
//   status,
//   levelUp,
//   levelDown,
//   children,
// }) => {
//   return (
//     <div className="rounded-xl border border-gray-300 transition-colors duration-300 bg-sky-600 hover:bg-blue-600 text-white py-6 px-7.5 shadow-lg dark:border-gray-700 dark:bg-blue-700 dark:hover:bg-blue-800 p-3">
//       <div className="flex h-11.5 w-11.5 items-center justify-start rounded-full bg-meta-2 dark:bg-meta-4">
//         {children}
//       </div>

//       <div className="mt-4 flex items-end justify-between">
//         <div>
//           <h4 className="text-title-md font-bold text-white dark:text-white">
//             {total}
//           </h4>
//           <span className="text-sm font-medium">{title}</span>
//           {status && (
//             <span className="block text-xs font-light text-gray-500 dark:text-gray-400">
//               {status}
//             </span>
//           )}
//         </div>

//         {rate && (
//           <span
//             className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
//               levelUp ? 'text-meta-3' : levelDown ? 'text-meta-5' : ''
//             }`}
//           >
//             {rate}

//             {levelUp && (
//               <svg
//                 className="fill-meta-3 transition-transform duration-300 transform hover:scale-110"
//                 width="10"
//                 height="11"
//                 viewBox="0 0 10 11"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737V10.0849H4.35716V2.47737Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             )}

//             {levelDown && (
//               <svg
//                 className="fill-meta-5 transition-transform duration-300 transform hover:scale-110"
//                 width="10"
//                 height="11"
//                 viewBox="0 0 10 11"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237V0.0848701H5.64284V7.69237Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             )}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardDataStats;

import React, { ReactNode } from 'react';
import { Card, CardBody } from '@nextui-org/react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate?: string;
  status?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

export const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  status,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <Card className="xl:max-w-sm bg-transparent bg-opacity-40 bg-primary-300 rounded-xl shadow-md shadow-primary-100 px-3 h-auto w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <div className="flex h-11.5 w-11.5 items-center justify-start rounded-full bg-meta-2 dark:bg-meta-4 text-lg">
            {children}
          </div>
          <div className="flex flex-col">
            <span className="text-xl">{title}</span>
            {status && (
              <span className="text-lg text-gray-500 dark:text-gray-400">
                {status !== undefined ? status : '0'}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className=" text-xl font-semibold">
            {total != 'undefined' ? total : '0'}
          </span>
          {rate && (
            <span
              className={`text-xs ${
                levelUp ? 'text-success' : levelDown ? 'text-danger' : ''
              }`}
            >
              {rate}
            </span>
          )}
        </div>
        <div className="flex items-center gap-6">
          {levelUp && (
            <div>
              <span className="font-semibold text-success pr-3 text-2xl">
                {'↑'}
              </span>
              <span className="text-lg">Tăng</span>
            </div>
          )}
          {levelDown && (
            <div>
              <span className="font-semibold text-danger text-2xl pr-3">
                {'↓'}
              </span>
              <span className="text-lg">Giảm</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDataStats;
