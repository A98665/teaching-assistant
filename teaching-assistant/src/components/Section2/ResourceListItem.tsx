import { TeachingResource } from '../../types';
import { FiDownload, FiFile, FiVideo, FiImage, FiFileText } from 'react-icons/fi';

interface ResourceListItemProps {
  resource: TeachingResource;
  onDownload?: (resource: TeachingResource) => void;
  onSelect?: (resource: TeachingResource) => void;
  isSelected?: boolean;
}

const typeIcons = {
  ppt: FiFile,
  video: FiVideo,
  image: FiImage,
  document: FiFileText,
};

const typeColors = {
  ppt: 'bg-red-100 text-red-700',
  video: 'bg-purple-100 text-purple-700',
  image: 'bg-green-100 text-green-700',
  document: 'bg-blue-100 text-blue-700',
};

export default function ResourceListItem({ resource, onDownload, onSelect, isSelected }: ResourceListItemProps) {
  const Icon = typeIcons[resource.type];
  const colorClass = typeColors[resource.type];

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect && !(e.target as HTMLElement).closest('button')) {
      onSelect(resource);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        group border rounded-lg p-4 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:shadow-md hover:border-blue-300'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
          <Icon className="text-xl" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{resource.title}</h3>
          {resource.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className={`px-2 py-1 rounded ${colorClass} font-medium`}>
              {resource.type.toUpperCase()}
            </span>
            <span>{resource.size}</span>
          </div>
        </div>

        {onDownload && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(resource);
            }}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
            aria-label="下载资源"
          >
            <FiDownload className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
}
