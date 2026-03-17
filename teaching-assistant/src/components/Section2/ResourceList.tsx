import { useState } from 'react';
import { TeachingResource, ResourceType } from '../../types';
import ResourceListItem from './ResourceListItem';
import { FiFilter } from 'react-icons/fi';

interface ResourceListProps {
  resources: TeachingResource[];
  onDownload?: (resource: TeachingResource) => void;
  onSelect?: (resource: TeachingResource) => void;
  selectedResourceId?: string;
}

const resourceTypes: { value: ResourceType | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'ppt', label: 'PPT' },
  { value: 'video', label: '视频' },
  { value: 'image', label: '图片' },
  { value: 'document', label: '文档' },
];

export default function ResourceList({ resources, onDownload, onSelect, selectedResourceId }: ResourceListProps) {
  const [filterType, setFilterType] = useState<ResourceType | 'all'>('all');

  const filteredResources =
    filterType === 'all'
      ? resources
      : resources.filter((r) => r.type === filterType);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="text-gray-500" />
          <h3 className="font-semibold text-gray-800">教学资源</h3>
          <span className="ml-auto text-sm text-gray-500">
            共 {filteredResources.length} 项
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilterType(type.value)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-all duration-200
                ${
                  filterType === type.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
            <FiFilter className="text-4xl mb-2" />
            <p>暂无资源</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <ResourceListItem
              key={resource.id}
              resource={resource}
              onDownload={onDownload}
              onSelect={onSelect}
              isSelected={resource.id === selectedResourceId}
            />
          ))
        )}
      </div>
    </div>
  );
}
