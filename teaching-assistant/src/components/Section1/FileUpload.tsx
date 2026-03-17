import { useState, useRef } from 'react';
import { FiUpload, FiX, FiFile } from 'react-icons/fi';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string[];
}

export default function FileUpload({ onFileSelect, acceptedTypes = ['.doc', '.docx', '.pdf', '.txt', '.md'] }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    const extension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    if (acceptedTypes.some(type => selectedFile.name.toLowerCase().endsWith(type.replace('.', '')))) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    } else {
      alert(`不支持的文件类型。支持的类型：${acceptedTypes.join(', ')}`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
          <p className="text-gray-600 mb-1">
            点击或拖拽文件到此处上传
          </p>
          <p className="text-sm text-gray-400">
            支持格式：{acceptedTypes.join(', ')}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <FiFile className="text-2xl text-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="删除文件"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
}
